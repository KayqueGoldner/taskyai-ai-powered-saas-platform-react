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
  const { toast } = useToast();

  const handleProjectDelete = useCallback(async () => {
    const { id, update } = toast({
      title: "Deleting project...",
      description: "Please wait while we delete the project.",
      duration: Infinity,
    });

    try {
      await fetcher.submit(defaultFormData, {
        action: "/app/projects",
        method: "DELETE",
        encType: "application/json",
      });

      update({
        id,
        title: "Project deleted",
        description: `The ${truncateString(defaultFormData.name, 32)} project has been deleted successfully.`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error deleting project", error);

      update({
        id,
        title: "Error deleting project",
        description: "An error occurred while deleting the project.",
        duration: 5000,
        variant: "destructive",
      });
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
