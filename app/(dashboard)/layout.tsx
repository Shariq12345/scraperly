import React from "react";
import { BreadCrumbHeader } from "@/components/bread-crumb-header";
import { DesktopSidebar } from "@/components/sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, UserButton } from "@clerk/nextjs";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed so it remains in place while scrolling */}
      <div className="flex-shrink-0">
        <DesktopSidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 h-[60px] bg-background shadow-md">
          <BreadCrumbHeader />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        <Separator />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <div className="container mx-auto text-accent-foreground">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
