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
 * types
 */
import type { Models } from "appwrite";

export const CompletedTaskPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title="Completed - Tasky AI" />

      <TopAppBar title="Completed" taskCount={tasks.total} />

      <Page>
        <PageHeader>
          <PageTitle>Completed</PageTitle>
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

          {!tasks.total && <TaskEmptyState type="completed" />}
        </PageList>
      </Page>
    </>
  );
};
