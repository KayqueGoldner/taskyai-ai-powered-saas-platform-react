/**
 * node modules
 */
import { databases, Query } from "@/lib/appwrite";

/**
 * custom modules
 */
import { getUserId } from "@/lib/utils";

/**
 * types
 */
import type { LoaderFunction } from "react-router";

/**
 * environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    return await databases.listDocuments(APPWRITE_DATABASE_ID, "tasks", [
      Query.equal("completed", false),
      Query.isNull("project"),
      Query.equal("userId", getUserId()),
    ]);
  } catch (error) {
    console.log(error);
    throw new Error("Error getting inbox tasks");
  }
};

const inboxTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();

  return { tasks };
};

export default inboxTaskLoader;
