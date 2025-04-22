/**
 * node modules
 */
import { cn } from "@/lib/utils";

/**
 * components
 */
import { Input } from "@/components/ui/input";

/**
 * assets
 */
import { Loader2Icon, SearchIcon } from "lucide-react";

/**
 * types
 */
export type SearchingState = "idle" | "loading" | "searching";
interface ProjectSearchFieldProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  searchingState: SearchingState;
}

export const ProjectSearchField: React.FC<ProjectSearchFieldProps> = ({
  handleChange,
  searchingState,
}) => {
  return (
    <div className="relative">
      <SearchIcon
        size={18}
        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        type="text"
        name="q"
        placeholder="Search projects"
        onChange={handleChange}
        className="w-full px-8"
      />

      <Loader2Icon
        size={18}
        className={cn(
          "pointer-events-none absolute right-2 top-2.5 hidden text-muted-foreground",
          searchingState !== "idle" && "block animate-spin",
        )}
      />
    </div>
  );
};
