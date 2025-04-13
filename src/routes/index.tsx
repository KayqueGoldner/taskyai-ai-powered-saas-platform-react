/**
 * node modules
 */
import { createBrowserRouter } from "react-router";

/**
 * pages
 */
import { HomePage } from "@/pages/home-page";
import { RegisterPage } from "@/pages/register-page";
import { LoginPage } from "@/pages/login-page";
import { AuthSyncPage } from "@/pages/auth-sync-page";
import { InboxPage } from "@/pages/inbox-page";
import { TodayTaskPage } from "@/pages/today-task-page";
import { UpcomingTaskPage } from "@/pages/upcoming-task-page";
import { CompletedTaskPage } from "@/pages/completed-task-page";

/**
 * layouts
 */
import { RootLayout } from "@/layouts/root-layout";
import { AppLayout } from "@/layouts/app-layout";

/**
 * error boundaries
 */
import { RootErrorBoundary } from "@/pages/root-error-boundary";

/**
 * actions
 */
import appAction from "@/routes/actions/app-action";

/**
 * loaders
 */
import inboxTaskLoader from "@/routes/loaders/inbox-loader";
import todayTaskLoader from "@/routes/loaders/today-task-loader";
import upcomingTaskLoader from "@/routes/loaders/upcoming-task-loader";
import completedTaskLoader from "@/routes/loaders/completed-task-loader";

/**
 * types
 */
import type { RouteObject } from "react-router";

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "auth-sync",
    element: <AuthSyncPage />,
  },
];

const appRouteChildren: RouteObject[] = [
  {
    path: "inbox",
    element: <InboxPage />,
    loader: inboxTaskLoader,
  },
  {
    path: "today",
    element: <TodayTaskPage />,
    loader: todayTaskLoader,
  },
  {
    path: "upcoming",
    element: <UpcomingTaskPage />,
    loader: upcomingTaskLoader,
  },
  {
    path: "completed",
    element: <CompletedTaskPage />,
    loader: completedTaskLoader,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: rootRouteChildren,
    errorElement: <RootErrorBoundary />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: appRouteChildren,
    action: appAction,
  },
]);

export default router;
