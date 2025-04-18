/**
 * node modules
 */
import { useState } from "react";
import { useFetcher } from "react-router";

/**
 * custom modules
 */
import { truncateString } from "@/lib/utils";

/**
 * components
 */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProjectForm } from "@/components/project-form";

/**
 * hooks
 */
import { useToast } from "@/hooks/use-toast";

/**
 * types
 */
import type { Project } from "@/types";

interface ProjectFormDialogProps {
  children: React.ReactNode;
  defaultFormData?: Project;
  method: "POST" | "PUT";
}

export const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({
  children,
  defaultFormData,
  method,
}) => {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!rounded-xl border-0 p-0">
        <ProjectForm
          mode={method === "POST" ? "create" : "edit"}
          defaultFormData={defaultFormData}
          onSubmit={async (data) => {
            setOpen(false);

            const { id, update } = toast({
              title: `Project ${
                method === "POST" ? "creating" : "updating"
              } project...`,
              duration: Infinity,
            });

            await fetcher.submit(JSON.stringify(data), {
              method: method,
              action: "/app/projects",
              encType: "application/json",
            });

            update({
              id,
              title: `Project ${
                method === "POST" ? "created" : "updated"
              } successfully`,
              description: `The project ${truncateString(data.name, 32)} ${data.ai_task_gen ? "and its tasks" : ""} have been successfully ${
                method === "POST" ? "created" : "updated"
              }.`,
              duration: 5000,
            });
          }}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
