/**
 * components
 */
import { Head } from "@/components/head";
import { TopAppBar } from "@/components/top-app-bar";

/**
 * assets
 */
import { pageNotFound } from "@/assets";

export const ProjectErrorBoundary = () => {
  return (
    <>
      <Head title="Project Not Found" />

      <TopAppBar title="Project Not Found" />

      <div className="container flex grow flex-col items-center justify-center">
        <figure className="mt-10">
          <img src={pageNotFound} alt="Page Not Found" width={360} />
        </figure>

        <h1 className="mb-2 mt-4 text-center text-2xl font-semibold">
          Project not found
        </h1>

        <p className="max-w-[40ch] text-center text-muted-foreground">
          Uh-oh! The project you're looking for doesn't exist.
        </p>
      </div>
    </>
  );
};
