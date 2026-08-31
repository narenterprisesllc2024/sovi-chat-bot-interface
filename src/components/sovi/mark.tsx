import { cn } from "@/lib/utils";
import { CREST_SRC, type MarkId } from "@/lib/sovi/identity";
import { useSovi } from "@/lib/sovi/store";

/** Horizon + rising point. Sovi's mark — not an orb, not a vendor logo. */
export function HorizonGlyph({
  className,
  size = 28,
  variant = "dawn",
}: {
  className?: string;
  size?: number;
  variant?: "horizon" | "dawn";
}) {
  const point = variant === "dawn" ? "var(--solar)" : "currentColor";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("text-horizon", className)}
    >
      <path
        d="M3 22 C11 16.2, 21 16.2, 29 22"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        className="sovi-presence-horizon origin-center"
      />
      <path
        d="M16 9.6 L18.15 14.2 L16 16.15 L13.85 14.2 Z"
        fill={point}
        className="sovi-presence-core"
      />
    </svg>
  );
}

export function SoviMark({
  className,
  size = 28,
  markId,
  customUrl,
}: {
  className?: string;
  size?: number;
  markId?: MarkId;
  customUrl?: string;
}) {
  const identity = useSovi((s) => s.identity);
  const id = markId ?? identity.markId;
  const custom = customUrl ?? identity.customUrl;
  const useImage = (id === "crest" || (id === "custom" && custom)) && size >= 36;
  if (useImage) {
    const src = id === "custom" && custom ? custom : CREST_SRC;
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className={cn("rounded-xl object-cover", className)}
      />
    );
  }
  return <HorizonGlyph className={className} size={size} variant={id === "horizon" ? "horizon" : "dawn"} />;
}

export function SoviWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <SoviMark size={22} />
      <span className="text-[15px] font-semibold tracking-tight">Sovi</span>
    </div>
  );
}
