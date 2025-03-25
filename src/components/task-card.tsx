/**
 * node modules
 */
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useFetcher } from "react-router";

/**
 * custom modules
 */
import { formatCustomDate, getTaskDueDateColorClass } from "@/lib/utils";

/**
 * components
 */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TaskForm } from "@/components/task-form";

/**
 * assets
 */
import {
  CheckIcon,
  CalendarDays,
  HashIcon,
  InboxIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react";

/**
 * types
 */
import type { Models } from "appwrite";
interface TaskCardProps {
  id: string;
  content: string;
  completed: boolean;
  dueDate: Date;
  project: Models.Document | null;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  completed,
  content,
  dueDate,
  id,
  project,
}) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const fetcher = useFetcher();

  return (
    <>
      {!showTaskForm ? (
        <div className="group/card relative grid grid-cols-[min-content,minmax(0,1fr)] gap-3 border-b">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "group/button mt-2 size-5 rounded-full",
              completed && "bg-border",
            )}
            role="checkbox"
            aria-checked={completed}
            aria-label={`Mark task as ${completed ? "incompleted" : "completed"}`}
            aria-describedby="task-content"
          >
            <CheckIcon
              strokeWidth={4}
              className={cn(
                "size-3 text-muted-foreground transition-opacity group-hover/button:opacity-100",
                completed ? "opacity-100" : "opacity-0",
              )}
            />
          </Button>

          <Card className="space-y-1.5 rounded-none border-none py-2">
            <CardContent className="p-0">
              <p
                id="task-content"
                className={cn(
                  "text-sm max-md:me-16",
                  completed && "text-muted-foreground line-through",
                )}
              >
                {content}
              </p>
            </CardContent>
            <CardFooter className="flex gap-4 p-0">
              {dueDate && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs text-muted-foreground",
                    getTaskDueDateColorClass(dueDate, completed),
                  )}
                >
                  <CalendarDays size={14} />
                  {formatCustomDate(dueDate)}
                </div>
              )}

              <div className="ms-auto grid grid-cols-[minmax(0,180px),max-content] items-center gap-1 text-xs text-muted-foreground">
                <div className="truncate text-right">
                  {project?.name || "Inbox"}
                </div>

                {project ? (
                  <HashIcon size={14} />
                ) : (
                  <InboxIcon size={14} className="text-muted-foreground" />
                )}
              </div>
            </CardFooter>
          </Card>

          <div className="absolute right-0 top-1.5 flex items-center gap-1 bg-background ps-1 opacity-0 shadow-[-10px_0_5px_hst(var(--background))] focus-within:opacity-100 group-hover/card:opacity-100 max-md:opacity-100">
            {!completed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-muted-foreground"
                    aria-label="Edit task"
                    onClick={() => setShowTaskForm(true)}
                  >
                    <EditIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit task</TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 text-muted-foreground"
                  aria-label="Delete task"
                >
                  <Trash2Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete task</TooltipContent>
            </Tooltip>
          </div>
        </div>
      ) : (
        <TaskForm
          className="my-1"
          defaultFormData={{
            content,
            due_date: dueDate,
            project: project && project?.$id,
            completed,
            id,
          }}
          mode="edit"
          onCancel={() => setShowTaskForm(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: "/app",
              method: "PUT",
              encType: "application/json",
            });
          }}
        />
      )}
    </>
  );
};
