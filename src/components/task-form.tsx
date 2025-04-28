/**
 * node modules
 */
import { useState, useEffect, useCallback } from "react";
import * as chrono from "chrono-node";

/**
 * custom modules
 */
import { formatCustomDate, getTaskDueDateColorClass, cn } from "@/lib/utils";

/**
 * components
 */
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * hooks
 */
import { useProjects } from "@/contexts/project-context";

/**
 * assets
 */
import {
  CalendarIcon,
  XIcon,
  InboxIcon,
  ChevronDownIcon,
  HashIcon,
  SendHorizonalIcon,
  CheckIcon,
} from "lucide-react";

/**
 * types
 */
import type { ClassValue } from "clsx";
import type { TaskForm as TaskFormType } from "@/types";
import type { Models } from "appwrite";

type TaskFormProps = {
  defaultFormData?: TaskFormType;
  className?: ClassValue;
  mode: "create" | "edit";
  onCancel?: () => void;
  onSubmit?: (formData: TaskFormType) => void;
};

const DEFAULT_FORM_DATA: TaskFormType = {
  content: "",
  due_date: null,
  project: null,
};

export const TaskForm: React.FC<TaskFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  className,
  mode,
  onCancel,
  onSubmit,
}) => {
  const projects = useProjects();

  const [taskContent, setTaskContent] = useState(defaultFormData.content);
  const [dueDate, setDueDate] = useState(defaultFormData.due_date);
  const [project, setProject] = useState(defaultFormData.project);

  const [projectName, setProjectName] = useState("");
  const [projectColorHex, setProjectColorHex] = useState("");

  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (project) {
      const { name, color_hex } = projects?.documents.find(
        ({ $id }) => $id === project,
      ) as Models.Document;

      setProjectName(name);
      setProjectColorHex(color_hex);
    }
  }, [projects, project]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      content: taskContent,
      due_date: dueDate,
      project,
    }));
  }, [taskContent, dueDate, project]);

  useEffect(() => {
    const chronoParsed = chrono.parse(taskContent);

    if (chronoParsed.length) {
      const lastDate = chronoParsed[chronoParsed.length - 1];
      setDueDate(lastDate.date());
    }
  }, [taskContent]);

  const handleSubmit = useCallback(() => {
    if (!taskContent) return;

    if (onSubmit) onSubmit(formData);

    setTaskContent("");
  }, [taskContent, onSubmit, formData]);

  return (
    <Card className={cn("focus-within:border-foreground/30", className)}>
      <CardContent className="p-2">
        <Textarea
          className="mb-2 !border-0 p-1 !ring-0"
          placeholder="After finishing the project, take a tour."
          value={taskContent}
          onInput={(e) => setTaskContent(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();

              handleSubmit();
            }
          }}
          autoFocus
        />

        <div className="max-w-max rounded-md ring-1 ring-border">
          <Popover open={dueDateOpen} onOpenChange={setDueDateOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(getTaskDueDateColorClass(dueDate, false))}
              >
                <CalendarIcon />
                {dueDate ? formatCustomDate(dueDate) : "Due Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                disabled={{ before: new Date() }}
                selected={dueDate ? new Date(dueDate) : undefined}
                onSelect={(selected) => {
                  setDueDate(selected || null);
                  setDueDateOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ms-2 px-2"
                  onClick={() => setDueDate(null)}
                  aria-label="Remove due date"
                >
                  <XIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove due date</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="grid grid-cols-[minmax(0,1fr),max-content] gap-2 p-2">
        <Popover open={projectOpen} onOpenChange={setProjectOpen} modal>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={projectOpen}
              className="max-w-max"
            >
              {projectName ? (
                <HashIcon color={projectColorHex} />
              ) : (
                <InboxIcon />
              )}
              <span className="truncate">{projectName || "Inbox"}</span>
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search project" />
              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No project found.</CommandEmpty>
                  <CommandGroup>
                    {projects?.documents.map(({ $id, name, color_hex }) => (
                      <CommandItem
                        key={$id}
                        onSelect={(value) => {
                          setProjectName(value === projectName ? "" : name);
                          setProject(value === projectName ? null : $id);
                          setProjectColorHex(
                            value === projectName ? undefined : color_hex,
                          );
                          setProjectOpen(false);
                        }}
                      >
                        <HashIcon color={color_hex} />
                        {name}
                        {projectName === name && (
                          <CheckIcon className="ms-auto" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onCancel}>
            <span className="max-md:hidden">Cancel</span>
            <XIcon className="md:hidden" />
          </Button>

          <Button disabled={!taskContent} onClick={handleSubmit}>
            <span className="max-md:hidden">
              {mode === "create" ? "Add task" : "Save"}
            </span>
            <SendHorizonalIcon className="md:hidden" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
