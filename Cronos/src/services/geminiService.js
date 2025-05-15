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
export const gerarQuestoesQuiz = async (materia, topico) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Gere 10 questões de múltipla escolha sobre ${topico} na matéria de ${materia}.
    Cada questão deve ter:
    - Uma pergunta clara e objetiva que possa vir a virar um flashcard
    - 4 alternativas (A, B, C, D)
    - A resposta correta indicada pelo índice (0 a 3)
    - Uma explicação detalhada da resposta
    
    Formate a resposta como um array JSON onde cada objeto tem:
    {
      "pergunta": "texto da pergunta",
      "opcoes": ["opção 1", "opção 2", "opção 3", "opção 4"],
      "respostaCorreta": índice da opção correta (0-3),
      "explicacao": "explicação detalhada"
    }

    Inclua questões que podem cair no ENEM e sejam relevantes para o tema.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extrai o JSON da resposta (o Gemini pode adicionar texto antes/depois)
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']') + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erro ao gerar questões:", error);
    throw new Error("Não foi possível gerar as questões. Por favor, tente novamente.");
  }
};
export const gerarRespostaIA = async (pergunta) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Você é um assistente educacional especializado em ajudar estudantes.
    ${pergunta}
    
    Responda de forma clara, concisa e didática. 
    Se a pergunta não for relacionada a estudos, oriente gentilmente o usuário a fazer perguntas sobre conteúdos educacionais.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Erro ao gerar resposta:", error);
    throw error;
  }
};