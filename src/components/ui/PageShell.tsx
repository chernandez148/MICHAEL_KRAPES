// src/components/ui/PageShell.tsx
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-outfit min-h-screen w-full text-white/80 flex flex-col relative overflow-x-hidden selection:bg-[#c8a96e]/30 selection:text-white"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, #121212 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent 0px, transparent 89px, rgba(255,255,255,0.012) 90px),
                            repeating-linear-gradient(90deg, transparent 0px, transparent 89px, rgba(255,255,255,0.012) 90px)`,
          animation: "ambientGrid 8s ease-in-out infinite",
        }}
      />

      <div
        className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-[#c8a96e]/20 via-transparent to-[#c8a96e]/5 z-0"
        aria-hidden="true"
      />

      {/* Content wrapper ensuring z-index stays above background elements */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}