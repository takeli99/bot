const TelegramBot = require('node-telegram-bot-api'); // Llamo al bot
const fetch = require('node-fetch'); // Para subir la API

const token = '6685306159:AAFAEZc7RrG3BI7EN-MjNJPN1pJg5i1_MCU'; // Token de mi bot

const bot = new TelegramBot(token, {polling: true}); // Creo el bot

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Bienvenido al test de la casa de Harry Potter, ¿estás listo para comenzar?');
}); // Mensaje de bienvenida



