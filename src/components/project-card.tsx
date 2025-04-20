/**
 * node modules
 */
import { Link } from "react-router";

/**
 * components
 */
import { Button } from "@/components/ui/button";
import { ProjectActionMenu } from "@/components/project-action-menu";

/**
 * assets
 */
import { HashIcon, MoreHorizontalIcon } from "lucide-react";

/**
 * types
 */
import type { Models } from "appwrite";
interface ProjectCardProps {
  project: Models.Document;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group/card relative flex h-14 items-center gap-3 rounded-lg px-2 hover:bg-secondary">
      <HashIcon size={16} color={project.color_hex} className="shrink-0" />

      <p className="max-w-[48ch] truncate text-sm">{project.name}</p>

      <ProjectActionMenu
        defaultFormData={{
          id: project.$id,
          name: project.name,
          color_name: project.color_name,
          color_hex: project.color_hex,
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="reltive z-20 ms-auto shrink-0 opacity-0 group-hover/card:opacity-100 max-md:opacity-100"
          aria-label="More actions"
        >
          <MoreHorizontalIcon />
        </Button>
      </ProjectActionMenu>

      <Link
        to={`/app/projects/${project.$id}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">View project</span>
      </Link>
    </div>
  );
};
