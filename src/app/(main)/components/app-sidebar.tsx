"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ClipboardList, Earth, Globe } from "lucide-react";

import SubmitScore from "./dialogs/submit-score";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useActivities from "../activities/hooks/use-activities";

interface MenuItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const menuItems: MenuItem[] = [
  {
    href: "/activities",
    icon: <ClipboardList />,
    label: "Activities",
  },
  {
    href: "/activities/global/leaderboard",
    icon: <Globe />,
    label: "Global Leaderboard",
  },
  {
    href: "/activities/global/report",
    icon: <Earth />,
    label: "Global Report",
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const [openSubmitScore, setOpenSubmitScore] = useState(false);
  const { activitiesQuery } = useActivities();
  const activities = activitiesQuery.data || [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.href === "/activities" && (
                    <SidebarMenuBadge>
                      {activities.length > 99 ? "99+" : activities.length}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <Button variant="outline" onClick={() => setOpenSubmitScore(true)}>
            Submit Score
          </Button>
        </SidebarGroup>
      </SidebarFooter>
      <SubmitScore open={openSubmitScore} onOpenChange={setOpenSubmitScore} />
    </Sidebar>
  );
};

export default AppSidebar;
