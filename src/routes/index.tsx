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

const appRouteChildren: RouteObject[] = [];

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
  },
]);

export default router;
