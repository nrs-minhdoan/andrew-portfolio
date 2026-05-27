"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  labels: { projects: string; contact: string };
}

export function HeroCTAs({ labels }: Props) {
  const goto = (id: string) => () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        intent="primary"
        onPress={goto("projects")}
        aria-label={labels.projects}
        iconAfter={<ArrowRight size={16} />}
      >
        {labels.projects}
      </Button>
      <Button intent="outline" onPress={goto("contact")} aria-label={labels.contact}>
        {labels.contact}
      </Button>
    </div>
  );
}
