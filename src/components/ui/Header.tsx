interface HeaderProps {
  breadcrumbs: string;
  title: string;
}

function Header({ breadcrumbs, title }: HeaderProps) {
  return (
    <div
      className="relative pb-8 animate-reveal"
      style={{ animationDelay: "0.1s" }}
    >
      {/* SECTION: Header Titles */}
      <div className="flex items-center gap-3 mb-3">
        <span className="w-1 h-1 rounded-full bg-[#c8a96e]" />
        <span className="text-[10px] tracking-[0.3em] text-[#c8a96e] font-medium uppercase block">
          {breadcrumbs}
        </span>
      </div>
      <h1 className="font-bebas text-[clamp(48px,8vw,110px)] leading-[0.85] text-white select-none uppercase m-0 tracking-[0.01em]">
        {title}
      </h1>
      <div
        className="absolute bottom-0 left-0 h-[1px] bg-white/10 w-full origin-left"
        style={{
          animation: "borderExpand 1.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      />
    </div>
  );
}

export default Header;
