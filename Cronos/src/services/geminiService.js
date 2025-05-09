import { GoogleGenerativeAI } from "@google/generative-ai";

// Para projetos com Vite, use import.meta.env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const gerarConteudoMateria = async (materia, topico) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Gere um conteúdo educacional detalhado sobre ${topico} da matéria de ${materia}. 
    O conteúdo deve ser estruturado em tópicos principais, com explicações claras e exemplos quando relevante. De enfaze em como pode cair no enem. Maximo de 200 palavras.  Formate o texto com tags <p> para parágrafos e <ul>/<li> para listas.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    return "Desculpe, houve um erro ao gerar o conteúdo. Por favor, tente novamente mais tarde.";
  }
};