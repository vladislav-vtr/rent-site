import React from "react";
import { Link } from "react-router-dom";
 
/**
 * Логотип VRENT — монограмма "VR" в квадрате с градиентом + wordmark
 * 
 * @param {string} size  — "sm" | "md" | "lg"
 * @param {boolean} asLink — если true, оборачивает в Link на "/"
 */
export default function Logo({ size = "md", asLink = true }) {
  const sizes = {
    sm: { box: 28, radius: 7, font: 13, text: "text-base" },
    md: { box: 36, radius: 9, font: 16, text: "text-xl" },
    lg: { box: 48, radius: 12, font: 22, text: "text-2xl" },
  };
  const s = sizes[size] || sizes.md;
 
  const content = (
    <div className="inline-flex items-center gap-2.5 select-none group">
      {/* Монограмма VR */}
      <div
        className="relative flex items-center justify-center font-extrabold text-white shadow-md shadow-indigo-200/40 transition-transform duration-300 group-hover:scale-105"
        style={{
          width: s.box,
          height: s.box,
          borderRadius: s.radius,
          background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
          fontSize: s.font,
          letterSpacing: "-0.02em",
        }}
      >
        <span className="relative z-10 tracking-tighter">VR</span>
        {/* Блик */}
        <span
          className="absolute inset-0 rounded-[inherit] opacity-40"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)",
          }}
        />
      </div>
      {/* Wordmark */}
      <span
        className={`${s.text} font-extrabold tracking-tight text-neutral-900 leading-none`}
        style={{ letterSpacing: "-0.03em" }}
      >
        vrent
      </span>
    </div>
  );
 
  if (asLink) {
    return (
      <Link to="/" aria-label="VRENT — главная" className="inline-flex">
        {content}
      </Link>
    );
  }
  return content;
}