/** Deterministic SVG stand-ins so mock / failed media still renders as real objects. */

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function horizonImageDataUri(prompt: string): string {
  const h = hash(prompt);
  const hue = 190 + (h % 28);
  const hue2 = 28 + (h % 40);
  const title = prompt.replace(/[<>&]/g, "").slice(0, 64);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 768">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="hsl(${hue}, 28%, 14%)"/>
        <stop offset="55%" stop-color="hsl(${hue}, 32%, 18%)"/>
        <stop offset="100%" stop-color="hsl(${hue2}, 36%, 22%)"/>
      </linearGradient>
      <radialGradient id="sun" cx="50%" cy="58%" r="40%">
        <stop offset="0%" stop-color="hsl(38, 70%, 68%)" stop-opacity="0.95"/>
        <stop offset="45%" stop-color="hsl(${hue}, 50%, 50%)" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="hsl(${hue}, 30%, 12%)" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1024" height="768" fill="url(#sky)"/>
    <rect width="1024" height="768" fill="url(#sun)"/>
    <path d="M0 470 Q 256 ${430 + (h % 40)} 512 460 T 1024 480 L 1024 768 L 0 768 Z" fill="hsl(${hue}, 22%, 10%)"/>
    <path d="M0 510 Q 300 ${490 + (h % 20)} 640 520 T 1024 530 L 1024 768 L 0 768 Z" fill="hsl(${hue}, 18%, 8%)" opacity="0.85"/>
    <circle cx="512" cy="430" r="7" fill="hsl(38, 80%, 78%)"/>
    <text x="64" y="700" fill="hsl(200, 20%, 78%)" font-family="Georgia, serif" font-size="22">${escapeXml(title)}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function audioWaveDataUri(prompt: string): string {
  const title = escapeXml(prompt.slice(0, 48));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200">
    <rect width="640" height="200" rx="16" fill="#141a24"/>
    ${Array.from({ length: 48 }, (_, i) => {
      const h = 20 + ((hash(prompt + i) % 70) as number);
      return `<rect x="${20 + i * 12.5}" y="${100 - h / 2}" width="6" height="${h}" rx="3" fill="#3aa89a" opacity="${0.35 + (i % 5) * 0.1}"/>`;
    }).join("")}
    <text x="24" y="180" fill="#8b96a8" font-family="sans-serif" font-size="12">${title}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}
