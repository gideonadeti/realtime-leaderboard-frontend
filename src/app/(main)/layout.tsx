"use client";

import AppSidebar from "./components/app-sidebar";
import Header from "./components/header";
import QCProvider from "./components/q-c-provider";
import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QCProvider>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </SidebarProvider>
      </QCProvider>
    </ThemeProvider>
  );
};

export default Layout;
