"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ClipboardList, Globe } from "lucide-react";

import SubmitScore from "./dialogs/submit-score";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
];

const AppSidebar = () => {
  const pathname = usePathname();
  const [openSubmitScore, setOpenSubmitScore] = useState(false);

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
