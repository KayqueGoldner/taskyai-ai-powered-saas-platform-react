/**
 * node modules
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday,
} from "date-fns";
import { redirect } from "react-router";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function formatCustomDate(date: string | number | Date) {
  const today = new Date();

  // get relative day string
  const relativeDay = toTitleCase(formatRelative(date, today).split(" at ")[0]);

  // list of relative keywords to check
  const relativeDays = [
    "Today",
    "Tomorrow",
    "Yesterday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
  ];

  // return the relative day if it matches
  if (relativeDays.includes(relativeDay)) {
    return relativeDay;
  }

  if (isSameYear(date, today)) {
    return format(date, "dd MMM");
  } else {
    return format(date, "dd MMM yyyy");
  }
}

export function getTaskDueDateColorClass(
  dueDate: Date | null,
  completed?: boolean,
): string | undefined {
  if (dueDate === null || completed === undefined) return;

  if (isBefore(dueDate, startOfToday()) && !completed) {
    return "text-red-500";
  }

  if (isToday(dueDate)) {
    return "text-emerald-500";
  }

  if (isTomorrow(dueDate) && !completed) {
    return "text-amber-500";
  }
}

export function generateID() {
  return Math.random().toString(36).slice(8) + Date.now().toString(36);
}

export function getUserId(): string {
  const clerkUserId = localStorage.getItem("clerkUserId");

  if (!clerkUserId) {
    redirect("/auth-sync");
    return "";
  }

  return clerkUserId;
}
