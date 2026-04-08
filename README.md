# Gestor de Misiones — Prueba Técnica Datexco

App web para gestionar usuarios y misiones de una comunidad, con integración de IA para mejorar descripciones y generar mensajes de invitación.

---

## Stack utilizado

- **Backend:** Node.js + Express
- **Base de datos:** SQLite (better-sqlite3)
- **Frontend:** React + Vite
- **IA:** Groq API (llama-3.1-8b-instant)

---

## Instrucciones de ejecución

### Requisitos previos
- Node.js v18 o superior
- Una API key de [Groq](https://console.groq.com)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Hawks5545/prueba-datexco.git
cd prueba-datexco
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Agrega tu API key de Groq en el `.env`:

PORT=3000
GROQ_API_KEY=tu_api_key_aqui

Inicia el servidor:

```bash
node index.js
```

El backend quedará corriendo en `http://localhost:3000`

### 3. Configurar el frontend

Abre una nueva terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend quedará corriendo en `http://localhost:5173`

---

##  Funcionalidades

- Crear y listar usuarios
- Crear y listar misiones
- Asignar misiones a usuarios
- **Mejorar descripción con IA** — usa Groq para reescribir la descripción de una misión de forma más clara y profesional
- **Generar invitación con IA** — genera un mensaje motivador para invitar a un usuario a unirse a una misión

---

##  Integración de IA

Se usó la API de **Groq** con el modelo `llama-3.1-8b-instant` por ser gratuita y de baja latencia. La integración vive en `backend/src/services/aiService.js` y expone dos endpoints:

- `POST /api/ai/improve` — mejora la descripción de una misión
- `POST /api/ai/invite` — genera un mensaje de invitación para una misión

---

##  ¿Qué mejoraría con más tiempo?

- Agregar autenticación de usuarios con JWT
- Permitir cambiar el estado de una misión (pendiente, en progreso, completada)
- Agregar paginación en las listas
- Escribir tests unitarios para los controllers
- Desplegar la app en un servidor (Railway, Render, etc.)