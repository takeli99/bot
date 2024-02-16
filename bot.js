const TelegramBot = require('node-telegram-bot-api'); // Llamo al bot
const fetch = require('node-fetch'); // Para subir la API

const token = '6685306159:AAFAEZc7RrG3BI7EN-MjNJPN1pJg5i1_MCU'; // Token de mi bot

const bot = new TelegramBot(token, {polling: true}); // Creo el bot

const respuestas = {}; // Creo un objeto para guardar las respuestas

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Bienvenido al test de la casa de Harry Potter, ¿estás listo para comenzar?');
    preguntarCualidad(msg);
}); // Mensaje de bienvenida

function preguntarCualidad(msg) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '¿Cuál de estas cualidades consideras más importante?\n1) Valentía\n2) Lealtad\n3) Sabiduría\n4) Ambición');
}

function preguntarMascota(msg) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '¿Qué mascota te gustaría tener?\n1) Lechuza\n2) Gato\n3) Rata\n4) Sapo');
}

function preguntarColor(msg) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '¿Cuál de estos colores te gusta más?\n1) Rojo\n2) Amarillo\n3) Azul\n4) Verde');
}


bot.onText(/\/casa/, (msg) => {
    const chatId = msg.chat.id;
    fetch('https://www.potterapi.com/v1/sortingHat') // Api del sombrero que te dice tu casa en Hogwarts
        .then(response => response.json())
        .then(data => {
            bot.sendMessage(chatId, `¡Basado en el sombrero seleccionador, tu casa en Hogwarts es: ${data}!`);
        })
        .catch(error => {
            console.error('Error:', error);
            bot.sendMessage(chatId, 'Lo siento, ha ocurrido un error al determinar tu casa. Por favor, inténtalo de nuevo más tarde.');
        });
});



