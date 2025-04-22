/**
 * node modules
 */
import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";
import { useLoaderData, useFetcher } from "react-router";

/**
 * components
 */
import { Head } from "@/components/head";
import { Button } from "@/components/ui/button";
import { TopAppBar } from "@/components/top-app-bar";
import { ProjectFormDialog } from "@/components/project-form-dialog";
import { Page, PageHeader, PageTitle, PageList } from "@/components/page";
import { ProjectCard } from "@/components/project-card";
import { ProjectSearchField } from "@/components/project-search-field";

/**
 * assets
 */
import { PlusIcon } from "lucide-react";

/**
 * constants
 */
const SEARCH_TIMEOUT_DELAY = 500;

/**
 * types
 */
import type { Models } from "appwrite";
import type { SearchingState } from "@/components/project-search-field";
type DataType = {
  projects: Models.DocumentList<Models.Document>;
};

export const ProjectsPage = () => {
  const loaderData = useLoaderData() as DataType;
  const fetcher = useFetcher();
  const fetcherData = fetcher.data as DataType;

  const [searchingState, setSearchingState] = useState<SearchingState>("idle");
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const { projects } = fetcherData || loaderData;

  const handleProjectSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      const submitTarget = event.currentTarget.form;

      searchTimeout.current = setTimeout(async () => {
        setSearchingState("searching");

        await fetcher.submit(submitTarget);

        setSearchingState("idle");
      }, SEARCH_TIMEOUT_DELAY);

      setSearchingState("loading");
    },
    [],
  );

  return (
    <>
      <Head title="My Projects - Tasky AI" />

      <TopAppBar title="My Projects" />

      <Page>
        <PageHeader>
          <div className="flex items-center gap-2">
            <PageTitle>My Projects</PageTitle>
            <ProjectFormDialog method="POST">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label="Create a project"
              >
                <PlusIcon className="size-4" />
              </Button>
            </ProjectFormDialog>
          </div>

          <fetcher.Form method="get" action="/app/projects">
            <ProjectSearchField
              searchingState={searchingState}
              handleChange={handleProjectSearch}
            />
          </fetcher.Form>
        </PageHeader>

        <PageList>
          <div className="flex h-8 items-center border-b">
            <div className="text-sm">
              {projects.total} {projects.total > 1 ? "Projects" : "Project"}
            </div>
          </div>
          <div className={cn(searchingState === "searching" && "opacity-25")}>
            {projects.documents.map((project) => (
              <ProjectCard key={project.$id} project={project} />
            ))}

            {projects.total === 0 && (
              <div className="flex h-14 items-center justify-center text-muted-foreground">
                No projects found
              </div>
            )}
          </div>
        </PageList>
      </Page>
    </>
  );
};
