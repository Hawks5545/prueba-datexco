const Groq = require("groq-sdk");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Modelo a usar — llama es rápido y gratuito en Groq
const MODEL = "llama-3.1-8b-instant";

const generateInvitationMessage = async (missionTitle, missionDescription) => {
  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 300,
    messages: [
      {
        role: "user",
        content: `Eres un coordinador de una comunidad activa y motivadora.
        
Genera un mensaje de invitación corto, entusiasta y profesional para invitar a un usuario a unirse a la siguiente misión:

Título: ${missionTitle}
Descripción: ${missionDescription}

El mensaje debe tener máximo 3 oraciones. Directo, motivador y claro.`,
      },
    ],
  });

  return response.choices[0].message.content;
};

const improveDescription = async (description) => {
  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 300,
    messages: [
      {
        role: "user",
        content: `Mejora la siguiente descripción de una misión para que sea más clara, atractiva y profesional.
Devuelve únicamente la descripción mejorada, sin explicaciones adicionales.

Descripción original: ${description}`,
      },
    ],
  });

  return response.choices[0].message.content;
};

module.exports = { generateInvitationMessage, improveDescription };