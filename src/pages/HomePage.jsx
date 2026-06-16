import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Check,
  Gamepad2,
  Headset,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/Button";
 
export default function HomePage() {
  const [activeTab, setActiveTab] = useState("consoles");
  const [term, setTerm] = useState("day");
  const [query, setQuery] = useState("");
  const [scrollToForm, setScrollToForm] = useState(0);
 
  // Быстрое модальное окно аренды (кнопка "Арендовать" в карточке)
  const [rentalModal, setRentalModal] = useState({ open: false, product: null, term: "day" });
 
  const catalog = useMemo(
    () => ({
      consoles: [
        {
          id: "ps5",
          title: "Sony PlayStation 5 Slim",
          tagline: "4K, HDR, быстрые загрузки",
          prices: { day: 2500, week: 7000, month: 16000 },
          perks: ["Два геймпада", "Популярные тайтлы", "Возможна аренда без залога"],
          image: "/ps5.jpg",
          hero: true,
        },
        {
          id: "xbox-series-x",
          title: "Xbox Series X",
          tagline: "До 120 FPS, HDR, 4K/8K",
          prices: { day: 4500, week: 10000, month: 25000 },
          perks: ["Геймпасс по запросу", "Доставка в день заказа", "Самовывоз"],
          image: "/xbox.jpg",
        },
        {
          id: "ps5-pro",
          title: "Sony PlayStation 5 Pro",
          tagline: "HDR, Full HD/4K чекерборд",
          prices: { day: 1500, week: 4500, month: 12000 },
          perks: ["Отлично для вечеринок", "Готовые сборки игр"],
          image: "/ps5-pro.jpg",
        },
      ],
      accessories: [
        {
          id: "psvr",
          title: "Sony PlayStation VR (PS4/PS5)",
          tagline: "Погружение в VR за минуту",
          prices: { day: 1500, week: 5000, month: 12000 },
          perks: ["Контроллеры по запросу", "Инструктаж"],
          image: "/psvr.jpg",
        },
      ],
    }),
    []
  );
 
  const items = useMemo(() => {
    const list = catalog[activeTab];
    return list.filter(
      (x) =>
        x.title.toLowerCase().includes(query.toLowerCase()) ||
        x.tagline.toLowerCase().includes(query.toLowerCase())
    );
  }, [catalog, activeTab, query]);
 
  const scrollToOrder = () => {
    const section = document.getElementById("order");
    if (!section) return;
    const yOffset = -140;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
 
  const handleRent = (product) => {
    setRentalModal({ open: true, product, term });
  };
 
  // При загрузке с якорем (#catalog / #faq) — скроллим
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash;
      setTimeout(() => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, []);
 
  return (
    <>
      <RentalModal
        isOpen={rentalModal.open}
        product={rentalModal.product}
        term={rentalModal.term}
        onClose={() => setRentalModal({ open: false, product: null, term: "day" })}
      />
 
      {/* Hero */}
      <section id="hero" className="pt-24">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <AnimatedTitle />
            <p className="mt-4 text-neutral-600 text-lg">
              Привезём, подключим, покажем — остаётся только играть
            </p>
 
            <div className="mt-6 flex flex-wrap gap-3">
              <Button as="a" href="#catalog" variant="outline" size="md">
                📦 Открыть каталог
              </Button>
              <Button onClick={scrollToOrder} variant="primary" size="md">
                Сделать заказ
                <ArrowRight size={15} />
              </Button>
            </div>
 
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-neutral-700">
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-black" /> Доставка от 300 ₽</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-black" /> Самовывоз по договорённости</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-black" /> Под любой запрос: вечеринки, ивенты, дома</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-black" /> Поддержка в мессенджерах</li>
            </ul>
          </div>
 
          <div className="relative">
            <HeroSlideshow />
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white shadow p-3 text-xs border">
              Оплатите после проверки комплекта — так спокойнее ✨
            </div>
          </div>
        </div>
      </section>
 
      {/* Benefits */}
      <section id="benefits" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold tracking-tight">Почему с нами удобно</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Оплата после проверки", d: "Платите, когда убедились, что всё ок и комплект полный." },
            { t: "Быстрая доставка", d: "Привезём в день заказа либо к удобному окну." },
            { t: "Без залога", d: "Возможна аренда без депозита — уточняйте у менеджера." },
            { t: "Поддержка", d: "Онлайн‑помощь в Telegram/WhatsApp, инструктаж при подключении." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border p-4 bg-white shadow-sm">
              <div className="font-semibold">{b.t}</div>
              <div className="text-sm text-neutral-600 mt-1">{b.d}</div>
            </div>
          ))}
        </div>
      </section>
 
      {/* Catalog */}
      <section id="catalog" className="bg-neutral-50 border-y scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Каталог аренды</h2>
              <p className="text-sm text-neutral-500 mt-1">Выберите категорию, срок и найдите нужный комплект</p>
            </div>
 
            {/* Категории */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab("consoles")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                  activeTab === "consoles"
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <Gamepad2 size={16} />
                Игровые приставки
              </button>
              <button
                onClick={() => setActiveTab("accessories")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                  activeTab === "accessories"
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                    : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <Headset size={16} />
                VR-шлемы
              </button>
 
              <div className="ml-auto">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск..."
                  className="w-full sm:w-64 rounded-full border border-neutral-200 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                />
              </div>
            </div>
 
            {/* Пакеты */}
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "day", label: "Пакет Выходные" },
                { key: "week", label: "Пакет Супер" },
                { key: "month", label: "Пакет Мега" },
              ].map((o) => (
                <button
                  key={o.key}
                  onClick={() => setTerm(o.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    term === o.key
                      ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-sm shadow-indigo-200"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
 
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} term={term} onRent={handleRent} />
            ))}
            {items.length === 0 && (
              <div className="col-span-full text-center py-16 text-neutral-400">
                Ничего не найдено по запросу «{query}»
              </div>
            )}
          </div>
        </div>
      </section>
 
      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-10 scroll-mt-24">
        <h2 className="text-2xl font-bold tracking-tight">Частые вопросы</h2>
        <div className="mt-6 grid gap-3">
          {[
            { q: "Нужен ли залог?", a: "Возможна аренда без залога — условия зависят от комплекта и срока. Уточняйте при оформлении." },
            { q: "Как происходит оплата?", a: "Оплата после проверки комплекта — когда убедитесь, что всё работает и соответствует заказу." },
            { q: "Доставляете сегодня?", a: "Часто можем привезти в день заказа. На странице заказа выберите удобное окно доставки." },
            { q: "Можно ли продлить аренду?", a: "Да, без штрафов. Напишите менеджеру заранее, чтобы сохранить текущую ставку." },
          ].map((f) => (
            <details key={f.q} className="rounded-2xl border bg-white p-4">
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <div className="text-sm text-neutral-600 mt-2">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
 
      {/* Order */}
      <section id="order" className="bg-neutral-50 border-t scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Оформить заказ</h2>
            <p className="text-sm text-neutral-600 mt-2">
              Укажите контакты — менеджер свяжется с вами в течение 15 минут, подтвердит наличие и доставку
            </p>
            <OrderForm scrollTo={scrollToForm} />
          </div>
          <div className="rounded-3xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Как это работает</h3>
            <ol className="mt-3 space-y-2 text-sm text-neutral-700 list-decimal list-inside">
              <li>Выбираете комплект в каталоге и оставляете заявку.</li>
              <li>Мы подтверждаем время и адрес доставки.</li>
              <li>Привозим, подключаем, проводим краткий инструктаж.</li>
              <li>Оплата после проверки, без скрытых платежей.</li>
            </ol>
            <div className="mt-4 flex">
              <Button as={Link} to="/how-it-works" variant="outline" size="sm">
                Подробнее о процессе
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </section>
 
      {/* Contacts */}
      <section id="contacts" className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight">Контакты</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Телефон</div>
              <a href="tel:+79000000000" className="text-neutral-700 hover:underline">+7 (900) 000‑00‑00</a>
            </div>
            <div>
              <div className="font-medium">Мессенджеры</div>
              <div className="flex gap-3 mt-1">
                <a href="#" className="underline">Telegram</a>
                <a href="#" className="underline">WhatsApp</a>
              </div>
            </div>
            <div>
              <div className="font-medium">Адрес</div>
              <div className="text-neutral-700">г. Ваш город, ул. Примерная, 1</div>
            </div>
            <div>
              <div className="font-medium">График</div>
              <div className="text-neutral-700">Ежедневно 10:00–22:00</div>
            </div>
          </div>
        </div>
        <footer className="text-xs text-neutral-500 mt-6 pb-10">
          © {new Date().getFullYear()} VRENT. Аренда техники с доставкой.
        </footer>
      </section>
    </>
  );
}
 
/* =============== RENTAL MODAL =============== */
function RentalModal({ isOpen, product, term, onClose }) {
  const [form, setForm] = useState({ name: "", surname: "", phone: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
 
  useEffect(() => {
    if (isOpen) {
      setForm({ name: "", surname: "", phone: "" });
      setSent(false);
      setError("");
    }
  }, [isOpen]);
 
  if (!isOpen || !product) return null;
 
  const price = product.prices?.[term] ?? product.prices?.month ?? 0;
  const termLabel = term === "day" ? "Пакет Выходные" : term === "week" ? "Пакет Супер" : "Пакет Мега";
  const termShort = term === "day" ? "/ сутки" : term === "week" ? "/ неделя" : "/ месяц";
 
  const formatPhone = (raw) => {
    const d = raw.replace(/\D/g, "").replace(/^7/, "");
    let s = "+7";
    if (d.length > 0) s += " (" + d.slice(0, 3);
    if (d.length >= 4) s += ") " + d.slice(3, 6);
    if (d.length >= 7) s += "-" + d.slice(6, 8);
    if (d.length >= 9) s += "-" + d.slice(8, 10);
    return s;
  };
 
  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Заполните имя и телефон");
      return;
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7) {
      setError("Введите корректный номер телефона");
      return;
    }
 
    setSending(true);
    setError("");
 
    const orderData = {
      name: form.name,
      surname: form.surname,
      phone: form.phone,
      package: termLabel,
      product: product.title,
      orderSource: "Сайт (быстрый заказ)",
      tg_id: "583073638",
    };
 
    try {
      const resN8N = await fetch("https://n8n.hive-dev.ru/webhook/ps5-order-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
 
      try {
        fetch("http://localhost:4000/api/log-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }).catch(() => {});
      } catch (_) {}
 
      if (!resN8N.ok) throw new Error("Ошибка при отправке заказа");
      setSent(true);
    } catch (err) {
      console.error("Ошибка при отправке формы:", err);
      setError("Не удалось отправить заказ. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };
 
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="text-xs font-medium uppercase tracking-wider opacity-80">Быстрый заказ</div>
                <div className="text-lg font-bold mt-1">{product.title}</div>
              </div>
 
              <div className="p-6">
                {sent ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Check size={28} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900">Заявка отправлена!</h3>
                    <p className="text-sm text-neutral-500 mt-2">
                      Менеджер свяжется с вами в течение 15 минут для подтверждения заказа.
                    </p>
                    <div className="mt-6">
                      <Button onClick={onClose} size="md">Закрыть</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 mb-5">
                      <div className="w-20 h-20 rounded-xl bg-white border flex-shrink-0 overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.title} className="w-full h-full object-contain p-2" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-300">
                            <Gamepad2 size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-indigo-600 font-semibold">{termLabel}</div>
                        <div className="font-semibold text-neutral-900 truncate">{product.title}</div>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-xl font-bold text-neutral-900">{price.toLocaleString()} ₽</span>
                          <span className="text-xs text-neutral-400">{termShort}</span>
                        </div>
                      </div>
                    </div>
 
                    <div className="grid gap-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <label className="grid gap-1.5 text-sm">
                          <span className="font-medium text-neutral-700">Имя <span className="text-red-400">*</span></span>
                          <input
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all"
                            placeholder="Иван"
                          />
                        </label>
                        <label className="grid gap-1.5 text-sm">
                          <span className="font-medium text-neutral-700">Фамилия</span>
                          <input
                            value={form.surname}
                            onChange={(e) => setForm({ ...form, surname: e.target.value })}
                            className="rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all"
                            placeholder="Иванов"
                          />
                        </label>
                      </div>
                      <label className="grid gap-1.5 text-sm">
                        <span className="font-medium text-neutral-700">Телефон <span className="text-red-400">*</span></span>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                          placeholder="+7 (___) ___-__-__"
                          className="rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all"
                        />
                      </label>
                    </div>
 
                    {error && (
                      <div className="mt-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs px-3.5 py-2.5">
                        {error}
                      </div>
                    )}
 
                    <Button
                      onClick={handleSubmit}
                      disabled={sending}
                      size="md"
                      className="mt-5 w-full"
                    >
                      {sending ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          Отправить заявку
                        </>
                      )}
                    </Button>
 
                    <p className="text-[11px] text-neutral-400 text-center mt-3">
                      Менеджер перезвонит в течение 15 минут для подтверждения
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
 
/* =============== PRODUCT CARD =============== */
function ProductCard({ product, term, onRent }) {
  const price = product.prices?.[term] ?? product.prices?.month ?? 0;
  const termShort = term === "day" ? "/ сутки" : term === "week" ? "/ неделя" : "/ месяц";
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="group relative rounded-2xl bg-white border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-neutral-200 transition-all duration-300"
    >
      {product.hero && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[10px] uppercase tracking-widest font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full px-3 py-1 shadow-sm">
            Хит
          </span>
        </div>
      )}
 
      <div className="aspect-[4/3] bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300">
            <Gamepad2 size={48} strokeWidth={1} />
          </div>
        )}
      </div>
 
      <div className="p-5">
        <h3 className="font-bold text-neutral-900 leading-tight">{product.title}</h3>
        <p className="text-sm text-neutral-500 mt-1">{product.tagline}</p>
 
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-neutral-900">{price.toLocaleString()} ₽</span>
          <span className="text-sm text-neutral-400">{termShort}</span>
        </div>
 
        <ul className="mt-3 space-y-1.5">
          {product.perks?.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-neutral-600">
              <Check size={13} className="text-green-500 flex-shrink-0" />
              {p}
            </li>
          ))}
        </ul>
 
        <div className="mt-5 flex gap-2">
          <Button onClick={() => onRent(product)} size="sm" className="flex-1">
            <ShoppingCart size={14} />
            Арендовать
          </Button>
          <button className="px-4 py-2 text-sm font-medium rounded-2xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 transition-all">
            Подробнее
          </button>
        </div>
      </div>
    </motion.div>
  );
}
 
/* =============== ANIMATED TITLE =============== */
function AnimatedTitle() {
  const items = ["PS5", "Xbox", "VR очков"];
  const [index, setIndex] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
      Аренда{" "}
      <span className="relative inline-flex items-baseline justify-start w-[7ch] h-[1em] align-baseline">
        <AnimatePresence mode="wait">
          <motion.span
            key={items[index]}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            {items[index]}
          </motion.span>
        </AnimatePresence>
      </span>{" "}
      и аксессуаров с доставкой по городу
    </h1>
  );
}
 
/* =============== ORDER FORM =============== */
function OrderForm({ scrollTo }) {
  const [form, setForm] = useState({ name: "", surname: "", phone: "", package: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);
 
  useEffect(() => {
    if (scrollTo && formRef.current) {
      const yOffset = -200;
      const y = formRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [scrollTo]);
 
  const formatPhone = (raw) => {
    let value = raw.replace(/\D/g, "");
    if (value.startsWith("7")) value = value.slice(1);
    let formatted = "+7";
    if (value.length > 0) formatted += " (" + value.substring(0, 3);
    if (value.length >= 4) formatted += ") " + value.substring(3, 6);
    if (value.length >= 7) formatted += "-" + value.substring(6, 8);
    if (value.length >= 9) formatted += "-" + value.substring(8, 10);
    return formatted;
  };
 
  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
 
    const orderData = {
      name: form.name,
      surname: form.surname,
      phone: form.phone,
      package: form.package,
      product: "PS5",
      orderSource: "Сайт",
      tg_id: "583073638",
    };
 
    try {
      const resN8N = await fetch("https://n8n.hive-dev.ru/webhook/ps5-order-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
 
      try {
        fetch("http://localhost:4000/api/log-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }).catch(() => {});
      } catch (_) {}
 
      if (!resN8N.ok) throw new Error("Ошибка при отправке заказа");
      setSent(true);
    } catch (err) {
      console.error("Ошибка при отправке формы:", err);
      setError("Произошла ошибка при отправке формы. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };
 
  if (sent) {
    return (
      <div ref={formRef} className="mt-4 rounded-2xl border bg-white p-4 text-sm scroll-mt-8">
        Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения заказа.
      </div>
    );
  }
 
  return (
    <div ref={formRef} className="mt-4 scroll-mt-8">
      <form onSubmit={onSubmit} className="grid gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="grid gap-1 text-sm">
            <span>Имя</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              placeholder="Иван"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span>Фамилия</span>
            <input
              required
              value={form.surname}
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
              className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              placeholder="Иванов"
            />
          </label>
        </div>
 
        <label className="grid gap-1 text-sm">
          <span>Телефон</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
            placeholder="+7 (___) ___-__-__"
            className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
          />
        </label>
 
        <label className="grid gap-1 text-sm">
          <span>Пакет</span>
          <select
            required
            value={form.package}
            onChange={(e) => setForm({ ...form, package: e.target.value })}
            className="rounded-2xl border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
          >
            <option value="">Выберите пакет</option>
            <option value="weekend">Пакет "Выходные"</option>
            <option value="super">Пакет "Супер"</option>
            <option value="mega">Пакет "Мега"</option>
            <option value="hyper">Пакет "Гипер"</option>
          </select>
        </label>
 
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs px-3 py-2.5">
            {error}
          </div>
        )}
 
        <Button type="submit" disabled={sending} size="md" className="mt-2">
          {sending ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Отправить заявку"
          )}
        </Button>
      </form>
 
      <div className="mt-8 rounded-2xl border bg-white p-4">
        <h3 className="text-lg font-semibold mb-2">Что требуется для аренды 🔒</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Возраст от 18 лет</li>
          <li>Паспорт гражданина РФ</li>
          <li>Подписание договора аренды</li>
          <li>Согласие на обработку персональных данных</li>
        </ul>
      </div>
    </div>
  );
}
 
/* =============== HERO SLIDESHOW =============== */
function HeroSlideshow() {
  const images = ["/check-kit.png", "/The-Witcher-3.jpg", "/EA-FC-Is-Just-FIFA-Culture.jpg"];
  const [index, setIndex] = useState(0);
 
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
 
  return (
    <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-inner">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}