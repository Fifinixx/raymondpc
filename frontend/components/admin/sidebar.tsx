"use client";

import Link from "next/link";

import {
  Home,
  Package,
  UserRoundCog,
  Notebook,
  Logs,
  LayoutDashboardIcon,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import { SidebarItemsGroupType } from "@/lib/types";
const menus: SidebarItemsGroupType[] = [
    {
      group: "Products",
      items: [
        {
          title: "Manage Products",
          link: "/",
          icon: Package,
          subitems: [
            { title: "Add", link: "admin/products/add" },
            { title: "Edit", link: "admin/products/edit" },
            { title: "Delete", link: "admin/products/delete" },
          ],
        },
        {
          title: "Product Reports",
          link: "/product/reports",
          icon: Notebook,
        },
        {
          title: "Product Logs",
          link: "/product/logs",
          icon: Logs,
        },
      ],
    },
    {
      group: "User management",
      items: [
        {
          title: "Users",
          link: "/users",
          icon: UserRoundCog,
          subitems: [
            { title: "Add", link: "/users/add" },
            { title: "Edit", link: "/users/edit" },
            { title: "Delete", link: "/users/delete" },
          ],
        },
        {
            title:"User Logs",
            link:"/users/logs",
            icon:Logs
        }
      ],
    },
  ] ;

export function AppSidebar() {

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <div className="p-2 bg-[#ff6467] flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LayoutDashboardIcon className="size-4" />
                </div>
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {menus.map((item) => {
            return (
              <SidebarGroup key={item.group}>
                <SidebarGroupLabel>{item.group}</SidebarGroupLabel>
                <SidebarMenu>
                  {item.items.map((item) => {
                    return (
                      <Collapsible
                        key={item.title}
                        asChild
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                              {item.icon && <item.icon />}
                              <span>{item.title}</span>
                              {item?.subitems && (
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.subitems?.map((item) => {
                                return (
                                  <SidebarMenuSubItem key={item.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link href={item.link}>
                                        <span>{item.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            );
          })}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}
