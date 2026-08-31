import type { HTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

function CodeBlock({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  const text = String(children ?? "").replace(/\n$/, "");
  const isBlock = Boolean(className) || text.includes("\n");
  const [copied, setCopied] = useState(false);
  if (!isBlock) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
  const lang = /language-([\w-]+)/.exec(className ?? "")?.[1];
  return (
    <div className="group relative">
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        {lang ? <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{lang}</span> : null}
        <button
          type="button"
          className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
          onClick={async () => {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <pre>
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export function SoviMarkdown({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn("sovi-md", className)}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code: CodeBlock,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
