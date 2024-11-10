import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import React from "react";

interface WorkflowLayoutProps {
  children: React.ReactNode;
}

const WorkflowLayout = ({ children }: WorkflowLayoutProps) => {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ModeToggle />
      </footer>
    </div>
  );
};

export default WorkflowLayout;
