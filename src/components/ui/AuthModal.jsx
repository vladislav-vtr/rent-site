/*
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ show, onClose }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Dim background }
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal window }
          <motion.div
            className="fixed top-1/2 left-1/2 z-[100] w-[90%] max-w-md
                       -translate-x-1/2 -translate-y-1/2
                       bg-white rounded-3xl shadow-xl p-8"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.25 }}
          >
            {/* Logo }
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-indigo-600">BRAND</div>
              <p className="text-gray-500 text-sm mt-1">Войти или зарегистрироваться</p>
            </div>

            {/* Form }
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Имя</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 rounded-xl border 
                             focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Иван"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Фамилия</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 rounded-xl border 
                             focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Иванов"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Телефон</label>
                <input
                  type="tel"
                  className="w-full mt-1 px-3 py-2 rounded-xl border 
                             focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label className="text-sm font-medium">E-mail</label>
                <input
                  type="email"
                  className="w-full mt-1 px-3 py-2 rounded-xl border 
                             focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="example@mail.ru"
                />
              </div>

              {/* Submit }
              <button
                type="button"
                className="w-full py-3 mt-2 rounded-xl 
                           text-white font-semibold 
                           bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                           hover:opacity-90 transition"
              >
                Продолжить
              </button>
            </form>

            {/* Close }
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl"
            >
              ×
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
*/
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark background */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 relative"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.25 }}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo */}
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-indigo-600">BRAND</div>
                <p className="text-gray-500 text-sm mt-1">
                  Войти или зарегистрироваться
                </p>
              </div>

              {/* Form */}
              <form className="grid gap-4">
                <div className="grid gap-1 text-sm">
                  <label>Имя</label>
                  <input
                    type="text"
                    className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="Иван"
                  />
                </div>

                <div className="grid gap-1 text-sm">
                  <label>Фамилия</label>
                  <input
                    type="text"
                    className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="Иванов"
                  />
                </div>

                <div className="grid gap-1 text-sm">
                  <label>Телефон</label>
                  <input
                    type="tel"
                    className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div className="grid gap-1 text-sm">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="example@mail.ru"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                             text-white px-5 py-2.5 text-sm font-semibold shadow-md 
                             hover:opacity-90 transition-all"
                >
                  Продолжить
                </button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}