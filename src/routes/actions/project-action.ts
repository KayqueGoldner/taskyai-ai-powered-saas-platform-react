/**
 * node modules
 */
import { redirect } from "react-router";

/**
 * custom modules
 */
import { databases } from "@/lib/appwrite";
import { generateID, getUserId } from "@/lib/utils";
import generateProjectTasks from "@/api/google-ai";

/**
 * environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_PROJECTS_ID = import.meta.env.VITE_APPWRITE_PROJECTS_ID;
const APPWRITE_TASKS_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;

/**
 * types
 */
import type { ActionFunction } from "react-router";
import type { Project, ProjectForm } from "@/types";
import type { Models } from "appwrite";
type AiGenTask = {
  content: string;
  due_date: string;
};

const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;

  let aiGeneratedTasks: AiGenTask[] = [];

  try {
    project = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      generateID(),
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId(),
      },
    );
  } catch (error) {
    console.log("Error creating project", error);
  }

  if (aiTaskGen) {
    if (!taskGenPrompt) {
      throw new Error("Task generation prompt is required");
    }

    try {
      aiGeneratedTasks = JSON.parse(
        (await generateProjectTasks(taskGenPrompt)) ||
          `[{content: 'Tasks generation failed', due_date: ${new Date()}}]`,
      );
    } catch (error) {
      console.log("Error generating tasks", error);
    }
  }

  if (aiGeneratedTasks.length > 0) {
    const promises = aiGeneratedTasks.map((task) =>
      databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_TASKS_ID,
        generateID(),
        {
          ...task,
          project: project?.$id,
          userId: getUserId(),
        },
      ),
    );

    try {
      await Promise.all(promises);
    } catch (error) {
      console.log("Error creating tasks", error);
    }
  }
  return redirect(`/app/projects/${project?.$id}`);
};

const updateProject = async (data: ProjectForm) => {
  const documentId = data.id;

  if (!documentId) {
    throw new Error("Project ID is required");
  }

  try {
    return await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      documentId,
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
      },
    );
  } catch (error) {
    console.log("Error updating project", error);
  }
};

const deleteProject = async (data: Project) => {
  const documentId = data.id;

  if (!documentId) {
    throw new Error("Project ID is required");
  }

  try {
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      documentId,
    );
  } catch (error) {
    console.log("Error deleting project", error);
  }
};

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = (await request.json()) as ProjectForm;

  if (method === "POST") {
    return await createProject(data);
  }

  if (method === "PUT") {
    return await updateProject(data);
  }

  if (method === "DELETE") {
    return await deleteProject(data);
  }

  throw new Error("Invalid method");
};

export default projectAction;
