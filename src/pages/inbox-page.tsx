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
import { Page, PageHeader, PageTitle, PageList } from "@/components/page";
import { TaskCreateButton } from "@/components/task-create-button";
import { TaskEmptyState } from "@/components/task-empty-state";
import { TaskForm } from "@/components/task-form";
import { TaskCard } from "@/components/task-card";
import { TaskCardSkeleton } from "@/components/task-card-skeleton";

/**
 * types
 */
import type { Models } from "appwrite";

export const InboxPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title="Inbox - Tasky AI" />

      <TopAppBar title="Inbox" taskCount={20} />

      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
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

          {fetcher.state !== "idle" && <TaskCardSkeleton />}

          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}

          {!tasks.total && !showTaskForm && <TaskEmptyState type="inbox" />}

          {showTaskForm && (
            <TaskForm
              mode="create"
              className="mt-1"
              onCancel={() => setShowTaskForm(false)}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  action: "/app",
                  method: "POST",
                  encType: "application/json",
                });
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  );
};
