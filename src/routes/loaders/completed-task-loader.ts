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
const APPWRITE_TASKS_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;

const getTasks = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_TASKS_ID,
      [
        Query.equal("completed", true),
        Query.orderDesc("$updatedAt"),
        Query.equal("userId", getUserId()),
      ],
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error getting completed tasks");
  }
};

const completedTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();

  return { tasks };
};

export default completedTaskLoader;
