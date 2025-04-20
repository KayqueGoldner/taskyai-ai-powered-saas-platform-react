/**
 * node modules
 */
import { useFetcher, useNavigate, useLocation } from "react-router";
import { useCallback } from "react";

/**
 * custom modules
 */
import { truncateString } from "@/lib/utils";

/**
 * components
 */
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

/**
 * hooks
 */
import { useToast } from "@/hooks/use-toast";

/**
 * assets
 */
import { Trash2Icon } from "lucide-react";

/**
 * types
 */
import type { Project } from "@/types";
interface ProjectDeleteButtonProps {
  defaultFormData: Project;
}

export const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher();

  const handleProjectDelete = useCallback(async () => {
    try {
      await fetcher.submit(defaultFormData, {
        action: "/app/projects",
        method: "DELETE",
        encType: "application/json",
      });
    } catch (error) {
      console.error("Error deleting project", error);
    }
  }, [defaultFormData]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start px-2 !text-destructive"
        >
          <Trash2Icon /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            The <strong>{truncateString(defaultFormData.name, 48)}</strong>{" "}
            project and all of its tasks will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleProjectDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
