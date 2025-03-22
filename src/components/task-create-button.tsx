/**
 * components
 */
import { Button } from "@/components/ui/button";

/**
 * assets
 */
import { CirclePlus } from "lucide-react";

/**
 * types
 */
type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

export const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant="link"
      className="mb-4 w-full justify-start px-0"
      {...props}
    >
      <CirclePlus /> Add task
    </Button>
  );
};
