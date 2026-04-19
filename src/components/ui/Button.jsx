import React from "react";
import { cn } from "../../lib/utils";; // если нет этой функции — заменим ниже

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 text-white px-7 py-3 text-sm font-semibold shadow-md transition-all duration-500 ease-in-out hover:from-sky-500 hover:via-indigo-500 hover:to-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-indigo-300/40 focus:outline-none focus:ring-4 focus:ring-indigo-300/50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}