/**
 * assets
 */
import {
  todayTaskEmptyState,
  inboxTaskEmptyState,
  upcomingTaskEmptyState,
  completedTaskEmptyState,
  projectTaskEmptyState,
} from "@/assets";

/**
 * types
 */
type EmptyStateType = "today" | "inbox" | "upcoming" | "completed" | "project";

interface TaskEmptyStateProps {
  type?: EmptyStateType;
}

interface EmptyStateContent {
  img?: {
    src: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
}

const emptyStates: Record<EmptyStateType, EmptyStateContent> = {
  today: {
    img: {
      src: todayTaskEmptyState,
      width: 226,
      height: 260,
    },
    title: "What do you need to get done today?",
    description:
      "By default, tasks added here will be due today. Click + to add a task.",
  },
  inbox: {
    img: {
      src: inboxTaskEmptyState,
      width: 344,
      height: 260,
    },
    title: "What’s on your mind?",
    description:
      "Capture tasks that don’t have a specific category. Click + to add a task.",
  },
  upcoming: {
    img: {
      src: upcomingTaskEmptyState,
      width: 208,
      height: 260,
    },
    title: "Plan ahead with ease!",
    description:
      "Tasks added here will be due in the future. Click + to schedule a task.",
  },
  completed: {
    img: {
      src: completedTaskEmptyState,
      width: 231,
      height: 260,
    },
    title: "You’ve been productive!",
    description:
      "All the tasks you’ve completed will appear here. Keep up the great work!",
  },
  project: {
    img: {
      src: projectTaskEmptyState,
      width: 228,
      height: 260,
    },
    title: "Let’s build something amazing!",
    description:
      "Add tasks specific to this project. Click + to start planning.",
  },
};

export const TaskEmptyState: React.FC<TaskEmptyStateProps> = ({
  type = "today",
}) => {
  const { description, img, title } = emptyStates[type];

  return (
    <div className="mx-auto flex max-w-[360px] flex-col items-center text-center">
      {img && (
        <figure>
          <img src={img.src} width={img.width} height={img.height} alt="" />
        </figure>
      )}

      <div className="mb-2 mt-4">{title}</div>

      <p className="px-4 text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
