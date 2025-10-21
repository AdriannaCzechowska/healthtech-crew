import { create } from "zustand";
import type { User } from "./types";

type ContrastMode = "normal" | "high" | "higher";
type FontSize = "normal" | "large" | "xlarge";

interface AppState {
  user: User | null;
  theme: "light" | "dark";
  contrastMode: ContrastMode;
  fontSize: FontSize;
  setUser: (user: User | null) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setContrastMode: (mode: ContrastMode) => void;
  setFontSize: (size: FontSize) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  theme: "light",
  contrastMode: "normal",
  fontSize: "normal",
  
  setUser: (user) => set({ user }),
  
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
      }
      return { theme: newTheme };
    }),
    
  setTheme: (theme) =>
    set(() => {
      if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
      }
      return { theme };
    }),
    
  setContrastMode: (mode) =>
    set(() => {
      if (typeof window !== "undefined") {
        document.documentElement.classList.remove("contrast-high", "contrast-higher");
        if (mode !== "normal") {
          document.documentElement.classList.add(`contrast-${mode}`);
        }
        localStorage.setItem("contrastMode", mode);
      }
      return { contrastMode: mode };
    }),
    
  setFontSize: (size) =>
    set(() => {
      if (typeof window !== "undefined") {
        document.documentElement.classList.remove("font-large", "font-xlarge");
        if (size !== "normal") {
          document.documentElement.classList.add(`font-${size}`);
        }
        localStorage.setItem("fontSize", size);
      }
      return { fontSize: size };
    }),
}));

