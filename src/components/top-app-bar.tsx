/**
 * node modules
 */
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * components
 */
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Kbd } from "@/components/kbd";

/**
 * types
 */
interface TopAppBarProps {
  title: string;
  taskCount?: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ title, taskCount }) => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const handleShowTitle = () => {
      setShowTitle(window.scrollY > 70);
    };

    handleShowTitle();
    window.addEventListener("scroll", handleShowTitle);

    return () => window.removeEventListener("scroll", handleShowTitle);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-40 grid h-14 grid-cols-[40px,minmax(0,1fr),40px] items-center bg-background px-4",
        showTitle && "border-b",
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent className="flex items-center">
          <p>Toggle sidebar</p>

          <Kbd kbdList={["Ctrl", "B"]} />
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          "mx-auto max-w-[480px] text-center transition-[transform,opacity]",
          showTitle ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        )}
      >
        <h1 className="truncate font-semibold">{title}</h1>

        {Boolean(taskCount) && (
          <div className="text-xs text-muted-foreground">{taskCount} Tasks</div>
        )}
      </div>
    </div>
  );
};
