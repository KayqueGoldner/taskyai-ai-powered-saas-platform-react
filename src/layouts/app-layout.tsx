/**
 * node modules
 */
import { Outlet, useNavigation, useLoaderData } from "react-router";
import { cn } from "@/lib/utils";

/**
 * components
 */
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { ProjectProvider } from "@/contexts/project-context";

/**
 * types
 */
import type { AppLoaderData } from "@/routes/loaders/app-loader";

export const AppLayout = () => {
  const navigation = useNavigation();
  const { projects } = useLoaderData<AppLoaderData>();

  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <ProjectProvider projects={projects}>
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
      </ProjectProvider>
    </>
  );
};
