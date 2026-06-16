import React from "react";
import { cn } from "../../lib/utils";
 
/**
 * Единая кнопка в стилистике сайта.
 * Градиент indigo → purple → pink совпадает с окном регистрации.
 *
 * variant:
 *   "primary"  — заливка градиентом (CTA)
 *   "outline"  — обводка градиентом, прозрачный фон
 *   "ghost"    — серая рамка, без градиента (для вторичных действий)
 *
 * size: "sm" | "md" | "lg"
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  as: As = "button",
  ...props
}) {
  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-2.5 text-sm",
    lg: "px-8 py-3 text-sm",
  };
 
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold " +
    "transition-all duration-300 ease-out focus:outline-none focus:ring-4 " +
    "focus:ring-indigo-300/50 disabled:opacity-60 disabled:cursor-not-allowed";
 
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white " +
      "shadow-md shadow-indigo-200/50 hover:shadow-lg hover:shadow-pink-300/50 " +
      "hover:scale-[1.03] hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 " +
      "active:scale-[0.99]",
 
    // Обводка градиентом реализована через двойной фон
    outline:
      "relative text-neutral-900 bg-white hover:text-transparent hover:bg-clip-text " +
      "hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 " +
      "border-2 border-transparent [background:linear-gradient(white,white)_padding-box," +
      "linear-gradient(90deg,#6366f1,#a855f7,#ec4899)_border-box] " +
      "hover:shadow-md hover:shadow-purple-200/40 hover:scale-[1.02] active:scale-[0.99]",
 
    ghost:
      "bg-white text-neutral-700 border border-neutral-200 " +
      "hover:border-neutral-400 hover:bg-neutral-50 active:scale-[0.99]",
  };
 
  return (
    <As
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </As>
  );
}