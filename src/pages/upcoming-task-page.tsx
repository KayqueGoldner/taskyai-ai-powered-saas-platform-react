/**
 * node modules
 */
import { useLoaderData } from "react-router";

/**
 * components
 */
import { Head } from "@/components/head";
import { TopAppBar } from "@/components/top-app-bar";
import { Page, PageHeader, PageTitle, PageList } from "@/components/page";
import { TaskEmptyState } from "@/components/task-empty-state";
import { TaskCard } from "@/components/task-card";

/**
 * assets
 */
import { CheckCircle2Icon } from "lucide-react";

/**
 * types
 */
import type { Models } from "appwrite";

export const UpcomingTaskPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title="Upcoming - Tasky AI" />

      <TopAppBar title="Upcoming" taskCount={tasks.total} />

      <Page>
        <PageHeader>
          <PageTitle>Upcoming</PageTitle>

          {tasks.total > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle2Icon size={16} /> {tasks.total} tasks
            </div>
          )}
        </PageHeader>

        <PageList>
          {tasks.documents.map(
            ({ $id, content, completed, due_date, project }) => (
              <TaskCard
                key={$id}
                completed={completed}
                content={content}
                dueDate={due_date}
                id={$id}
                project={project}
              />
            ),
          )}

          {!tasks.total && <TaskEmptyState type="upcoming" />}
        </PageList>
      </Page>
    </>
  );
};
