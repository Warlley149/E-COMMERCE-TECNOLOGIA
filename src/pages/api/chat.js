const getBackendUrl = () => import.meta.env.CHATBOT_API_URL || "http://localhost:3000";

const proxyResponse = async (response) => new Response(await response.text(), {
  status: response.status,
  headers: {
    "Content-Type": response.headers.get("Content-Type") || "application/json",
  },
});

export const GET = async () => {
  try {
    const response = await fetch(`${getBackendUrl()}/api/chat/initial-message`, {
      signal: AbortSignal.timeout(30000),
    });

    return proxyResponse(response);
  } catch (error) {
    console.error("Erro ao carregar saudação do chatbot:", error);

    return new Response(JSON.stringify({
      error: "Não foi possível carregar a saudação do atendimento.",
    }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST = async ({ request }) => {
  try {
    const data = await request.json();

    const response = await fetch(`${getBackendUrl()}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(30000),
    });

    return proxyResponse(response);
  } catch (error) {
    console.error("Erro ao conectar ao backend do chatbot:", error);

    return new Response(JSON.stringify({
      error: "Não foi possível conectar ao serviço de atendimento.",
    }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
};