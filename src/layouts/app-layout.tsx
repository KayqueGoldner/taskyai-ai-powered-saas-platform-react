/**
 * node modules
 */
import { Outlet } from "react-router";

/**
 * components
 */
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={500} disableHoverableContent>
        <AppSidebar />

        <SidebarTrigger />
        <Outlet />
      </TooltipProvider>
    </SidebarProvider>
  );
};
