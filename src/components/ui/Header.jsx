import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { Button } from "./Button";
 
/**
 * Навигация:
 *  - Каталог            → якорь #catalog на главной
 *  - Как это работает   → отдельная страница /how-it-works
 *  - FAQ                → якорь #faq на главной
 */
export default function Header({ setShowAuth }) {
  const [language, setLanguage] = useState("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
 
  // Якоря работают только на главной. Если пользователь на /how-it-works,
  // сначала переходим на /, потом скроллим.
  const goToAnchor = (anchor) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + anchor);
      // Даём React Router перерендерить, потом скроллим
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
 
  const navItems = [
    { name: "Каталог", type: "anchor", target: "#catalog" },
    { name: "Как это работает", type: "route", target: "/how-it-works" },
    { name: "FAQ", type: "anchor", target: "#faq" },
  ];
 
  const renderNavItem = (item, mobile = false) => {
    const baseCls = mobile
      ? "text-base hover:text-indigo-600 transition-colors py-1"
      : "text-sm xl:text-base transition-colors cursor-pointer";
 
    if (item.type === "anchor") {
      return (
        <motion.a
          key={item.target}
          href={item.target}
          onClick={goToAnchor(item.target)}
          whileHover={mobile ? {} : { y: -2, color: "#6366f1" }}
          transition={{ duration: 0.25 }}
          className={baseCls}
        >
          {item.name}
        </motion.a>
      );
    }
    // Route
    const active = location.pathname === item.target;
    return (
      <motion.div
        key={item.target}
        whileHover={mobile ? {} : { y: -2 }}
        transition={{ duration: 0.25 }}
      >
        <Link
          to={item.target}
          onClick={() => setMenuOpen(false)}
          className={`${baseCls} ${active ? "text-indigo-600 font-semibold" : ""}`}
        >
          {item.name}
        </Link>
      </motion.div>
    );
  };
 
  return (
    <header className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-md shadow-sm z-50 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Brand + Nav */}
        <div className="flex items-center space-x-6 lg:space-x-10">
          <Logo size="md" />
 
          <nav className="hidden lg:flex items-center space-x-7 text-gray-800 font-medium">
            {navItems.map((item) => renderNavItem(item, false))}
          </nav>
        </div>
 
        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language */}
          <div className="hidden md:flex items-center gap-2 text-gray-700">
            <Globe className="w-5 h-5" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border-none focus:ring-0 cursor-pointer text-sm font-medium"
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
          </div>
 
          {/* CTA — Войти (единый градиент) */}
          <Button onClick={() => setShowAuth(true)} size="md" className="hidden sm:inline-flex">
            Войти
          </Button>
 
          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
 
      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white shadow-md border-t border-gray-200 px-4 sm:px-6 py-5"
          >
            <div className="flex flex-col space-y-3 text-gray-800 font-medium">
              {navItems.map((item) => renderNavItem(item, true))}
            </div>
 
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Globe className="w-5 h-5" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 cursor-pointer text-sm font-medium"
                >
                  <option value="ru">RU</option>
                  <option value="en">EN</option>
                </select>
              </div>
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  setShowAuth(true);
                }}
                className="w-full sm:w-auto"
              >
                Войти
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}