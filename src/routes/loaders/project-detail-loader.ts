/**
 * node modules
 */
import { databases } from "@/lib/appwrite";

/**
 * custom modules
 */
import { getUserId } from "@/lib/utils";

/**
 * environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_PROJECTS_ID = import.meta.env.VITE_APPWRITE_PROJECTS_ID;

/**
 * types
 */
import type { LoaderFunction } from "react-router";

const getProject = async (projectId: string) => {
  try {
    const project = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      projectId,
    );

    if (project.userId !== getUserId()) throw new Error("Unauthorized");

    return project;
  } catch (error) {
    console.log("Error fetching project", error);

    if (error instanceof Error) throw new Error(error.message);

    throw new Error("Failed to fetch project");
  }
};

const projectDetailLoader: LoaderFunction = async ({ params }) => {
  const { projectId } = params as { projectId: string };

  const project = await getProject(projectId);

  return { project };
};

export default projectDetailLoader;
