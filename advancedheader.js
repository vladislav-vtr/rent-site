import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [language, setLanguage] = useState("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollToForm, setScrollToForm] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-md shadow-sm z-50 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Brand */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-blue-700">
            BRAND
          </div>

          {/* Navigation (hidden on small screens) */}
          <nav className="hidden lg:flex space-x-6 text-gray-800 font-medium">
            {[
              { name: "О нас", id: "#about" },
              { name: "Каталог", id: "#catalog" },
              { name: "Условия аренды", id: "#terms" },
              { name: "Часто задаваемые вопросы", id: "#faq" },
              { name: "Сотрудничество", id: "#partners" }
            ].map((item) => (
              <motion.a
                key={item.id}
                href={item.id}
                whileHover={{ y: -2, color: "#0284c7" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="transition-colors text-sm xl:text-base"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Language Selector */}
          <div className="hidden md:flex items-center space-x-2 text-gray-700">
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

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <button
              onClick={() => setScrollToForm(true)}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-7 py-3 text-sm font-semibold shadow-md transition-all duration-300 hover:from-pink-600 hover:to-red-600 hover:scale-105 hover:shadow-lg hover:shadow-pink-400/40 focus:outline-none focus:ring-4 focus:ring-pink-300/50"
            >
              Сделать заказ
            </button>
          </motion.div>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white shadow-md border-t border-gray-200 px-4 sm:px-6 py-4"
          >
            <div className="flex flex-col space-y-4 text-gray-800 font-medium">
              {[
                { name: "О нас", id: "#about" },
                { name: "Каталог", id: "#catalog" },
                { name: "Условия аренды", id: "#terms" },
                { name: "Часто задаваемые вопросы", id: "#faq" },
                { name: "Сотрудничество", id: "#partners" }
              ].map((item) => (
                <a
                  key={item.id}
                  href={item.id}
                  className="hover:text-blue-600 transition-colors text-base sm:text-lg"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-2 text-gray-700">
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

              <button
                onClick={() => setScrollToForm(true)}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-7 py-3 text-sm font-semibold shadow-md transition-all duration-300 hover:from-pink-600 hover:to-red-600 hover:scale-105 hover:shadow-lg hover:shadow-pink-400/40 focus:outline-none focus:ring-4 focus:ring-pink-300/50 w-full sm:w-auto"
              >
                Сделать заказ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

