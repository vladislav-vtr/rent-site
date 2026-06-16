import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";
import { Button } from "../components/ui/Button";
 
/**
 * Страница "Как это работает" — заглушка.
 * Контент будем наполнять позднее, как договорились.
 */
export default function HowItWorksPage() {
  return (
    <main className="pt-32 pb-20 min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4">
        {/* Breadcrumb-подобная ссылка назад */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-indigo-600 transition-colors mb-6"
        >
          <ArrowLeft size={15} />
          На главную
        </Link>
 
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-neutral-900">
          Как это{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            работает
          </span>
        </h1>
 
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
          Подробно расскажем, как забронировать консоль, что нужно для оформления,
          как проходит доставка и оплата.
        </p>
 
        {/* Заглушка — позже заменим на реальный контент */}
        <div className="mt-12 rounded-3xl border-2 border-dashed border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-10 sm:p-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 mb-5">
            <Wrench size={28} className="text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900">Раздел в разработке</h2>
          <p className="mt-2 text-neutral-500 max-w-md mx-auto">
            Здесь появится пошаговое описание процесса аренды — от выбора комплекта
            до возврата. Контент добавим в ближайшее время.
          </p>
          <div className="mt-6">
            <Button as={Link} to="/" variant="outline">
              Перейти к каталогу
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
 