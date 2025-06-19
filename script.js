/* 
⚡ ARCHIVO JAVASCRIPT - FUNCIONALIDAD DEL CHAT

Este archivo contiene todo el código que hace que nuestro chat sea interactivo.
JavaScript es el lenguaje que da "vida" a las páginas web.
*/

// ===== VARIABLES GLOBALES =====
// Estas variables almacenan referencias a elementos HTML

// Obtenemos el formulario del chat por su ID
const chatForm = document.getElementById('chat-form');

// Obtenemos el campo de entrada de texto
const userInput = document.getElementById('user-input');

// Obtenemos el contenedor donde aparecen los mensajes
const chatMessages = document.getElementById('chat-messages');

// Array con respuestas predefinidas de la IA
const aiResponses = [
    "¡Interesante! Cuéntame más sobre eso.",
    "Entiendo tu punto de vista. ¿Qué opinas sobre...?",
    "Esa es una buena pregunta. Déjame pensar...",
    "¡Excelente! Me gusta cómo piensas.",
    "Hmm, eso es algo en lo que no había pensado antes.",
    "¿Podrías explicarme un poco más?",
    "¡Qué fascinante! Sigue contándome.",
    "Creo que tienes razón en ese punto.",
    "Esa es una perspectiva muy interesante.",
    "¡Me encanta aprender cosas nuevas contigo!"
];

// ===== FUNCIÓN PRINCIPAL =====
// Esta función se ejecuta cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Chat iniciado correctamente');
    
    // Agregamos el evento al formulario
    chatForm.addEventListener('submit', handleFormSubmit);
    
    // Enfocamos el campo de entrada para que el usuario pueda escribir inmediatamente
    userInput.focus();
});

// ===== FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO =====
function handleFormSubmit(event) {
    // Prevenir que la página se recargue (comportamiento por defecto del formulario)
    event.preventDefault();
    
    // Obtener el texto que escribió el usuario
    const userMessage = userInput.value.trim();
    
    // Verificar que el mensaje no esté vacío
    if (userMessage === '') {
        alert('Por favor, escribe un mensaje antes de enviar.');
        return; // Salir de la función si no hay mensaje
    }
    
    // Agregar el mensaje del usuario al chat
    addMessage(userMessage, 'user');
    
    // Limpiar el campo de entrada
    userInput.value = '';
    
    // Simular que la IA está "pensando" y responder después de un momento
    setTimeout(function() {
        const aiMessage = generateAIResponse(userMessage);
        addMessage(aiMessage, 'ai');
    }, 1000); // Esperar 1 segundo (1000 milisegundos)
}

// ===== FUNCIÓN PARA AGREGAR MENSAJES AL CHAT =====
function addMessage(messageText, sender) {
    // Crear un nuevo elemento div para el mensaje
    const messageDiv = document.createElement('div');
    
    // Agregar las clases CSS apropiadas
    messageDiv.classList.add('message');
    
    if (sender === 'user') {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('ai-message');
    }
    
    // Obtener la hora actual
    const currentTime = getCurrentTime();
    
    // Crear el contenido HTML del mensaje
    const senderName = sender === 'user' ? '👤 Tú' : '🤖 IA';
    messageDiv.innerHTML = `
        <div class="message-content">
            <strong>${senderName}:</strong> ${messageText}
        </div>
        <div class="message-time">${currentTime}</div>
    `;
    
    // Agregar el mensaje al contenedor de mensajes
    chatMessages.appendChild(messageDiv);
    
    // Hacer scroll hacia abajo para ver el mensaje más reciente
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Enfocar nuevamente el campo de entrada
    userInput.focus();
}

// ===== FUNCIÓN PARA GENERAR RESPUESTAS DE LA IA =====
function generateAIResponse(userMessage) {
    // Convertir el mensaje del usuario a minúsculas para facilitar la comparación
    const message = userMessage.toLowerCase();
    
    // Respuestas específicas para ciertas palabras clave
    if (message.includes('hola') || message.includes('hi')) {
        return '¡Hola! ¿Cómo estás hoy? 😊';
    }
    
    if (message.includes('adiós') || message.includes('bye')) {
        return '¡Hasta luego! Fue un placer charlar contigo. 👋';
    }
    
    if (message.includes('gracias')) {
        return '¡De nada! Siempre es un placer ayudar. 😊';
    }
    
    if (message.includes('nombre')) {
        return 'Soy un asistente virtual creado para esta práctica de programación. ¡Puedes llamarme ChatBot! 🤖';
    }
    
    if (message.includes('html') || message.includes('css') || message.includes('javascript')) {
        return '¡Excelente! Estás aprendiendo tecnologías web muy importantes. ¿Te está gustando la programación? 💻';
    }
    
    // Si no hay palabras clave específicas, elegir una respuesta aleatoria
    const randomIndex = Math.floor(Math.random() * aiResponses.length);
    return aiResponses[randomIndex];
}

// ===== FUNCIÓN PARA OBTENER LA HORA ACTUAL =====
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// ===== EVENTOS ADICIONALES =====
// Permitir enviar mensajes presionando Enter
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleFormSubmit(event);
    }
});

// Mostrar un mensaje en la consola cuando el usuario empieza a escribir
userInput.addEventListener('input', function() {
    if (userInput.value.length === 1) {
        console.log('👤 El usuario está escribiendo...');
    }
});

/* 
🎓 EXPLICACIÓN DE CONCEPTOS JAVASCRIPT:

📌 VARIABLES:
- const: Variable que no cambia (constante)
- let: Variable que puede cambiar
- var: Variable (forma antigua, mejor usar let/const)

📌 FUNCIONES:
- function nombre() {}: Declara una función
- () => {}: Función flecha (forma moderna)
- Las funciones son bloques de código reutilizable

📌 EVENTOS:
- addEventListener(): Escucha eventos (clicks, teclas, etc.)
- event.preventDefault(): Previene el comportamiento por defecto
- Los eventos permiten que la página responda a las acciones del usuario

📌 DOM (Document Object Model):
- document.getElementById(): Obtiene un elemento por su ID
- createElement(): Crea un nuevo elemento HTML
- appendChild(): Agrega un elemento como hijo de otro
- innerHTML: Cambia el contenido HTML de un elemento

📌 ARRAYS:
- []: Lista de elementos
- .length: Cantidad de elementos
- [index]: Accede a un elemento específico

📌 CONDICIONALES:
- if/else: Ejecuta código según condiciones
- Permite que el programa tome decisiones

📌 MÉTODOS ÚTILES:
- setTimeout(): Ejecuta código después de un tiempo
- Math.random(): Genera un número aleatorio
- .toLowerCase(): Convierte texto a minúsculas
- .includes(): Verifica si un texto contiene otro texto
*/