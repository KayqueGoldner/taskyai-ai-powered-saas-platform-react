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

/**
 * types
 */
import type { ActionFunction } from "react-router";
import type { ProjectForm } from "@/types";
import type { Models } from "appwrite";

const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;

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

  const tasks = await generateProjectTasks(taskGenPrompt);
  console.log(tasks);

  return redirect(`/app/projects/${project?.$id}`);
};

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = (await request.json()) as ProjectForm;

  if (method === "POST") {
    return await createProject(data);
  }

  return null;
};

export default projectAction;
