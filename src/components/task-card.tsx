/**
 * node modules
 */
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import { useFetcher, useLocation } from "react-router";

/**
 * custom modules
 */
import {
  formatCustomDate,
  getTaskDueDateColorClass,
  truncateString,
} from "@/lib/utils";

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
import { ToastAction } from "@/components/ui/toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

/**
 * hooks
 */
import { useToast } from "@/hooks/use-toast";

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
import { Task } from "@/types";
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
  const { toast } = useToast();
  const location = useLocation();

  const fetcherTask = fetcher.json as Task;

  const task: Task = Object.assign(
    {
      id,
      content,
      completed,
      due_date: dueDate,
      project,
    },
    fetcherTask,
  );

  const handleTaskComplete = useCallback(
    async (completed: boolean) => {
      return await fetcher.submit(JSON.stringify({ id: task.id, completed }), {
        action: "/app",
        method: "PUT",
        encType: "application/json",
      });
    },
    [task.id, task.completed],
  );

  return (
    <>
      {!showTaskForm ? (
        <div className="group/card relative grid grid-cols-[min-content,minmax(0,1fr)] gap-3 border-b">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "group/button mt-2 size-5 rounded-full",
              task.completed && "bg-border",
            )}
            role="checkbox"
            aria-checked={task.completed}
            aria-label={`Mark task as ${task.completed ? "incompleted" : "completed"}`}
            aria-describedby="task-content"
            onClick={async () => {
              await handleTaskComplete(!task.completed);

              if (!task.completed) {
                toast({
                  title: "1 task completed",
                  action: (
                    <ToastAction
                      altText="Undo"
                      onClick={handleTaskComplete.bind(null, false)}
                    >
                      Undo
                    </ToastAction>
                  ),
                });
              }
            }}
          >
            <CheckIcon
              strokeWidth={4}
              className={cn(
                "size-3 text-muted-foreground transition-opacity group-hover/button:opacity-100",
                task.completed ? "opacity-100" : "opacity-0",
              )}
            />
          </Button>

          <Card className="space-y-1.5 rounded-none border-none py-2">
            <CardContent className="p-0">
              <p
                id="task-content"
                className={cn(
                  "text-sm max-md:me-16",
                  task.completed && "text-muted-foreground line-through",
                )}
              >
                {task.content}
              </p>
            </CardContent>
            <CardFooter className="flex gap-4 p-0">
              {task.due_date && location.pathname !== "/app/today" && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs text-muted-foreground",
                    getTaskDueDateColorClass(task.due_date, task.completed),
                  )}
                >
                  <CalendarDays size={14} />
                  {formatCustomDate(task.due_date)}
                </div>
              )}

              {location.pathname !== "/app/inbox" &&
                location.pathname !== `/app/projects/${project?.$id}` && (
                  <div className="ms-auto grid grid-cols-[minmax(0,180px),max-content] items-center gap-1 text-xs text-muted-foreground">
                    <div className="truncate text-right">
                      {task.project?.name || "Inbox"}
                    </div>

                    {task.project ? (
                      <HashIcon size={14} color={task.project.color_hex} />
                    ) : (
                      <InboxIcon size={14} className="text-muted-foreground" />
                    )}
                  </div>
                )}
            </CardFooter>
          </Card>

          <div className="absolute right-0 top-1.5 flex items-center gap-1 bg-background ps-1 opacity-0 shadow-[-10px_0_5px_hst(var(--background))] focus-within:opacity-100 group-hover/card:opacity-100 max-md:opacity-100">
            {!task.completed && (
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

            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 text-muted-foreground"
                      aria-label="Delete task"
                    >
                      <Trash2Icon />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete task</TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete task?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The <strong>{truncateString(task.content, 48)}</strong> task
                    will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      fetcher.submit(JSON.stringify({ id: task.id }), {
                        action: "/app",
                        method: "DELETE",
                        encType: "application/json",
                      });
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ) : (
        <TaskForm
          className="my-1"
          defaultFormData={{
            ...task,
            project: project && project?.$id,
          }}
          mode="edit"
          onCancel={() => setShowTaskForm(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: "/app",
              method: "PUT",
              encType: "application/json",
            });

            setShowTaskForm(false);
          }}
        />
      )}
    </>
  );
};
