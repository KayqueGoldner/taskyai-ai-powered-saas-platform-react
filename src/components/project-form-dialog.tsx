/**
 * node modules
 */
import { useState } from "react";
import { useFetcher } from "react-router";

/**
 * components
 */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProjectForm } from "@/components/project-form";

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!rounded-xl border-0 p-0">
        <ProjectForm
          mode={method === "POST" ? "create" : "edit"}
          defaultFormData={defaultFormData}
          onSubmit={async (data) => {
            setOpen(false);

            await fetcher.submit(JSON.stringify(data), {
              method: method,
              action: "/app/projects",
              encType: "application/json",
            });
          }}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
