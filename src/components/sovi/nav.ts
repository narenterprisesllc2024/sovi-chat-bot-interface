import type { LucideIcon } from "lucide-react";
import {
  Box,
  Brain,
  FolderKanban,
  Image,
  LayoutGrid,
  MessageSquare,
  Settings2,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { FeatureFlags } from "@/lib/sovi/types";

export type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
  show: (flags: FeatureFlags) => boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Chat", icon: MessageSquare, show: () => true },
  { to: "/projects", label: "Projects", icon: FolderKanban, show: () => true },
  { to: "/agents", label: "Agents", icon: Sparkles, show: (f) => f.agents },
  { to: "/artifacts", label: "Artifacts", icon: Box, show: () => true },
  { to: "/memory", label: "Memory", icon: Brain, show: (f) => f.memory },
  {
    to: "/media",
    label: "Media",
    icon: Image,
    show: (f) => f.images || f.video || f.audio,
  },
  {
    to: "/automations",
    label: "Automations",
    icon: Workflow,
    show: (f) => f.workflows || f.automations,
  },
  { to: "/capabilities", label: "Capabilities", icon: LayoutGrid, show: () => true },
  { to: "/system", label: "System", icon: Settings2, show: () => true },
];
