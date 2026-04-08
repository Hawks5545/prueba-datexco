const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const generateInvitationMessage = async (missionTitle, missionDescription) => {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
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

  return message.content[0].text;
};

const improveDescription = async (description) => {
  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
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

  return message.content[0].text;
};

module.exports = { generateInvitationMessage, improveDescription };