"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { NavMain } from "@/components/nav-main"
import { NavDocuments } from "@/components/nav-documents"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  HomeIcon,
  BriefcaseIcon,
  ImageIcon,
  InfoIcon,
  UsersIcon,
  MailIcon,
  MessageSquareQuoteIcon,
  PanelBottomIcon,
  SearchIcon,
  Settings2Icon,
} from "lucide-react"

const data = {
  user: {
    name: "Admin",
    email: "admin@forensilabs.com",
    avatar: "",
  },
  navMain: [
    { title: "Dashboard", url: "/admin/dashboard", icon: <LayoutDashboardIcon /> },
    { title: "Home", url: "/admin/pages/home", icon: <HomeIcon /> },
    { title: "Services", url: "/admin/pages/services", icon: <BriefcaseIcon /> },
    { title: "Gallery", url: "/admin/pages/gallery", icon: <ImageIcon /> },
    { title: "About", url: "/admin/pages/about", icon: <InfoIcon /> },
    { title: "Team", url: "/admin/pages/team", icon: <UsersIcon /> },
  ],
  navInquiries: [
    { name: "Quotes", url: "/admin/sections/request-quote", icon: <MessageSquareQuoteIcon /> },
    { name: "Contact Us", url: "/admin/sections/contact-us", icon: <MailIcon /> },
  ],
  navContent: [
    { title: "Footer", url: "/admin/sections/footer", icon: <PanelBottomIcon /> },
  ],
  navSecondary: [
    { title: "SEO", url: "/admin/seo", icon: <SearchIcon /> },
    { title: "Settings", url: "#", icon: <Settings2Icon /> },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5 h-auto">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <Image src="/fL logo-01.png" alt="ForensiLabs" width={100} height={32} className="h-8 w-auto" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.navInquiries} />
        <NavSecondary items={data.navContent} label="Content" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
