import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Archive,
  MoreHorizontal,
  Pin,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatRelativeTime } from "@/lib/utils";
import { useSovi } from "@/lib/sovi/store";
import { NAV_ITEMS } from "./nav";
import { SoviWordmark } from "./mark";
import { signOut } from "@/lib/auth/client";
import { useCurrentUser } from "@/lib/auth/use-current-user";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const flags = useSovi((s) => s.flags);
  const conversations = useSovi((s) => s.conversations);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const newConversation = useSovi((s) => s.newConversation);
  const [q, setQ] = useState("");

  const visibleNav = NAV_ITEMS.filter((n) => n.show(flags));
  const filtered = conversations
    .filter((c) => !c.archived)
    .filter((c) => !q || c.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt);

  return (
    <div className="flex h-full flex-col bg-card/60">
      <div className="flex items-center justify-between px-3 pt-safe py-3">
        <Link to="/" onClick={onNavigate} className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <SoviWordmark />
        </Link>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="New conversation"
          onClick={() => {
            const id = newConversation();
            onNavigate?.();
            void navigate({ to: "/c/$conversationId", params: { conversationId: id } });
          }}
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <nav className="flex flex-col gap-0.5 px-2 pb-2">
        {visibleNav.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                active && "bg-muted text-foreground",
              )}
            >
              <item.icon className="size-3.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search conversations"
            className="h-9 pl-8"
          />
        </div>
      </div>

      <div className="sovi-scroll min-h-0 flex-1 overflow-y-auto px-2 pb-4">
        {filtered.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-muted-foreground">No conversations yet</p>
        ) : (
          <ul className="space-y-0.5">
            {filtered.map((c) => {
              const active = pathname === `/c/${c.id}`;
              return (
                <li key={c.id}>
                  <div
                    className={cn(
                      "group flex items-center rounded-lg hover:bg-muted",
                      active && "bg-muted",
                    )}
                  >
                    <Link
                      to="/c/$conversationId"
                      params={{ conversationId: c.id }}
                      onClick={onNavigate}
                      className="min-w-0 flex-1 px-2.5 py-2"
                    >
                      <div className="flex min-w-0 items-center gap-1.5">
                        {c.pinned ? <Pin className="size-3 shrink-0 text-horizon" /> : null}
                        {c.favorite ? <Star className="size-3 shrink-0 text-solar" /> : null}
                        <span className="min-w-0 truncate text-sm">{c.title}</span>
                      </div>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {formatRelativeTime(c.updatedAt)}
                        {c.preview ? ` · ${c.preview}` : ""}
                      </span>
                    </Link>
                    <ConvMenu id={c.id} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="min-w-0 border-t border-border px-2 py-2">
        <AccountChip />
      </div>
    </div>
  );
}

function AccountChip() {
  const user = useCurrentUser();
  const [signingOut, setSigningOut] = useState(false);
  if (!user) return null;
  const label = user.displayName ?? user.primaryEmail ?? "Account";
  return (
    <div className="flex min-w-0 items-center gap-2 px-1 py-0.5">
      {user.profileImageUrl ? (
        <img src={user.profileImageUrl} alt="" className="size-8 shrink-0 rounded-full object-cover" />
      ) : (
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium">
          {label.charAt(0).toUpperCase()}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-tight">{label}</p>
        <button
          type="button"
          disabled={signingOut}
          onClick={() => {
            setSigningOut(true);
            void signOut().catch(() => setSigningOut(false));
          }}
          className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-60"
        >
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}

function ConvMenu({ id }: { id: string }) {
  const togglePin = useSovi((s) => s.togglePin);
  const toggleFavorite = useSovi((s) => s.toggleFavorite);
  const archive = useSovi((s) => s.archiveConversation);
  const del = useSovi((s) => s.deleteConversation);
  const rename = useSovi((s) => s.renameConversation);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
          aria-label="Conversation menu"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => togglePin(id)}>
          <Pin className="size-3.5" /> Pin
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleFavorite(id)}>
          <Star className="size-3.5" /> Favorite
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            const next = window.prompt("Rename conversation");
            if (next) rename(id, next);
          }}
        >
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => archive(id)}>
          <Archive className="size-3.5" /> Archive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => del(id)}>
          <Trash2 className="size-3.5" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
