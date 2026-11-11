import { useState } from "react";
import type { Analytics } from "../../services/admin";
import { money } from "./AdminLayout";

const BAR = "#b8893a"; // brand gold, stepped for chart legibility on the dark surface
const W = 800;
const H = 220;
const PAD = { top: 12, right: 8, bottom: 26, left: 52 };

function niceMax(v: number) {
  if (v <= 0) return 100000; // $1,000 in cents — an empty chart still gets a sensible axis
  const dollars = v / 100;
  const pow = 10 ** Math.floor(Math.log10(dollars));
  const step = [1, 2, 2.5, 5, 10].find((m) => m * pow >= dollars)! * pow;
  return step * 100;
}

function periodLabel(period: string, granularity: Analytics["granularity"], long = false) {
  const [y, m, d] = period.split("-").map(Number);
  const date = new Date(y, m - 1, d || 1);
  return granularity === "month"
    ? date.toLocaleDateString("en-US", { month: long ? "long" : "short", year: long ? "numeric" : "2-digit" })
    : date.toLocaleDateString("en-US", { month: "short", day: "numeric", ...(long ? { year: "numeric" } : {}) });
}

const axisMoney = (cents: number) => {
  const d = cents / 100;
  return d >= 10000 ? `$${Math.round(d / 1000)}K` : `$${d.toLocaleString("en-US")}`;
};

export default function RevenueChart({ data }: { data: Analytics }) {
  const [hover, setHover] = useState<number | null>(null);
  const series = data.series;

  if (!series.length) {
    return <p className="text-sm font-light text-white/40 m-0 py-16 text-center">No sales in this period yet.</p>;
  }

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const max = niceMax(Math.max(0, ...series.map((s) => s.revenue)));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const band = innerW / series.length;
  const barW = Math.max(2, Math.min(24, band - 2)); // 2px surface gap between adjacent bars
  const labelEvery = Math.ceil(series.length / 8);
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const active = hover != null ? series[hover] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto block"
        role="img"
        aria-label={`Revenue by ${data.granularity}, ${money(data.revenue)} total`}
        onMouseLeave={() => setHover(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            <text x={PAD.left - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={11} fill="rgba(255,255,255,0.4)">
              {axisMoney(t)}
            </text>
          </g>
        ))}
        {series.map((s, i) => {
          const cx = PAD.left + band * i + band / 2;
          const h = Math.max(0, y(0) - y(s.revenue));
          const r = Math.min(4, h, barW / 2);
          const x0 = cx - barW / 2;
          const top = y(0) - h;
          return (
            <g key={s.period}>
              {h > 0 && (
                <path
                  d={`M${x0},${y(0)} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + barW - r} Q${x0 + barW},${top} ${x0 + barW},${top + r} V${y(0)} Z`}
                  fill={BAR}
                  opacity={hover == null || hover === i ? 1 : 0.45}
                />
              )}
              {i % labelEvery === 0 && (
                <text x={cx} y={H - 8} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.4)">
                  {periodLabel(s.period, data.granularity)}
                </text>
              )}
              {/* Full-height hit target, wider than the bar */}
              <rect
                x={PAD.left + band * i}
                y={PAD.top}
                width={band}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />
            </g>
          );
        })}
        <line x1={PAD.left} x2={W - PAD.right} y1={y(0)} y2={y(0)} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
      </svg>

      {active && hover != null && (
        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 bg-[#1a1a1a] border border-white/15 px-3 py-2 text-xs whitespace-nowrap shadow-xl"
          style={{ left: `${((PAD.left + band * hover + band / 2) / W) * 100}%` }}
        >
          <div className="text-white/50">{periodLabel(active.period, data.granularity, true)}</div>
          <div className="text-white font-medium">{money(active.revenue)}</div>
          <div className="text-white/50">
            {active.orders} {active.orders === 1 ? "order" : "orders"}
          </div>
        </div>
      )}

      <table className="sr-only">
        <caption>Revenue by {data.granularity}</caption>
        <thead>
          <tr><th>Period</th><th>Revenue</th><th>Orders</th></tr>
        </thead>
        <tbody>
          {series.map((s) => (
            <tr key={s.period}>
              <td>{periodLabel(s.period, data.granularity, true)}</td>
              <td>{money(s.revenue)}</td>
              <td>{s.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
