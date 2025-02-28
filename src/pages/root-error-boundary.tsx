/**
 * node modules
 */
import { isRouteErrorResponse, useRouteError, Link } from "react-router";

/**
 * components
 */
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

/**
 * assets
 */
import { pageNotFound } from "@/assets";

export const RootErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <div className="container flex grow flex-col items-center justify-center pb-12 pt-32">
        <h1 className="text-center text-2xl font-semibold sm:text-4xl">
          {isRouteErrorResponse(error)
            ? "Hmmm, that page doesn't exist"
            : "Something went wrong"}
        </h1>

        <p className="mb-6 mt-4 max-w-[55ch] text-center text-muted-foreground sm:text-lg">
          {isRouteErrorResponse(error)
            ? "You can get back on track and manage your tasks with ease."
            : "We're working to fix this issue. Please try again later."}
        </p>

        <div className="flex gap-2">
          <Button asChild>
            <Link to="/">Go back to home</Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link to="/app/inbox">View inbox</Link>
          </Button>
        </div>

        <figure className="mt-10">
          <img src={pageNotFound} width={560} height={373} alt="404 page" />
        </figure>
      </div>

      <Footer />
    </div>
  );
};
