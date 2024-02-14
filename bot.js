const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const token = '6685306159:AAFAEZc7RrG3BI7EN-MjNJPN1pJg5i1_MCU';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Bienvenido al test de la casa de Harry Potter, ¿estás listo para comenzar?');
});



