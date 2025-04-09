/**
 * node modules
 */
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { startOfToday } from "date-fns";

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
 * assets
 */
import { CheckCircle2Icon } from "lucide-react";

/**
 * types
 */
import type { Models } from "appwrite";

export const TodayTaskPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title="Today - Tasky AI" />

      <TopAppBar title="Today" taskCount={tasks.total} />

      <Page>
        <PageHeader>
          <PageTitle>Today</PageTitle>

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

          {fetcher.state !== "idle" && <TaskCardSkeleton />}

          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}

          {!tasks.total && !showTaskForm && <TaskEmptyState />}

          {showTaskForm && (
            <TaskForm
              mode="create"
              className="mt-1"
              defaultFormData={{
                content: "",
                due_date: startOfToday(),
                project: null,
              }}
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
