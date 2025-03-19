/**
 * node modules
 */
import { Outlet } from "react-router";

/**
 * components
 */
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={500} disableHoverableContent>
        <AppSidebar />

        <main className="flex-1">
          <Outlet />
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
};
