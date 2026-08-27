// 1. Cursor Customizado
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

// 2. Mock de Dados de Produtos
const products = [
    { id: 1, name: "Quantum Pro Notebook", price: "R$ 12.500", img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=500" },
    { id: 2, name: "Neural Link Smartphone", price: "R$ 7.200", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=500" },
    { id: 3, name: "Void Edition PC", price: "R$ 25.000", img: "https://images.unsplash.com/photo-1587202377425-8b6033cd340c?q=80&w=500" },
];

const container = document.getElementById('product-container');

products.forEach(p => {
    container.innerHTML += `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p style="color: var(--accent-cyan); margin: 10px 0;">${p.price}</p>
            <button class="cta-button" style="width:100%; padding: 10px; background: transparent; color: white; border: 1px solid white;">Comprar Agora</button>
        </div>
    `;
});

// 3. Animações GSAP (Nível Ultra HD)
gsap.from(".reveal", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.3,
    ease: "power4.out"
});

gsap.from(".product-card", {
    scrollTrigger: {
        trigger: ".product-grid",
        start: "top 80%"
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// 4. Integração com Gemini AI
const GEMINI_API_KEY = "SUA_CHAVE_AQUI"; // <-- COLOQUE SUA API KEY DO GOOGLE GEMINI AQUI

async function askGemini(prompt) {
    const chatMessages = document.getElementById('chatMessages');
    
    // Adiciona msg do usuário na tela
    chatMessages.innerHTML += `<div class="msg user">${prompt}</div>`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Você é um vendedor especialista da TECHNOVA. Responda de forma curta e luxuosa: ${prompt}` }] }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        chatMessages.innerHTML += `<div class="msg bot">${aiResponse}</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        chatMessages.innerHTML += `<div class="msg bot">Estou processando dados... (Verifique se sua API Key está configurada)</div>`;
    }
}

// Event Listeners do Chat
document.getElementById('sendBtn').addEventListener('click', () => {
    const input = document.getElementById('userInput');
    if (input.value) {
        askGemini(input.value);
        input.value = '';
    }
});

function toggleChat() {
    const chat = document.getElementById('aiChat');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}