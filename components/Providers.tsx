"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "@/tamagui.config";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TamaguiBridge>{children}</TamaguiBridge>
    </ThemeProvider>
  );
}

function TamaguiBridge({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={mounted && resolvedTheme === "dark" ? "dark" : "light"}
      disableInjectCSS={false}
    >
      {children}
    </TamaguiProvider>
  );
}
