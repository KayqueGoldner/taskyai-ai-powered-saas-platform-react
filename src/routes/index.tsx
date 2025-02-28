/**
 * node modules
 */
import { createBrowserRouter } from "react-router";

/**
 * pages
 */
import { HomePage } from "@/pages/home-page";

/**
 * layouts
 */
import { RootLayout } from "@/layouts/root-layout";

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
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: rootRouteChildren,
    errorElement: <RootErrorBoundary />,
  },
]);

export default router;
