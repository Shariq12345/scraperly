"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProvider,
} from "next-themes";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
