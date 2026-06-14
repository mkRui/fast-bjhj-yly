import type { ThemeMode } from "@/types";
import { configManager } from "@/config/manager";

export function applyTheme(mode: ThemeMode): void {
  const resolved = mode === "dark" ? "dark" : "light";
  document.body.setAttribute("mor-theme", resolved);
  document.documentElement.setAttribute("data-theme", resolved);
}

export function getStoredThemeMode(): ThemeMode {
  const mode = configManager.getTheme().mode;
  return mode === "dark" ? "dark" : "light";
}
