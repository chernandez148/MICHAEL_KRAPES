import { Link } from "react-router-dom";
import Header from "../components/ui/Header";

export default function NotFound() {
  return (
    <>
      <Header breadcrumbs="404" title="PAGE NOT FOUND" />
      <div className="flex flex-col gap-6 animate-reveal">
        <p className="font-light text-[15px] text-white/60 m-0">The page you're looking for doesn't exist or has moved.</p>
        <Link
          to="/"
          className="self-start px-10 py-3.5 bg-[#c8a96e] text-[#0a0a0a] text-xs tracking-[0.25em] uppercase no-underline hover:bg-[#d4b87a] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
