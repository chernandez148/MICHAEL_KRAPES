import type { ReactNode } from "react";

export default function StatusMessage({ title, children, tone = "muted" }: { title: string; children?: ReactNode; tone?: "muted" | "error" }) {
  const box = tone === "error" ? "border-red-500/30 bg-red-950/20" : "border-white/10";
  return (
    <div className={`w-full border ${box} py-16 px-8 text-center`}>
      <h3 className="font-bebas text-2xl text-white/80 tracking-wider uppercase m-0">{title}</h3>
      {children && <div className="font-outfit text-xs font-light text-white/50 tracking-wide mt-3">{children}</div>}
    </div>
  );
}
