import { useEffect } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, PanelRight, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { useSovi } from "@/lib/sovi/store";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { Sidebar } from "./sidebar";
import { RightPanel } from "./right-panel";
import { VoiceMode } from "./voice-mode";
import { PresenceChip } from "./presence";
import { SoviWordmark } from "./mark";
import { NAV_ITEMS } from "./nav";
import { cn } from "@/lib/utils";

export function Cockpit() {
  const init = useSovi((s) => s.init);
  const setOwner = useSovi((s) => s.setOwner);
  const ready = useSovi((s) => s.ready);
  const user = useCurrentUser();
  useEffect(() => {
    if (user?.id) setOwner(user.id);
    void init();
  }, [init, setOwner, user?.id]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <SoviWordmark />
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={250}>
      <CockpitShell />
      <VoiceMode />
      <Toaster position="bottom-right" theme="system" />
    </TooltipProvider>
  );
}

function CockpitShell() {
  const sidebarOpen = useSovi((s) => s.sidebarOpen);
  const setSidebar = useSovi((s) => s.setSidebarOpen);
  const mobileNav = useSovi((s) => s.mobileNavOpen);
  const setMobileNav = useSovi((s) => s.setMobileNavOpen);
  const rightPanel = useSovi((s) => s.rightPanel);
  const setRight = useSovi((s) => s.setRightPanel);
  const theme = useSovi((s) => s.theme);
  const setTheme = useSovi((s) => s.setTheme);
  const presence = useSovi((s) => s.presence);
  const power = useSovi((s) => s.powerMode);
  const setPower = useSovi((s) => s.setPowerMode);
  const flags = useSovi((s) => s.flags);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const conversations = useSovi((s) => s.conversations);
  const title =
    pathname === "/"
      ? "Sovi"
      : pathname.startsWith("/c/")
        ? (conversations.find((c) => pathname.endsWith(c.id))?.title ?? "Sovi")
        : (NAV_ITEMS.find((n) => n.to !== "/" && pathname.startsWith(n.to))?.label ?? "Sovi");

  return (
    <div className="flex h-dvh min-h-0 bg-background text-foreground">
      <aside
        className={cn(
          "hidden h-full shrink-0 border-r border-border transition-[width] duration-200 md:block",
          sidebarOpen ? "w-64" : "w-0 overflow-hidden border-0",
        )}
      >
        <Sidebar />
      </aside>

      <Sheet open={mobileNav} onOpenChange={setMobileNav}>
        <SheetContent side="left" className="p-0">
          <Sidebar onNavigate={() => setMobileNav(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b border-border px-2 py-1.5 pt-safe md:px-3">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileNav(true)}
          >
            <Menu className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden md:inline-flex"
            aria-label="Toggle sidebar"
            onClick={() => setSidebar(!sidebarOpen)}
          >
            <Menu className="size-4" />
          </Button>
          <h1 className="min-w-0 flex-1 truncate text-sm font-medium">{title}</h1>
          <PresenceChip presence={presence} />
          <Button
            variant={power ? "secondary" : "ghost"}
            size="sm"
            className="hidden h-8 sm:inline-flex"
            onClick={() => setPower(!power)}
          >
            {power ? "Power" : "Simple"}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="hidden lg:inline-flex"
            aria-label="Toggle workspace"
            onClick={() => setRight(rightPanel === "closed" ? "artifact" : "closed")}
          >
            <PanelRight className="size-4" />
          </Button>
        </header>
        <main className="relative min-h-0 flex-1">
          <Outlet />
        </main>
        <MobileTabBar pathname={pathname} flags={flags} navigate={navigate} />
      </div>

      <div className={cn("hidden h-full lg:block", rightPanel === "closed" && "lg:hidden")}>
        <RightPanel />
      </div>
    </div>
  );
}

function MobileTabBar({
  pathname,
  flags,
  navigate,
}: {
  pathname: string;
  flags: ReturnType<typeof useSovi.getState>["flags"];
  navigate: ReturnType<typeof useNavigate>;
}) {
  const items = NAV_ITEMS.filter((n) => n.show(flags)).slice(0, 5);
  return (
    <nav className="flex border-t border-border pb-safe md:hidden">
      {items.map((item) => {
        const active = item.to === "/" ? pathname === "/" || pathname.startsWith("/c/") : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] text-muted-foreground",
              active && "text-foreground",
            )}
            onClick={() => void navigate({ to: item.to })}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
