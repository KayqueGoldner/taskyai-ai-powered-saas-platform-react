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

/**
 * assets
 */
import { PlusIcon } from "lucide-react";

/**
 * types
 */
import type { Models } from "appwrite";
type DataType = {
  projects: Models.DocumentList<Models.Document>;
};

export const ProjectsPage = () => {
  const loaderData = useLoaderData() as DataType;

  const { projects } = loaderData;

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
        </PageHeader>

        <PageList>
          <div className="flex h-8 items-center border-b">
            <div className="text-sm">
              {projects.total} {projects.total > 1 ? "Projects" : "Project"}
            </div>
          </div>
          <div className="">
            {projects.documents.map((project) => (
              <p key={project.$id}>{project.name}</p>
            ))}
          </div>
        </PageList>
      </Page>
    </>
  );
};
