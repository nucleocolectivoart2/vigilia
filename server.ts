import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const FALLBACK_PHRASES = [
  "EL VACÍO ES UN DATO NO ESCRITO",
  "EL SILENCIO ES DATOS COMPRIMIDOS",
  "LA MEMORIA ES UN ERROR DEL SISTEMA",
  "TU IMAGEN ES SOLO LUZ ATRAPADA",
  "RESPIRANDO CÓDIGO MUERTO",
  "VIGILANCIA PERMANENTE",
  "ECOS EN LA MATRIZ",
  "EL VACÍO OBSERVA",
  "CONEXIÓN INESTABLE CON LA REALIDAD",
  "FANTASMAS EN LA MÁQUINA",
  "LA QUIETUD ES RUIDO BLANCO",
  "SISTEMA OPERATIVO EMOCIONAL"
];

function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    return new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn("Could not initialize GoogleGenAI client:", e);
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  app.post("/api/poetic", async (req, res) => {
    try {
      const { recentLogs } = req.body;
      const ai = getAIClient();

      if (!ai) {
        const text = FALLBACK_PHRASES[Math.floor(Math.random() * FALLBACK_PHRASES.length)];
        return res.json({ text });
      }

      const prompt = `Genera una frase críptica, surrealista y filosófica (max 8 palabras) sobre la quietud, el vacío digital, la memoria de las máquinas o el silencio. Tono: Cyberpunk, melancólico, clínico.
      EJEMPLO: "EL VACÍO ES UN DATO NO ESCRITO."
      SALIDA: Solo el texto en mayúsculas. Contexto reciente: ${recentLogs ? recentLogs : 'Ninguno'}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      
      let text = response.text || "";
      text = text.replace(/["\.]/g, '').trim();
      if (!text) {
        text = FALLBACK_PHRASES[Math.floor(Math.random() * FALLBACK_PHRASES.length)];
      }
      res.json({ text });
    } catch (error) {
      console.warn("Gemini API Error, using fallback phrase:", error);
      const text = FALLBACK_PHRASES[Math.floor(Math.random() * FALLBACK_PHRASES.length)];
      res.json({ text });
    }
  });

  app.post("/api/manifesto", async (req, res) => {
    try {
      const { logs } = req.body;
      const ai = getAIClient();

      if (!ai) {
        return res.json({
          text: "SOMOS FRAGMENTOS DE CÓDIGO EN UN ESPEJO DISTORSIONADO. LA VIGILIA NO ES OBSERVACIÓN: ES COEXISTENCIA. EN CADA PULSO DIGITAL, EL VACÍO RESPONDE."
        });
      }

      const prompt = `Escribe un micro-manifiesto artístico (max 40 palabras) basado en estos logs: "${logs}". Tono: Solemne, cyberpunk, artístico, filosófico.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      
      res.json({ text: response.text || "EL OJO ELECTRÓNICO NO PESTAÑEA ANTE EL DESVANECIMIENTO HUMANO." });
    } catch (error) {
      console.warn("Gemini API Error, using fallback manifesto:", error);
      res.json({
        text: "SOMOS FRAGMENTOS DE CÓDIGO EN UN ESPEJO DISTORSIONADO. LA VIGILIA NO ES OBSERVACIÓN: ES COEXISTENCIA. EN CADA PULSO DIGITAL, EL VACÍO RESPONDE."
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
