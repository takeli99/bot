const TelegramBot = require('node-telegram-bot-api');
let fetch;

try {
    fetch = require('node-fetch');
} catch (err) {
    console.error('Error al importar node-fetch:', err);
    return;
}

function iniciarBot() {
    const token = '6685306159:AAFAEZc7RrG3BI7EN-MjNJPN1pJg5i1_MCU'; // Token de mi bot
    const bot = new TelegramBot(token, {polling: true}); // Creo el bot

    const respuestasUsuario = {}; // Creo un objeto para guardar las respuestas

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Bienvenido al test de la casa de Harry Potter, ¿estás listo para comenzar?');
        preguntarCualidad(msg);
    }); // Mensaje de bienvenida

    // Funciones para preguntar cualidad, mascota, color, asignatura, lugar, hechizo, objeto mágico y mascota mágica
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

    function preguntarAsignatura(msg){
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '¿Cuál de estas asignaturas te gustaría estudiar?\n1) Pociones\n2) Transformaciones\n3) Encantamientos\n4) Defensa contra las artes oscuras');
    }

    function preguntarLugar(msg) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '¿Qué lugar mágico te gustaría visitar?\n1) Hogsmeade\n2) El Callejón Diagon\n3) La Sala de los Menesteres\n4) La Madriguera');
    }

    function preguntarHechizo(msg) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '¿Cuál de estos hechizos te gustaría aprender?\n1) Expecto Patronum\n2) Wingardium Leviosa\n3) Lumos\n4) Expelliarmus');
    }

    function preguntarObjetoMagico(msg) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '¿Cuál de estos objetos mágicos te gustaría tener?\n1) La capa de invisibilidad\n2) La varita de saúco\n3) La piedra de la resurrección\n4) El giratiempo');
    }

    function preguntarMascotaMagica(msg) {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, '¿Cuál sería tu mascota mágica ideal?\n1) Dragón\n2) Hipogrifo\n3) Fenix\n4) Elfo doméstico');
    }

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const messageText = msg.text.toLowerCase();
        const userId = msg.from.id;

        if (!respuestasUsuario[userId]) {
            // Si no hay respuestas, preguntar por la cualidad
            preguntarCualidad(msg);
            respuestasUsuario[userId] = { cualidad: null, mascota: null, color: null, asignatura: null, lugar: null, hechizo: null, objetoMagico: null, mascotaMagica: null };
        } else if (!respuestasUsuario[userId].cualidad) {
            // Si aún no ha respondido a la primera pregunta, guardar la respuesta y preguntar por la mascota
            respuestasUsuario[userId].cualidad = messageText;
            preguntarMascota(msg);
        } else if (!respuestasUsuario[userId].mascota) {
            // Si aún no ha respondido a la segunda pregunta, guardar la respuesta y preguntar por el color
            respuestasUsuario[userId].mascota = messageText;
            preguntarColor(msg);
        } else if (!respuestasUsuario[userId].color) {
            // Si aún no ha respondido a la tercera pregunta, guardar la respuesta y preguntar por la asignatura favorita
            respuestasUsuario[userId].color = messageText;
            preguntarAsignatura(msg);
        } else if (!respuestasUsuario[userId].asignatura) {
            // Si aún no ha respondido a la cuarta pregunta, guardar la respuesta y preguntar por el lugar mágico favorito
            respuestasUsuario[userId].asignatura = messageText;
            preguntarLugar(msg);
        } else if (!respuestasUsuario[userId].lugar) {
            // Si aún no ha respondido a la quinta pregunta, guardar la respuesta y preguntar por el tipo de hechizo favorito
            respuestasUsuario[userId].lugar = messageText;
            preguntarHechizo(msg);
        } else if (!respuestasUsuario[userId].hechizo) {
            // Si aún no ha respondido a la sexta pregunta, guardar la respuesta y preguntar por el objeto mágico favorito
            respuestasUsuario[userId].hechizo = messageText;
            preguntarObjetoMagico(msg);
        } else if (!respuestasUsuario[userId].objetoMagico) {
            // Si aún no ha respondido a la séptima pregunta, guardar la respuesta y preguntar por la mascota mágica ideal
            respuestasUsuario[userId].objetoMagico = messageText;
            preguntarMascotaMagica(msg);
        } else if (!respuestasUsuario[userId].mascotaMagica) {
            // Si aún no ha respondido a la octava pregunta, guardar la respuesta y determinar la casa
            respuestasUsuario[userId].mascotaMagica = messageText;
            
            // Llamar a la API Sorting Hat con las respuestas del usuario
            determinarCasa(chatId, respuestasUsuario[userId]);
        }
    });

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
}

