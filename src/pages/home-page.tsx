/**
 * node modules
 */
import { Link } from "react-router";

/**
 * components
 */
import { Button } from "@/components/ui/button";
import { Head } from "@/components/head";

/**
 * assets
 */
import { heroBannerSm, heroBannerLg } from "@/assets";

export const HomePage = () => {
  return (
    <>
      <Head title="Tasky AI - AI Powered To-Do List & Management App" />

      <section>
        <div className="container grid grid-cols-1 items-center gap-8 !px-8 xl:grid-cols-[1fr_1.5fr] xl:gap-12">
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:gap-6 lg:text-left">
            <h1 className="max-w-[22ch] text-4xl font-semibold md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl">
              Simplify Your Work and Life with{" "}
              <span className="inline-flex overflow-hidden rounded-full bg-gradient-to-t from-primary/50 to-primary/30 px-2">
                AI-Powered
              </span>{" "}
              Task Management
            </h1>

            <p className="max-w-[48ch] text-foreground/80 md:text-lg lg:text-xl">
              Simplify life for both you and your team with the world's #1 task
              manager and to-do list app.
            </p>

            <Button size="lg" asChild>
              <Link to="/register">Start for free</Link>
            </Button>
          </div>

          <figure className="aspect-square overflow-hidden rounded-2xl bg-secondary max-md:mx-auto max-md:max-w-[480px] md:aspect-video">
            <img
              src={heroBannerSm}
              width={480}
              height={480}
              alt="Tasky AI Website"
              className="md:hidden"
            />
            <img
              src={heroBannerLg}
              width={960}
              height={540}
              alt="Tasky AI Website"
              className="max-md:hidden"
            />
          </figure>
        </div>
      </section>
    </>
  );
};
