/**
 * node modules
 */
import { databases, Query } from "@/lib/appwrite";
import { startOfToday, startOfTomorrow } from "date-fns";
import { redirect } from "react-router";

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
import type { Models } from "appwrite";
export interface AppLoaderData {
  projects: Models.DocumentList<Models.Document>;
}

const getProjects = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      [
        Query.select(["$id", "name", "color_hex", "color_name"]),
        Query.orderDesc("$createdAt"),
        Query.limit(100),
        Query.equal("userId", getUserId()),
      ],
    );
  } catch (error) {
    console.log("Error fetching projects", error);
    throw new Error("Error fetching projects");
  }
};

const appLoader: LoaderFunction = async () => {
  const userId = getUserId();

  if (!userId) return redirect("/login");

  const projects = await getProjects();

  return { projects };
};

export default appLoader;
