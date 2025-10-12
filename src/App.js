import React, { useMemo, useState, useEffect, useRef } from "react";


// — Tailwind для стилей (включён в Canvas)
// — Никаких внешних API, чистый React
// — Лёгкая замена бренда/цветов/товаров внизу в catalog
// — Готовые блоки: хедер, герой, преимущества, каталог с фильтрами, FAQ, контакты/заказ

export default function App() {
  const [activeTab, setActiveTab] = useState("consoles");
  const [term, setTerm] = useState("day");
  const [query, setQuery] = useState("");
  const [scrollToForm, setScrollToForm] = useState(false);

  const catalog = useMemo(
    () => ({
      consoles: [
        {
          id: "ps5",
          title: "Sony PlayStation 5 Slim",
          tagline: "4K, HDR, быстрые  загрузки",
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
          id: "ps4-pro",
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
          image: "/images/psvr.jpg",
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

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-2xl bg-black text-white grid place-items-center font-bold">VR</div>
            <div className="font-semibold tracking-tight">V-RENT</div>
          </div>
          <nav className="ml-auto hidden md:flex items-center gap-6 text-sm">
            <a href="#catalog" className="hover:text-black/70">Каталог</a>
            <a href="#benefits" className="hover:text-black/70">Почему мы</a>
            <a href="#faq" className="hover:text-black/70">FAQ</a>
            <a href="#order" className="hover:text-black/70">Заказ</a>
            <a href="#contacts" className="hover:text-black/70">Контакты</a>
          </nav>


          <button
            onClick={() => {
              setScrollToForm(true);
              setTimeout(() => setScrollToForm(false), 1000); // сбрасываем флаг через 1 секунду
            }}
            className="ml-auto md:ml-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 text-sm font-semibold shadow-md hover:opacity-90 transition-transform hover:scale-[1.03]"
          >
            🚀 Арендовать
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-neutral-50 border-b">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Аренда PS5/Xbox и аксессуаров с доставкой по городу</h1>
            <p className="mt-4 text-neutral-600"> Привезём, подключим, покажем — остаётся только играть</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#order" className="inline-flex rounded-2xl bg-black text-white px-5 py-3 text-sm font-medium shadow hover:bg-black/90">Сделать заказ</a>
              <a href="#catalog" className="inline-flex rounded-2xl border px-5 py-3 text-sm font-medium hover:bg-neutral-100">Открыть каталог</a>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-neutral-700">
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-black" /> Доставка от 300 ₽</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-black" /> Самовывоз по договорённости</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-black" /> Под любой запрос: вечеринки, ивенты, дома</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-black" /> Поддержка в мессенджерах</li>
            </ul>
          </div>
          <div className="relative">
            {/* “Экран” */}
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-neutral-200 to-neutral-100 shadow-inner flex items-center justify-center">
              <img
                src="/check-kit.png"
                alt="Проверка комплекта"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Подпись под окном */}
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
      <section id="catalog" className="bg-neutral-50 border-y">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Каталог аренды</h2>
              <p className="text-sm text-neutral-600">Выберите категорию, срок и найдите нужный комплект.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "day", label: " Пакет Выходные" },
                { key: "week", label: " Пакет Супер" },
                { key: "month", label: " Пакет Мега" },
                { key: "month+", label: " Пакет Гипер" },
              ].map((o) => (
                <button
                  key={o.key}
                  onClick={() => setTerm(o.key)}
                  className={`px-4 py-2 rounded-2xl border text-sm ${term === o.key ? "bg-black text-white" : "bg-white hover:bg-neutral-100"
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {[
              { key: "consoles", label: "Игровые приставки" },
              { key: "accessories", label: "VR-шлемы" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 rounded-2xl text-sm border ${activeTab === t.key ? "bg-black text-white" : "bg-white hover:bg-neutral-100"}`}
              >
                {t.label}
              </button>
            ))}
            <div className="ml-auto relative flex-1 sm:flex-none">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по каталогу"
                className="w-full sm:w-80 rounded-2xl border px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
              />
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} term={term} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold tracking-tight">Частые вопросы</h2>
        <div className="mt-6 grid gap-3">
          {[
            {
              q: "Нужен ли залог?",
              a: "Возможна аренда без залога — условия зависят от комплекта и срока. Уточняйте при оформлении.",
            },
            {
              q: "Как происходит оплата?",
              a: "Оплата после проверки комплекта — когда убедитесь, что всё работает и соответствует заказу.",
            },
            {
              q: "Доставляете сегодня?",
              a: "Часто можем привезти в день заказа. На странице заказа выберите удобное окно доставки.",
            },
            {
              q: "Можно ли продлить аренду?",
              a: "Да, без штрафов. Напишите менеджеру заранее, чтобы сохранить текущую ставку.",
            },
          ].map((f) => (
            <details key={f.q} className="rounded-2xl border bg-white p-4">
              <summary className="font-medium cursor-pointer">{f.q}</summary>
              <div className="text-sm text-neutral-600 mt-2">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Order */}
      <section id="order" className="bg-neutral-50 border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Оформить заказ</h2>
            <p className="text-sm text-neutral-600 mt-2">Укажите контакты — менеджер свяжется с вами в течение 15 минут, подтвердит наличие и дотавку </p>
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
            <div className="mt-4 rounded-2xl bg-neutral-50 border p-3 text-xs">* Здесь можно подключить оплату картой/QR и оформление договора.</div>
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
        <footer className="text-xs text-neutral-500 mt-6 pb-10">© {new Date().getFullYear()} V-RENT. Аренда техники с доставкой.</footer>
      </section>
    </div>
  );
}

function ProductCard({ product, term }) {
  const price = product.prices?.[term] ?? product.prices?.month ?? 0;
  return (
    <div className="group rounded-3xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
            Нет фото
          </div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold leading-tight">{product.title}</h3>
          <div className="text-sm text-neutral-600">{product.tagline}</div>
        </div>
        {product.hero && (
          <span className="text-[10px] uppercase tracking-wide bg-black text-white rounded-full px-2 py-1">Хит</span>
        )}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <p className="text-lg font-semibold">{price.toLocaleString()} ₽</p>
        <div className="text-sm text-neutral-500">{term === "day" ? "/ сутки" : term === "week" ? "/ неделя" : "/ месяц"}</div>
      </div>
      <ul className="mt-2 text-sm text-neutral-700 space-y-1">
        {product.perks?.map((p) => (
          <li key={p} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-black" /> {p}</li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <a href="#order" className="flex-1 inline-flex items-center justify-center rounded-2xl bg-black text-white px-4 py-2 text-sm font-medium hover:bg-black/90">Арендовать</a>
        <button className="px-4 py-2 text-sm rounded-2xl border hover:bg-neutral-100">Подробнее</button>
      </div>
    </div>
  );
}

// Раздел сайта с формой бронирования "Оформить заказ"
// Раздел сайта с формой бронирования "Оформить заказ"
function OrderForm({ scrollTo }) {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    package: "",
  });
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  // Скроллим ТОЛЬКО если передан флаг scrollTo = true
  // Добавлено: учёт высоты хедера (yOffset), чтобы форма не пряталась под шапкой
  useEffect(() => {
    if (scrollTo && formRef.current) {
      const yOffset = -200; // регулируй под высоту своего хедера
      const y =
        formRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [scrollTo]);

  // Отправка формы — показываем сообщение после сабмита
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  // Если форма уже отправлена — показываем сообщение об успехе
  if (sent) {
    return (
      <div
        ref={formRef}
        className="mt-4 rounded-2xl border bg-white p-4 text-sm scroll-mt-8"
      >
        Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения заказа.
      </div>
    );
  }

  // Основная форма бронирования
  return (
    <div ref={formRef} className="mt-4 scroll-mt-8">
      <form onSubmit={onSubmit} className="grid gap-3">
        {/* --- Поля Имя и Фамилия --- */}
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="grid gap-1 text-sm">
            <span>Имя</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Иван"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span>Фамилия</span>
            <input
              required
              value={form.surname}
              onChange={(e) => setForm({ ...form, surname: e.target.value })}
              className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Иванов"
            />
          </label>
        </div>

        {/* --- Поле телефона с форматированием --- */}
        <label className="grid gap-1 text-sm">
          <span>Телефон</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.startsWith("7")) value = value.slice(1);
              let formatted = "+7";
              if (value.length > 0) formatted += " (" + value.substring(0, 3);
              if (value.length >= 4) formatted += ") " + value.substring(3, 6);
              if (value.length >= 7) formatted += "-" + value.substring(6, 8);
              if (value.length >= 9) formatted += "-" + value.substring(8, 10);
              setForm({ ...form, phone: formatted });
            }}
            placeholder="+7 (___) ___-__-__"
            className="rounded-2xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </label>

        {/* --- Выбор пакета --- */}
        <label className="grid gap-1 text-sm">
          <span>Пакет</span>
          <select
            required
            value={form.package}
            onChange={(e) => setForm({ ...form, package: e.target.value })}
            className="rounded-2xl border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <option value="">Выберите пакет</option>
            <option value="weekend">Пакет “Выходные”</option>
            <option value="super">Пакет “Супер”</option>
            <option value="mega">Пакет “Мега”</option>
            <option value="hyper">Пакет “Гипер”</option>
          </select>
        </label>

        {/* --- Кнопка отправки формы --- */}
        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 text-sm font-semibold shadow-md hover:opacity-90 transition-transform hover:scale-[1.03]"
        >
          Отправить заявку
        </button>
      </form>

      {/* --- Раздел "Что требуется для аренды" --- */}
      <div className="mt-8 rounded-2xl border bg-white p-4">
        <h3 className="text-lg font-semibold mb-2">
          Что требуется для аренды 🔒
        </h3>
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