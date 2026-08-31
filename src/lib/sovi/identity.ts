export type MarkId = "horizon" | "dawn" | "crest" | "custom";

export type Identity = {
  markId: MarkId;
  customUrl?: string;
};

export const DEFAULT_IDENTITY: Identity = { markId: "dawn" };

export const MARK_OPTIONS: Array<{
  id: MarkId;
  name: string;
  detail: string;
}> = [
  { id: "dawn", name: "Dawn", detail: "Horizon + rising amber point. Default chrome." },
  { id: "horizon", name: "Horizon", detail: "Single-color cyan mark for quieter chrome." },
  { id: "crest", name: "Crest", detail: "Sculptural emblem — the rendered Sovi mark." },
  { id: "custom", name: "Your mark", detail: "Upload an image. SVG, PNG, or JPEG, square." },
];

export const CREST_SRC = "/brand/sovi-crest.jpg";
export const CREST_SOFT_SRC = "/brand/sovi-crest-soft.jpg";
export const MARK_SVG_SRC = "/brand/sovi-mark.svg";
