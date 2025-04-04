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
