/**
 * components
 */
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ProjectFormDialog } from "@/components/project-form-dialog";
import { Button } from "@/components/ui/button";
import { ProjectDeleteButton } from "@/components/project-delete-button";

/**
 * assets
 */
import { EditIcon } from "lucide-react";

/**
 * types
 */
import type { Project } from "@/types";
import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
interface ProjectActionMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project;
}

export const ProjectActionMenu: React.FC<ProjectActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild>
          <ProjectFormDialog method="PUT" defaultFormData={defaultFormData}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start px-2"
            >
              <EditIcon /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
