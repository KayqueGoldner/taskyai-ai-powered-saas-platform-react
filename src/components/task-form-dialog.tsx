/**
 * node modules
 */
import { useState, useEffect } from "react";
import { useLocation, useFetcher } from "react-router";
import { startOfToday } from "date-fns";

/**
 * components
 */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TaskForm } from "@/components/task-form";

/**
 * types
 */
import type { PropsWithChildren } from "react";

export const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const fetcher = useFetcher();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === "q") {
        const target = event.target as HTMLElement;

        if (target.localName === "textarea") return;

        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!rounded-xl border-0 p-0">
        <TaskForm
          defaultFormData={{
            content: "",
            due_date:
              location.pathname === "/app/today" ? startOfToday() : null,
            project: null,
          }}
          mode="create"
          onCancel={() => setOpen(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData), {
              action: "/app",
              method: "POST",
              encType: "application/json",
            });

            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
