"use client";

import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label?: string }) {
  const t = useTranslations("Contact");
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label ?? t("copy")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-(--border) text-(--muted) transition-colors hover:border-(--accent)/40 hover:text-(--fg)"
    >
      {copied ? <Check className="h-4 w-4 text-(--accent-2)" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">{copied ? t("copied") : t("copy")}</span>
    </button>
  );
}
