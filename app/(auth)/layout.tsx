import { Logo } from "@/components/Logo";
import React from "react";

interface AuthlayoutProps {
  children: React.ReactNode;
}

const Authlayout = ({ children }: AuthlayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo />
      {children}
    </div>
  );
};

export default Authlayout;
