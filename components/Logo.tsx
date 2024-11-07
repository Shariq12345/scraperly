import { cn } from "@/lib/utils";
import { SquareDashedMousePointerIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LogoProps {
  fontSize?: string;
  iconSize?: number;
}

export const Logo = ({ fontSize = "text-2xl", iconSize = 20 }: LogoProps) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 p-2">
        <SquareDashedMousePointerIcon
          size={iconSize}
          className="stroke-white"
        />
      </div>
      <div className="">
        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Scraperly
        </span>
      </div>
    </Link>
  );
};
