import React from "react";
import { cn } from "../../lib/utils";; // если нет этой функции — заменим ниже

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-400",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}