"use client";

import { Toaster } from "@workspace/ui/components";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";
import StoreInitializer from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <StoreInitializer />
      <Toaster />
      {children}
    </NextThemesProvider>
  );
}
