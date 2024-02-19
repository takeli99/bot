const TelegramBot = require('node-telegram-bot-api');
let fetch;
const config = require( './config.json' );
const token = config.token;

try {
    fetch = require('node-fetch');
} catch (err) {
    console.error('Error al importar node-fetch:', err);
    return;
}
const bot = new TelegramBot(token, {polling: true}); // Creo el bot

function iniciarBot() {
    const respuestasUsuario = {}; // Creo un objeto para guardar las respuestas

    bot.onText(/\/start/, (message) => {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, 'Bienvenido al test de la casa de Harry Potter, ¿estás listo para comenzar?');
    }); // Mensaje de bienvenida

    bot.onText(/si/i, (message) => { // El bot empieza con el usuario pone si
        preguntarCualidad(message);
    });

    bot.onText(/no/i, (message) => {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, 'Entendido, cuando estés listo para comenzar, simplemente escribe /start.');
        return;
    });

    // Funciones para preguntar cualidad, mascota, color, asignatura, lugar, hechizo, objeto mágico y mascota mágica
    function preguntarCualidad(message) {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, '¿Cuál de estas cualidades consideras más importante?', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '1) Valentía', callback_data: '1' }],
                    [{ text: '2) Lealtad', callback_data: '2' }],
                    [{ text: '3) Sabiduría', callback_data: '3' }],
                    [{ text: '4) Ambición', callback_data: '4' }]
                ]
            }
        });
    }

    function preguntarMascota(message) {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, '¿Qué mascota te gustaría tener?',  {
            reply_markup: { 
                inline_keyboard: [
                    [{ text: '1) Lechuza', callback_data: '1' }],
                    [{ text: '2) Gato', callback_data: '2' }],
                    [{ text: '3) Rata', callback_data: '3' }],
                    [{ text: '4) Sapo', callback_data: '4' }]
                ]
            }
        });
    }

    function preguntarColor(message) {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, '¿Cuál de estos colores te gusta más?', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '1) Rojo', callback_data: '1' }],
                    [{ text: '2) Amarillo', callback_data: '2' }],
                    [{ text: '3) Azul', callback_data: '3' }],
                    [{ text: '4) Verde', callback_data: '4' }],
                ]
            }
        });
    }

    function preguntarAsignatura(message){
        const chatId = message.chat.id;
        bot.sendMessage(chatId, '¿Cuál de estas asignaturas te gustaría estudiar?', {
            reply_markup:{
                inline_keyboard: [
                    [{ text: '1) Pociones', callback_data: '1' }],
                    [{ text: '2) Transformaciones', callback_data: '2' }],
                    [{ text: '3) Ecantamientos', callback_data: '3' }],
                    [{ text: '4) Defensa contra las artes oscuras', callback_data: '4' }],
                ]
            }
        });
    }

    function preguntarLugar(message) {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, '¿Qué lugar mágico te gustaría visitar?', {
            reply_markup : {
                inline_keyboard: [
                    [{ text: '1) Hogsmeade', callback_data: '1' }],
                    [{ text: '2) El callejon Diagon', callback_data: '2' }],
                    [{ text: '3) La sala de los Menesteres', callback_data: '3' }],
                    [{ text: '4) La Madriguera', callback_data: '4' }],
                ]
            }
        });
    }

    function preguntarHechizo(message) {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, '¿Cuál de estos hechizos te gustaría aprender?', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '1) Expecto Patronum', callback_data: '1' }],
                    [{ text: '2) Wingardium Leviosa', callback_data: '2' }],
                    [{ text: '3) Lumos', callback_data: '3' }],
                    [{ text: '4) Expelliarmus', callback_data: '4' }],
                ]
            }
        });
    }

    function preguntarObjetoMagico(message) {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, '¿Cuál de estos objetos mágicos te gustaría tener?', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '1) La capa de invisibilidad', callback_data: '1' }],
                    [{ text: '2) La varita de saúco', callback_data: '2' }],
                    [{ text: '3) La piedradela resurrección', callback_data: '3' }],
                    [{ text: '4) El giratiempo', callback_data: '4' }],
                ]
            }
        });
    }

    function preguntarMascotaMagica(message) {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, '¿Cuál sería tu mascota mágica ideal?', {
            reply_markup: { 
                inline_keyboard: [
                    [{ text: '1) Dragón', callback_data: '1' }],
                    [{ text: '2) Hipogrifo', callback_data: '2'}],
                    [{ text: '3) Fenix', callback_data: '3' }],
                    [{ text: '4) Elfo doméstico', callback_data: '4' }],
                ] 
            },
        });
    }

    bot.on('callback_query', (callbackQuery) => {
        const message = callbackQuery.message;
        const userId = message.from.id;
        const data = callbackQuery.data;

        if (!respuestasUsuario[userId]) {
            preguntarCualidad(message);
            respuestasUsuario[userId] = [];
        } else if (respuestasUsuario[userId].length < 8) {
            respuestasUsuario[userId].push(data);
            switch (respuestasUsuario[userId].length) {
                case 1:
                    preguntarMascota(message);
                    break;
                case 2:
                    preguntarColor(message);
                    break;
                case 3:
                    preguntarAsignatura(message);
                    break;
                case 4:
                    preguntarLugar(message);
                    break;
                case 5:
                    preguntarHechizo(message);
                    break;
                case 6:
                    preguntarObjetoMagico(message);
                    break;
                case 7:
                    preguntarMascotaMagica(message);
                    break;
                case 8:
                    determinarCasa(message.chat.id, respuestasUsuario[userId]);
                    break;
                default:
                    break;
            }
        }
    });

    bot.onText(/\/casa/, (message) => {
        const chatId = message.chat.id;
        bot.sendMessage(chatId, 'Primero completa el test para conocer tu casa.');
    });
}

function determinarCasa(chatId, respuestasUsuario) {
    let gryffindor = 0;
    let hufflepuff = 0;
    let ravenclaw = 0;
    let slytherin = 0;

    respuestasUsuario.forEach(respuesta => {
        switch (respuesta) {
            case '1':
                gryffindor++;
                break;
            case '2':
                hufflepuff++;
                break;
            case '3':
                ravenclaw++;
                break;
            case '4':
                slytherin++;
                break;
            default:
                break;
        }
    });

    let max = Math.max(gryffindor, hufflepuff, ravenclaw, slytherin);

    let casa = '';
    if (max === gryffindor) {
        casa = 'Gryffindor';
    } else if (max === hufflepuff) {
        casa = 'Hufflepuff';
    } else if (max === ravenclaw) {
        casa = 'Ravenclaw';
    } else {
        casa = 'Slytherin';
    }

    bot.sendMessage(chatId, `¡Basado en el sombrero seleccionador, tu casa en Hogwarts es: ${casa}!`);
}

iniciarBot();

    // bot.onText(/\/casa/, (message) => {
    //     const chatId = message.chat.id;
    //     fetch('https://www.potterapi.com/v1/sortingHat') // Api del sombrero que te dice tu casa en Hogwarts
    //         .then(response => response.json())
    //         .then(data => {
    //             bot.sendMessage(chatId, `¡Basado en el sombrero seleccionador, tu casa en Hogwarts es: ${data}!`);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             bot.sendMessage(chatId, 'Lo siento, ha ocurrido un error al determinar tu casa. Por favor, inténtalo de nuevo más tarde.');
    //         });
    // }); COMO LA API YA LA HAN QUITADO LO HE HECHO A MANO


