"use client";

import { Package, ShoppingCart, Users, BarChart3, Settings, SquarePen, PackagePlus, ChevronRight, Shapes } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const items = [
    {
        title: "Products", url: "/admin/products", icon: Package, subItems: [
            { title: "Product List", url: "/admin/products", icon: Package },
            { title: "Add Product", url: "/admin/products/add", icon: PackagePlus },
            { title: "Edit Product", url: "/admin/products/edit", icon: SquarePen },
        ]
    },
    { title: "Categories", url: "/admin/categories", icon: Shapes },
    { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
    { title: "Customers", url: "/admin/customers", icon: Users },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
    { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
    const { state } = useSidebar();
    const collapsed = state === "collapsed";
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <Sidebar collapsible="icon" className={collapsed ? "w-14" : "w-60"}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                    <SidebarGroupContent className="space-y-1">
                        {items.map((item) => (
                            <Collapsible key={item.title} defaultOpen className="group/collapsible">
                                <SidebarMenuItem className="list-none">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild isActive={isActive(item.url)} className={`${isActive(item.url) ? 'text-primary' : ''}`}>
                                            <Link href={item.url} passHref>
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {!collapsed && <span>{item.title}</span>}

                                                {
                                                    item.subItems?.length ? <ChevronRight className={`ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90`} /> : null
                                                }
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {
                                        item.subItems?.length ? <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.subItems.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title} className={`${isActive(subItem.url) ? 'text-primary' : ''}`}>
                                                        <Link href={subItem.url} className="flex items-center">
                                                            <subItem.icon className="mr-2 h-4 w-4" />
                                                            {!collapsed && <span>{subItem.title}</span>}
                                                        </Link>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent> : null
                                    }
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}