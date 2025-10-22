

/*
      work version

import express from "express";
import cors from "cors";
import fs from "fs";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// === Настройки для твоего Telegram-бота ===
const MY_BOT_TOKEN = "7933216697:AAGqtuJdfywEBIjD3oIU6uEg2j8JjxfnYIQ"; 
const MY_TELEGRAM_ID = "583073638";

// === Маршрут для приёма дублей заказов ===
app.post("/api/log-order", async (req, res) => {
  try {
    const data = req.body;
    const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    // Сохраняем локально в файл
    const entry = { ...data, timestamp };
    fs.appendFileSync("orders-log.json", JSON.stringify(entry) + "\n");

    // Формируем текст сообщения для Telegram
    const text = `
🕒 *Новый заказ с сайта*
📅 ${timestamp}

👤 Имя: ${data.name || "-"} ${data.surname || ""}
📞 Телефон: ${data.phone || "-"}
📦 Пакет: ${data.package || "-"}
🎮 Продукт: ${data.product || "-"}
💻 Источник: ${data.orderSource || "-"}
🆔 TG ID: ${data.tg_id || "-"}
    `;

    // Отправляем сообщение в Telegram
    await axios.post(`https://api.telegram.org/bot${MY_BOT_TOKEN}/sendMessage`, {
      chat_id: MY_TELEGRAM_ID,
      text,
      parse_mode: "Markdown",
    });

    res.status(200).json({ ok: true, message: "Заказ записан и отправлен в Telegram" });
  } catch (err) {
    console.error("❌ Ошибка при обработке заказа:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Сервер дублей запущен на порту ${PORT}`));
*/
import express from "express";
import cors from "cors";
import fs from "fs";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// === Telegram настройки ===
const MY_BOT_TOKEN = "7933216697:AAGqtuJdfywEBIjD3oIU6uEg2j8JjxfnYIQ";
const MY_TELEGRAM_ID = "583073638";

// Получение IP клиента
const getClientIp = (req) => {
  const xForwardedFor = req.headers["x-forwarded-for"];
  return xForwardedFor ? xForwardedFor.split(",")[0].trim() : req.socket.remoteAddress;
};

// === Маршрут для приёма заказов ===
app.post("/api/log-order", async (req, res) => {
  try {
    const data = req.body;
    const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
    const ip = getClientIp(req);
    const browser = req.headers["user-agent"];

    // Локальная запись
    const entry = { ...data, ip, browser, timestamp };
    fs.appendFileSync("orders-log.json", JSON.stringify(entry) + "\n");

    // Формируем текст сообщения
    const text = `
🕒 *Новый заказ с сайта*
📅 ${timestamp}

👤 Имя: ${data.name || "-"} ${data.surname || ""}
📞 Телефон: ${data.phone || "-"}
📦 Пакет: ${data.package || "-"}
🎮 Продукт: ${data.product || "-"}
💻 Источник: ${data.orderSource || "-"}
🆔 TG ID: ${data.tg_id || "-"}
🌐 IP: ${ip}
🧭 Браузер: ${browser}
    `;

    // Отправляем в Telegram
    await axios.post(`https://api.telegram.org/bot${MY_BOT_TOKEN}/sendMessage`, {
      chat_id: MY_TELEGRAM_ID,
      text,
      parse_mode: "Markdown",
    });

    res.status(200).json({ ok: true, message: "Заказ записан и отправлен" });
  } catch (err) {
    console.error("❌ Ошибка при обработке заказа:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Сервер дублей запущен на порту ${PORT}`));