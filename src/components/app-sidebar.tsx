import * as React from "react";
import { useAuthContext } from "@/context/AuthContext";
import logoWhite from "@/assets/images/logo-white.png";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Manage",
      url: "#",
      isActive: true,
      icon: "layout-grid",
    },
    {
      title: "Orders",
      url: "#",
      isActive: false,
      icon: "shopping-cart",
    },
    {
      title: "Users",
      url: "#",
      isActive: false,
      icon: "users-round",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { dispatch } = useAuthContext();

  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader className="bg-neutral-800">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center">
            <img src={logoWhite} className="aspect-square w-32" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-neutral-800 px-2 flex justify-between">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton size={"lg"} asChild isActive={item.isActive}>
                  <div>
                    <a
                      href={item.url}
                      className="text-white font-semibold text-lg flex flex-row gap-2 items-center"
                    >
                      <DynamicIcon
                        name={item.icon as IconName}
                        size={25}
                        className="text-white"
                      />
                      {item.title}
                    </a>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <Button
              onClick={() => dispatch({ type: "LOGOUT" })}
              variant={"outline"}
              className="font-semibold border-white bg-transparent text-white"
            >
              Logout
            </Button>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
