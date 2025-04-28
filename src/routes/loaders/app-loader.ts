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
const APPWRITE_TASKS_ID = import.meta.env.VITE_APPWRITE_TASKS_ID;

/**
 * types
 */
import type { LoaderFunction } from "react-router";
import type { Models } from "appwrite";
export interface AppLoaderData {
  projects: Models.DocumentList<Models.Document>;
  taskCount: TaskCount;
}
interface TaskCount {
  inboxTasks: number;
  todayTasks: number;
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

const getTaskCount = async () => {
  const taskCount: TaskCount = {
    inboxTasks: 0,
    todayTasks: 0,
  };

  try {
    const { total: totalInboxTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_TASKS_ID,
      [
        Query.select(["$id"]),
        Query.isNull("project"),
        Query.equal("completed", false),
        Query.limit(1),
        Query.equal("userId", getUserId()),
      ],
    );

    taskCount.inboxTasks = totalInboxTasks;
  } catch (error) {
    console.log("Error fetching task count", error);
    throw new Error("Error fetching task count");
  }

  try {
    const { total: totalTodayTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_TASKS_ID,
      [
        Query.select(["$id"]),
        Query.and([
          Query.greaterThanEqual("due_date", startOfToday().toISOString()),
          Query.lessThan("due_date", startOfTomorrow().toISOString()),
        ]),
        Query.equal("completed", false),
        Query.limit(1),
        Query.equal("userId", getUserId()),
      ],
    );

    taskCount.todayTasks = totalTodayTasks;
  } catch (error) {
    console.log("Error fetching task count", error);
    throw new Error("Error fetching task count");
  }

  return taskCount;
};

const appLoader: LoaderFunction = async () => {
  const userId = getUserId();

  if (!userId) return redirect("/login");

  const projects = await getProjects();
  const taskCount = await getTaskCount();

  return { projects, taskCount };
};

export default appLoader;
