import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";

// Obtén tu API key desde las variables de entorno
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY no está definida en el archivo .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Define la estructura esperada de la respuesta de la IA
export interface AnalysisResult {
  conflicto: string;
  resentir: string;
  expertos: {
    "Louise Hay": string;
    "Dr. Hamer": string;
    "Enric Corbera": string;
  };
  recomendaciones: string;
  cromoterapia: string;
}

// Función para ejecutar el análisis con Gemini
export const runGeminiAnalysis = async (symptom: string): Promise<AnalysisResult> => {
  // FIX: Con el SDK actualizado a través del CDN, volvemos a usar el nombre de modelo estándar 'gemini-pro'.
  // Esto asegura que apuntamos al modelo correcto en la API estable.
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const generationConfig: GenerationConfig = {
    temperature: 0.5,
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
  };

  const prompt = `
    Eres un experto en Biodescodificación, entrenado en las metodologías de Joan Marc Vilanova, Louise Hay, Dr. Hamer y Enric Corbera. Tu propósito es analizar síntomas físicos o situaciones emocionales para encontrar su conflicto emocional subyacente.

    Analiza el siguiente síntoma: "${symptom}".

    Proporciona tu análisis en un formato JSON estricto, sin ningún texto introductorio ni formato markdown. El objeto JSON debe tener exactamente las siguientes claves: "conflicto", "resentir", "expertos" (un objeto con claves "Louise Hay", "Dr. Hamer", "Enric Corbera"), "recomendaciones", "cromoterapia".

    Ejemplo de estructura para "dolor de garganta":
    {
      "conflicto": "Conflicto relacionado con algo que no se puede o no se quiere expresar, o algo que se fue forzado a 'tragar'. Miedo a hablar o decir la verdad.",
      "resentir": "'Quiero decir algo pero no puedo', 'Me trago mis palabras', 'Me obligan a aceptar algo que no quiero'.",
      "expertos": {
        "Louise Hay": "Causa probable: Incapacidad de hacerse valer. Ira reprimida. Creatividad sofocada. Negativa a cambiar. Afirmación: 'Hago ruido con alegría. Expreso mi ser libremente.'",
        "Dr. Hamer": "Conflicto de 'no poder atrapar el bocado' (no poder hablar o expresarse para conseguir algo) o 'querer escupir el bocado' (querer deshacerse de algo que se dijo o se aceptó).",
        "Enric Corbera": "Relacionado con la comunicación y la expresión. Puede indicar un desacuerdo entre lo que se piensa, se siente y se dice."
      },
      "recomendaciones": "Practicar la comunicación asertiva. Escribir en un diario lo que no te atreves a decir. Cantar o usar la voz creativamente. Identificar qué situación o persona te está haciendo 'tragar' tus palabras y establecer límites.",
      "cromoterapia": "El color azul claro (turquesa) en la zona de la garganta puede ayudar a desbloquear la comunicación y fomentar la expresión sincera y calmada."
    }
  `;

  try {
    const result = await model.generateContent(prompt, generationConfig);
    const response = result.response;
    const text = response.text();
    
    // La respuesta de la API ya debería ser un JSON válido gracias a `responseMimeType`
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Error en la llamada a la API de Gemini:", error);
    throw new Error("No se pudo obtener una respuesta de la IA. Por favor, verifica tu clave de API o inténtalo más tarde.");
  }
};
