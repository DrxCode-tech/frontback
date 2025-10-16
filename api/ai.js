import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { txt } = req.body;
  const prompt = txt?.trim();

  if (!prompt) {
    return res.status(400).json({ error: "Missing input text" });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert coding assistant helping users write and debug code.",
        },
        { role: "user", content: prompt },
      ],
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
