import { useState, type FormEvent } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CREST_SRC } from "@/lib/sovi/identity";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!isPending && user) return <Navigate to="/" />;

  const submitEmail = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: email.split("@")[0] || "Sovi",
        });
        if (err) {
          setError(err.message ?? "Could not create the account");
          return;
        }
      } else {
        const { error: err } = await authClient.signIn.email({ email, password });
        if (err) {
          setError(err.message ?? "Could not sign in");
          return;
        }
      }
      await navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 bottom-[22%] h-px bg-gradient-to-r from-transparent via-horizon/45 to-transparent" />
        <div className="absolute left-1/2 bottom-[14%] h-32 w-[28rem] -translate-x-1/2 rounded-full bg-horizon/12 blur-3xl" />
      </div>
      <div className="relative w-full max-w-sm space-y-6">
        <header className="space-y-3 text-center">
          <img
            src={CREST_SRC}
            alt="Sovi"
            className="mx-auto size-28 rounded-[1.75rem] object-cover shadow-[var(--shadow-elevated)]"
          />
          <h1 className="text-3xl font-semibold tracking-tight">Sovi</h1>
          <p className="text-sm text-muted-foreground">Your personal AI operating system.</p>
        </header>

        {!authEnabled ? (
          <p className="text-center text-sm text-muted-foreground">Sign-in is disabled.</p>
        ) : (
          <>
            <div className="space-y-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="secondary"
                  className="h-11 w-full"
                  onClick={() => void signIn(p.providerId, { callbackURL: "/" })}
                >
                  Continue with {p.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or email
              <span className="h-px flex-1 bg-border" />
            </div>

            <form className="space-y-3" onSubmit={(e) => void submitEmail(e)}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button type="submit" className="h-11 w-full" disabled={busy}>
                {busy ? "Working…" : mode === "up" ? "Create account" : "Sign in"}
              </Button>
            </form>
            <button
              type="button"
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setMode((m) => (m === "in" ? "up" : "in"))}
            >
              {mode === "in" ? "Need an account? Create one" : "Already have an account? Sign in"}
            </button>
            <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
              Sovi is personal. Sign in so only you can spend the gateway — not anyone with the link.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
