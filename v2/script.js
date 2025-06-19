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

// ===== CONFIGURACIÓN DE LA API =====
// IMPORTANTE: En un proyecto real, NUNCA pongas la API key directamente en el código
// Usa variables de entorno o un archivo de configuración seguro
const API_CONFIG = {
    // Cambia esta URL por la de tu API real
    endpoint: 'https://api.ejemplo.com/chat',
    // IMPORTANTE: Reemplaza 'tu-api-key-aqui' con tu API key real
    apiKey: 'tu-api-key-aqui'
};

// Array con respuestas de respaldo (por si falla la API)
const fallbackResponses = [
    "Lo siento, no pude conectarme al servidor. ¿Podrías intentar de nuevo?",
    "Parece que hay un problema de conexión. Inténtalo más tarde.",
    "No pude procesar tu mensaje en este momento. ¿Puedes repetirlo?"
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
async function handleFormSubmit(event) {
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
    
    // Mostrar indicador de que la IA está escribiendo
    showTypingIndicator();
    
    try {
        // Obtener respuesta de la IA usando fetch
        const aiMessage = await getAIResponse(userMessage);
        
        // Ocultar indicador de escritura
        hideTypingIndicator();
        
        // Agregar la respuesta de la IA al chat
        addMessage(aiMessage, 'ai');
        
    } catch (error) {
        console.error('Error al obtener respuesta de la IA:', error);
        
        // Ocultar indicador de escritura
        hideTypingIndicator();
        
        // Mostrar mensaje de error
        const errorMessage = getFallbackResponse();
        addMessage(errorMessage, 'ai');
    }
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

// ===== FUNCIÓN PARA OBTENER RESPUESTA DE LA IA VIA API =====
async function getAIResponse(userMessage) {
    try {
        // Realizar petición POST a la API
        const response = await fetch(API_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_CONFIG.apiKey}`,
                'session': 2
                // Algunos APIs usan 'X-API-Key' en lugar de 'Authorization'
                // 'X-API-Key': API_CONFIG.apiKey
            },
            body: JSON.stringify({
                message: userMessage,
                // Puedes agregar más parámetros según tu API
                // model: 'gpt-3.5-turbo',
                // max_tokens: 150,
                // temperature: 0.7
            })
        });
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        // Obtener los datos JSON de la respuesta
        const data = await response.json();
        
        // Extraer el mensaje de la respuesta (ajusta según tu API)
        // Ejemplo para OpenAI: data.choices[0].message.content
        // Ejemplo genérico: data.response o data.message
        return data.response || data.output || 'Lo siento, no pude generar una respuesta.';
        
    } catch (error) {
        console.error('Error en la petición a la API:', error);
        throw error; // Re-lanzar el error para que lo maneje handleFormSubmit
    }
}

// ===== FUNCIÓN PARA MOSTRAR INDICADOR DE ESCRITURA =====
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.classList.add('message', 'ai-message');
    typingDiv.innerHTML = `
        <div class="message-content">
            <strong>🤖 IA:</strong> <span class="typing-dots">Escribiendo...</span>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== FUNCIÓN PARA OCULTAR INDICADOR DE ESCRITURA =====
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ===== FUNCIÓN PARA OBTENER RESPUESTA DE RESPALDO =====
function getFallbackResponse() {
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
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
- async function nombre() {}: Función asíncrona (puede usar await)
- () => {}: Función flecha (forma moderna)
- Las funciones son bloques de código reutilizable

📌 PROGRAMACIÓN ASÍNCRONA:
- async/await: Maneja operaciones que toman tiempo (como peticiones HTTP)
- fetch(): Realiza peticiones HTTP a APIs
- try/catch: Maneja errores en código asíncrono
- Promise: Representa una operación que se completará en el futuro

📌 FETCH API:
- fetch(url, options): Realiza peticiones HTTP
- method: 'POST', 'GET', etc.
- headers: Información adicional (autenticación, tipo de contenido)
- body: Datos a enviar (JSON.stringify para objetos)
- .json(): Convierte la respuesta a objeto JavaScript

📌 EVENTOS:
- addEventListener(): Escucha eventos (clicks, teclas, etc.)
- event.preventDefault(): Previene el comportamiento por defecto
- Los eventos permiten que la página responda a las acciones del usuario

📌 DOM (Document Object Model):
- document.getElementById(): Obtiene un elemento por su ID
- createElement(): Crea un nuevo elemento HTML
- appendChild(): Agrega un elemento como hijo de otro
- innerHTML: Cambia el contenido HTML de un elemento
- .remove(): Elimina un elemento del DOM

📌 ARRAYS:
- []: Lista de elementos
- .length: Cantidad de elementos
- [index]: Accede a un elemento específico

📌 CONDICIONALES:
- if/else: Ejecuta código según condiciones
- Permite que el programa tome decisiones

📌 MANEJO DE ERRORES:
- try/catch: Captura y maneja errores
- throw: Lanza un error personalizado
- console.error(): Muestra errores en la consola

📌 MÉTODOS ÚTILES:
- Math.random(): Genera un número aleatorio
- .toLowerCase(): Convierte texto a minúsculas
- .includes(): Verifica si un texto contiene otro texto
- JSON.stringify(): Convierte objeto a texto JSON
- JSON.parse(): Convierte texto JSON a objeto

📌 SEGURIDAD:
- NUNCA pongas API keys directamente en el código frontend
- Usa variables de entorno o configuración del servidor
- Valida siempre las respuestas de APIs externas
*/