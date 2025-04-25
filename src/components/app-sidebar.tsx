/**
 * node modules
 */
import { Link, useLocation } from "react-router";

/**
 * components
 */
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { UserButton } from "@clerk/clerk-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TaskFormDialog } from "@/components/task-form-dialog";
import { ProjectFormDialog } from "@/components/project-form-dialog";
import { ProjectActionMenu } from "@/components/project-action-menu";

/**
 * hooks
 */
import { useSidebar } from "@/components/ui/sidebar";
import { useProjects } from "@/contexts/project-context";

/**
 * constants
 */
import { SIDEBAR_LINKS } from "@/constants";

/**
 * assets
 */
import {
  CirclePlus,
  Plus,
  ChevronRight,
  HashIcon,
  MoreHorizontalIcon,
} from "lucide-react";

export const AppSidebar = () => {
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  const projects = useProjects();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/app/inbox" className="p-2">
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* task create button */}
              <SidebarMenuItem>
                <TaskFormDialog>
                  <SidebarMenuButton className="!text-primary">
                    <CirclePlus /> Add task
                  </SidebarMenuButton>
                </TaskFormDialog>
              </SidebarMenuItem>

              {/* sidebar links */}
              {SIDEBAR_LINKS.map((link, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    isActive={location.pathname === link.href}
                    onClick={() => {
                      if (isMobile) setOpenMobile(false);
                    }}
                    asChild
                  >
                    <Link to={link.href}>
                      <link.icon />

                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>0</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* all projects */}
        <Collapsible className="group/collapsible" defaultOpen>
          <SidebarGroup>
            <SidebarGroupLabel
              className="text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
            >
              <CollapsibleTrigger>
                <ChevronRight className="me-2 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            <Tooltip>
              <ProjectFormDialog method="POST">
                <TooltipTrigger asChild>
                  <SidebarGroupAction aria-label="Add project">
                    <Plus />
                  </SidebarGroupAction>
                </TooltipTrigger>
              </ProjectFormDialog>
              <TooltipContent side="right">Add project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects?.documents
                    .slice(0, 5)
                    .map(({ $id, name, color_name, color_hex }) => (
                      <SidebarMenuItem key={$id}>
                        <SidebarMenuButton
                          isActive={
                            location.pathname === `/app/projects/${$id}`
                          }
                          onClick={() => {
                            if (isMobile) setOpenMobile(false);
                          }}
                          asChild
                        >
                          <Link to={`/app/projects/${$id}`}>
                            <HashIcon color={color_hex} />
                            <span>{name}</span>
                          </Link>
                        </SidebarMenuButton>

                        <ProjectActionMenu
                          defaultFormData={{
                            id: $id,
                            name,
                            color_name,
                            color_hex,
                          }}
                          side="right"
                          align="start"
                          sideOffset={16}
                        >
                          <SidebarMenuAction
                            aria-label="Project actions"
                            className="bg-sidebar-accent"
                            showOnHover
                          >
                            <MoreHorizontalIcon />
                          </SidebarMenuAction>
                        </ProjectActionMenu>
                      </SidebarMenuItem>
                    ))}

                  {projects !== null && projects.total > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className="text-muted-foreground"
                        isActive={location.pathname === "/app/projects"}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false);
                        }}
                        asChild
                      >
                        <Link to="/app/projects">
                          <MoreHorizontalIcon /> All projects
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {!projects?.total && (
                    <SidebarMenuItem>
                      <p className="p-2 text-sm text-muted-foreground">
                        Click + to add a project
                      </p>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <UserButton
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger:
                "!shadow-none w-full justify-start p-2 rounded-md hover:bg-sidebar-accent",
              userButtonBox: "flex-row-reverse shadow-none gap-2",
              userButtonOuterIdentifier: "ps-0",
              popoverBox: "pointer-events-auto",
            },
          }}
          showName
        />
      </SidebarFooter>
    </Sidebar>
  );
};
