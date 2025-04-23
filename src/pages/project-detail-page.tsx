/**
 * node modules
 */
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";

/**
 * components
 */
import { Head } from "@/components/head";
import { TopAppBar } from "@/components/top-app-bar";
import { Button } from "@/components/ui/button";
import { TaskForm } from "@/components/task-form";
import { TaskCard } from "@/components/task-card";
import { TaskCardSkeleton } from "@/components/task-card-skeleton";
import { ProjectActionMenu } from "@/components/project-action-menu";
import { TaskCreateButton } from "@/components/task-create-button";
import { TaskEmptyState } from "@/components/task-empty-state";
import { Page, PageHeader, PageTitle, PageList } from "@/components/page";

/**
 * assets
 */
import { MoreHorizontalIcon } from "lucide-react";

/**
 * types
 */
import type { Models } from "appwrite";

export const ProjectDetailPage = () => {
  const fetcher = useFetcher();
  const { project } = useLoaderData<{ project: Models.Document }>();

  const projectTasks = project.tasks.filter(
    (task: Models.Document) => !task.completed,
  ) as Models.Document[];

  // sort tasks by due date
  projectTasks.sort((a, b) => {
    return a.due_date < b.due_date ? -1 : 1;
  });

  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <>
      <Head title={`${project.name} - Tasky AI`} />

      <TopAppBar title={project.name} />

      <Page>
        <PageHeader>
          <div className="flex items-center gap-2">
            <PageTitle>{project.name}</PageTitle>

            <ProjectActionMenu
              defaultFormData={{
                id: project.$id,
                name: project.name,
                color_name: project.color_name,
                color_hex: project.color_hex,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                aria-label="More actions"
              >
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </ProjectActionMenu>
          </div>
        </PageHeader>

        <PageList>
          {projectTasks.map(({ $id, content, due_date, completed }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              dueDate={due_date}
              completed={completed}
              project={project}
            />
          ))}

          {fetcher.state !== "idle" && <TaskCardSkeleton />}

          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}

          {!projectTasks.length && !showTaskForm && (
            <TaskEmptyState type="project" />
          )}

          {showTaskForm && (
            <TaskForm
              mode="create"
              onCancel={() => setShowTaskForm(false)}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  action: "/app",
                  method: "POST",
                  encType: "application/json",
                });
              }}
              defaultFormData={{
                content: "",
                due_date: null,
                project: project.$id,
              }}
              className="mt-1"
            />
          )}
        </PageList>
      </Page>
    </>
  );
};
