/**
 * node modules
 */
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

/**
 * components
 */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

/**
 * assets
 */
import { CircleIcon, ChevronDownIcon, CheckIcon, BotIcon } from "lucide-react";

/**
 * constants
 */
import { PROJECT_COLORS } from "@/constants";
const DEFAULT_PROJECT_NAME = "Untitled";
const DEFAULT_PROJECT_COLOR_NAME = "Slate";
const DEFAULT_PROJECT_COLOR_HEX = "#64748b";
const DEFAULT_FORM_DATA: Project = {
  id: null,
  name: DEFAULT_PROJECT_NAME,
  color_name: DEFAULT_PROJECT_COLOR_NAME,
  color_hex: DEFAULT_PROJECT_COLOR_HEX,
};

/**
 * types
 */
import type { Project, ProjectForm as ProjectFormType } from "@/types";

interface ProjectFormProps {
  defaultFormData?: Project;
  mode: "create" | "edit";
  onCancel?: () => void;
  onSubmit?: (formData: ProjectFormType) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  mode,
  onCancel = () => {},
  onSubmit,
}) => {
  const [projectName, setProjectName] = useState(defaultFormData.name);
  const [projectNameCharCount, setProjectNameCharCount] = useState(
    defaultFormData.name.length,
  );
  const [colorName, setColorName] = useState(defaultFormData.color_name);
  const [colorHex, setColorHex] = useState(defaultFormData.color_hex);
  const [colorOpen, setColorOpen] = useState(false);
  const [aiTaskGen, setAiTaskGen] = useState(false);
  const [taskGenPrompt, setTaskGenPrompt] = useState("");
  const [formData, setFormData] = useState<ProjectFormType>({
    ...defaultFormData,
    ai_task_gen: aiTaskGen,
    task_gen_prompt: taskGenPrompt,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: projectName,
      color_name: colorName,
      color_hex: colorHex,
      ai_task_gen: aiTaskGen,
      task_gen_prompt: taskGenPrompt,
    }));
  }, [projectName, colorName, colorHex, aiTaskGen, taskGenPrompt]);

  const handleSubmit = useCallback(() => {
    onSubmit?.(formData);
  }, [formData, onSubmit]);

  const handleKeySubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>
          {mode === "create" ? "Add Project" : "Edit Project"}
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="grid grid-cols-1 gap-2 p-4">
        <div>
          <Label htmlFor="project_name">Name</Label>

          <Input
            id="project_name"
            type="text"
            placeholder="Project Name"
            className="mb-1 mt-2"
            onInput={(e) => {
              const inputValue = e.currentTarget.value;
              setProjectName(inputValue);
              setProjectNameCharCount(inputValue.length);
            }}
            value={projectName}
            maxLength={120}
            onKeyDown={handleKeySubmit}
          />

          <div
            className={cn(
              "ms-auto max-w-max text-xs text-muted-foreground",
              projectNameCharCount >= 110 && "text-red-500",
            )}
          >
            {projectNameCharCount}/120
          </div>
        </div>

        <div>
          <Label htmlFor="color">Color</Label>

          <Popover open={colorOpen} onOpenChange={setColorOpen} modal>
            <PopoverTrigger asChild>
              <Button variant="outline" id="color" className="mt-2 w-full">
                <CircleIcon fill={colorHex} />
                {colorName}
                <ChevronDownIcon className="ms-auto" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-[478px] p-0 max-sm:w-[360px]"
            >
              <Command>
                <CommandInput placeholder="Search color..." />

                <CommandList>
                  <ScrollArea>
                    <CommandEmpty>No color found.</CommandEmpty>

                    <CommandGroup heading="Colors">
                      {PROJECT_COLORS.map(({ name, hex }) => (
                        <CommandItem
                          key={hex}
                          value={`${name}=${hex}`}
                          onSelect={(value) => {
                            const [name, hex] = value.split("=");
                            setColorName(name);
                            setColorHex(hex);
                            setColorOpen(false);
                          }}
                        >
                          <CircleIcon fill={hex} />
                          {name}
                          {colorName === name && (
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
        </div>

        {mode === "create" && (
          <div className="mt-6 rounded-md border">
            <div className="flex items-center gap-3 px-3 py-2">
              <BotIcon className="shrink-0 text-muted-foreground" />
              <div className="me-auto space-y-0.5">
                <Label htmlFor="ai_generate" className="block text-sm">
                  AI Task Generator
                </Label>

                <p className="text-xs text-muted-foreground">
                  Automatically create tasks by providing a simple prompt.
                </p>
              </div>

              <Switch
                id="ai_generate"
                checked={aiTaskGen}
                onCheckedChange={setAiTaskGen}
              />
            </div>

            {aiTaskGen && (
              <Textarea
                autoFocus={true}
                placeholder="Tell me about your project. What you want to accomplish?"
                className="resize-none border-none"
                value={taskGenPrompt}
                onChange={(e) => setTaskGenPrompt(e.target.value)}
                onKeyDown={handleKeySubmit}
              />
            )}
          </div>
        )}
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-end gap-3 p-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!projectName || (aiTaskGen && !taskGenPrompt)}
        >
          {mode === "create" ? "Add" : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
};
