import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async ({ request }) => {
  const data = await request.json();
  const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(data.message);
    const response = await result.response;
    const text = response.text();
    
    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro no servidor" }), { status: 500 });
  }
};