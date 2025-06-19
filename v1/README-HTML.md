# 📄 HTML - Guía de Conceptos Básicos

## ¿Qué es HTML?

HTML significa **"HyperText Markup Language"** (Lenguaje de Marcado de Hipertexto). Es como el **esqueleto** de una página web - define la estructura y el contenido que verás en tu navegador.

### 🏗️ Piensa en HTML como construir una casa:
- **HTML** = La estructura (paredes, techo, habitaciones)
- **CSS** = La decoración (colores, muebles, estilo)
- **JavaScript** = La funcionalidad (luces, electrodomésticos, sistemas)

---

## 🎯 Conceptos HTML utilizados en nuestro Chat

### 1. **Estructura Básica del Documento**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Información sobre la página -->
</head>
<body>
    <!-- Contenido visible de la página -->
</body>
</html>
```

**Explicación simple:**
- `<!DOCTYPE html>`: Le dice al navegador "esto es HTML5"
- `<html>`: Es como la caja que contiene toda la página
- `<head>`: Información invisible (título, enlaces a CSS)
- `<body>`: Todo lo que el usuario puede ver

### 2. **Semántica HTML - Elementos con Significado**

#### 🏠 **`<header>` - Encabezado**
```html
<header class="chat-header">
    <h1>💬 Chat con IA</h1>
    <p>Práctica básica de HTML, CSS y JavaScript</p>
</header>
```
**¿Qué hace?** Define la parte superior de la página, como el título de un libro.

#### 🎯 **`<main>` - Contenido Principal**
```html
<main class="chat-container">
    <!-- Aquí va el contenido más importante -->
</main>
```
**¿Qué hace?** Marca el contenido principal de la página, como el capítulo principal de un libro.

#### 🦶 **`<footer>` - Pie de Página**
```html
<footer class="chat-footer">
    <p>Proyecto educativo - Aprendiendo HTML, CSS y JavaScript</p>
</footer>
```
**¿Qué hace?** Define la parte inferior, como las notas al pie de una página.

### 3. **Formularios - Interacción con el Usuario**

#### 📝 **`<form>` - Formulario**
```html
<form id="chat-form" class="chat-input-container">
    <!-- Campos de entrada aquí -->
</form>
```
**¿Qué hace?** Es como una hoja de papel donde el usuario puede escribir información.

#### ✏️ **`<input>` - Campo de Entrada**
```html
<input 
    type="text" 
    id="user-input" 
    class="chat-input" 
    placeholder="Escribe tu mensaje aquí..."
    required
>
```
**Atributos explicados:**
- `type="text"`: Solo acepta texto (como escribir en un cuaderno)
- `placeholder`: Texto de ayuda que desaparece al escribir
- `required`: Campo obligatorio (no se puede enviar vacío)

#### 🔘 **`<button>` - Botón**
```html
<button type="submit" class="send-button">
    📤 Enviar
</button>
```
**¿Qué hace?** Un botón que el usuario puede presionar, como un timbre.

### 4. **Contenedores y Organización**

#### 📦 **`<div>` - Contenedor Genérico**
```html
<div id="chat-messages" class="chat-messages">
    <!-- Mensajes del chat aquí -->
</div>
```
**¿Qué hace?** Es como una caja donde guardas cosas relacionadas.

### 5. **Identificadores y Clases**

#### 🆔 **IDs - Identificadores Únicos**
```html
<div id="chat-messages">
```
**Regla importante:** Solo puede haber **UN** elemento con cada ID en toda la página.
**Analogía:** Como tu número de cédula - es único para ti.

#### 🏷️ **Classes - Etiquetas Reutilizables**
```html
<div class="message ai-message">
```
**Regla importante:** Muchos elementos pueden tener la **MISMA** clase.
**Analogía:** Como las etiquetas "estudiante" - muchas personas pueden ser estudiantes.

### 6. **Atributos/Parámetros**

Los atributos son como **características** que le das a los elementos:

```html
<input 
    type="text"           <!-- Tipo de entrada -->
    id="user-input"       <!-- Identificador único -->
    class="chat-input"    <!-- Clase para estilos -->
    placeholder="Escribe..." <!-- Texto de ayuda -->
    required              <!-- Campo obligatorio -->
>
```

**Piénsalo así:** Si el elemento `<input>` fuera una persona:
- `type="text"` = "Soy una persona que habla"
- `id="user-input"` = "Mi nombre es user-input"
- `class="chat-input"` = "Pertenezco al grupo chat-input"
- `placeholder` = "Mi trabajo es mostrar ayuda"
- `required` = "Soy importante, no me ignores"

---

## 🧠 Esquema Mental para Recordar

```
PÁGINA WEB = CASA
├── <html> = La casa completa
├── <head> = Planos y documentos (invisible)
└── <body> = Parte habitable (visible)
    ├── <header> = Entrada/recibidor
    ├── <main> = Sala principal
    │   ├── <div> = Habitaciones
    │   ├── <form> = Mesa de trabajo
    │   ├── <input> = Herramientas
    │   └── <button> = Interruptores
    └── <footer> = Sótano/garaje
```

---

## 🎯 ¿Por qué es importante la Semántica?

1. **Para los navegadores:** Entienden mejor tu página
2. **Para las personas con discapacidades:** Los lectores de pantalla funcionan mejor
3. **Para Google:** Indexa mejor tu contenido
4. **Para otros desarrolladores:** Tu código es más fácil de entender

---

## 📚 Recursos para Seguir Aprendiendo

- [MDN Web Docs - HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML Validator](https://validator.w3.org/) - Para verificar que tu HTML esté bien escrito

---

## ✅ Checklist de Conceptos Aprendidos

- [ ] Entiendo qué es HTML y para qué sirve
- [ ] Conozco la estructura básica de un documento HTML
- [ ] Sé la diferencia entre `<head>` y `<body>`
- [ ] Entiendo qué son los elementos semánticos
- [ ] Puedo distinguir entre IDs y clases
- [ ] Sé qué son los atributos y cómo usarlos
- [ ] Entiendo cómo funcionan los formularios básicos

¡Felicidades! 🎉 Ahora tienes una base sólida de HTML para seguir construyendo páginas web increíbles.