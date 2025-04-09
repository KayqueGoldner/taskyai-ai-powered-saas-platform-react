/**
 * node modules
 */
import { Outlet, useNavigation } from "react-router";
import { cn } from "@/lib/utils";

/**
 * components
 */
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export const AppLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <SidebarProvider>
        <TooltipProvider delayDuration={500} disableHoverableContent>
          <AppSidebar />

          <main
            className={cn(
              "flex-1",
              isLoading && "pointer-events-none opacity-50",
            )}
          >
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>

      <Toaster />
    </>
  );
};
