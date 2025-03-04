/**
 * node modules
 */
import { Link } from "react-router";

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

/**
 * constants
 */
import { SIDEBAR_LINKS } from "@/constants";

/**
 * assets
 */
import { CirclePlus, Plus, ChevronRight } from "lucide-react";

export const AppSidebar = () => {
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
                <SidebarMenuButton className="!text-primary">
                  <CirclePlus /> Add task
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* sidebar links */}
              {SIDEBAR_LINKS.map((link, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
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
              <TooltipTrigger asChild>
                <SidebarGroupAction aria-label="Add project">
                  <Plus />
                </SidebarGroupAction>
              </TooltipTrigger>
              <TooltipContent side="right">Add project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <p className="p-2 text-sm text-muted-foreground">
                      Click + to add a project
                    </p>
                  </SidebarMenuItem>
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
