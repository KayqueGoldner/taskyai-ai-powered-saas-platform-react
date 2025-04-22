/**
 * node modules
 */
import { databases, Query } from "@/lib/appwrite";

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

const getProjects = async (query: string) => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_PROJECTS_ID,
      [
        Query.select(["$id", "name", "color_name", "color_hex", "$createdAt"]),
        Query.contains("name", query),
        Query.equal("userId", getUserId()),
        Query.orderAsc("$createdAt"),
      ],
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch projects");
  }
};

const projectsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  const projects = await getProjects(query);

  return { projects };
};

export default projectsLoader;
