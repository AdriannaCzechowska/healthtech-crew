"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { api } from "@/lib/api";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const { setUser, setTheme, setContrastMode, setFontSize } = useAppStore();

  useEffect(() => {
    // Initialize user
    api.getUser().then(setUser);

    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    // Initialize accessibility settings
    const savedContrast = localStorage.getItem("contrastMode") as "normal" | "high" | "higher" | null;
    if (savedContrast) {
      setContrastMode(savedContrast);
    }

    const savedFontSize = localStorage.getItem("fontSize") as "normal" | "large" | "xlarge" | null;
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
  }, [setUser, setTheme, setContrastMode, setFontSize]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

