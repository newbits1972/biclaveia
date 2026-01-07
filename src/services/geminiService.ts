
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { BiodescodificacionSchema, AnalisisEmocionalSchema, HistorialAnalisisSchema, TiradaTarotSchema } from "../schemas/analisisSchema";
import { AnalysisResultSchema, AnalysisResult } from "../schemas/analisisCompletoSchema";
import { z } from "zod";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("La clave de API de Gemini no está configurada. Por favor, añádela a tu archivo .env.local");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const generationConfig = {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 8192,
};

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

const JSON_PROMPT_RULES = `
REGLAS OBLIGATORIAS:
- Responde exclusivamente con un objeto JSON válido.
- No incluyas saltos de línea fuera de strings.
- No incluyas comentarios.
- No incluyas markdown (ej. \`\`\`json).
- No incluyas texto antes ni después del JSON.
- Usa comillas dobles estándar (").
- Si no puedes cumplir exactamente la estructura, devuelve un JSON con un campo "error" que describa el problema.
`;

async function generateContentWithGemini<T extends z.ZodTypeAny>(prompt: string, schema: T): Promise<z.infer<T>> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig, safetySettings });

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const candidate = response.candidates?.[0];
        const parts = candidate?.content?.parts;

        if (!parts || !parts[0]?.text) {
            throw new Error("Gemini no devolvió contenido de texto válido.");
        }

        const rawText = parts[0].text.trim();
        const jsonText = rawText.replace(/```json|```/g, "").trim();

        try {
            const parsedJson = JSON.parse(jsonText);
            return schema.parse(parsedJson);
        } catch (e) {
            console.error("JSON inválido devuelto por Gemini tras sanitizar:", jsonText);
            throw new Error(`La IA devolvió un JSON malformado. Error: ${e instanceof Error ? e.message : String(e)}`);
        }
    } catch (error) {
        console.error("Error en la llamada a generateContent:", error);
        throw error;
    }
}


// --- Funciones de Análisis ---

export const analizarSintoma = (sintoma: string, problema: string, emocion: string) => {
    const prompt = `
    Eres un experto en biodescodificación y análisis transgeneracional.
    Tu objetivo es analizar la información proporcionada por el usuario y ofrecer una interpretación basada en estas disciplinas.
    Información del Usuario:
    *   Síntoma/Enfermedad: ${sintoma}
    *   Problema/Situación actual: ${problema}
    *   Emoción persistente: ${emocion}
    Formato de Respuesta (JSON):
    {
      "hipotesisConflicto": "...",
      "preguntasReflexion": ["...", "...", "..."],
      "perspectivaAprendizaje": "..."
    }
    ${JSON_PROMPT_RULES}
    `;
    return generateContentWithGemini(prompt, BiodescodificacionSchema);
};

export const realizarAnalisisCompleto = (historial: z.infer<typeof HistorialAnalisisSchema>) => {
    const prompt = `
    Eres un asistente de IA especializado en biodescodificación y análisis de patrones emocionales.
    Analiza el siguiente historial de análisis de un usuario para identificar patrones, conexiones y ofrecer una visión más profunda.
    Historial del Usuario:
    ${JSON.stringify(historial.analisis, null, 2)}
    Formato de Respuesta (JSON):
    {
      "patronesRecurrentes": "...",
      "conexionTransgeneracional": "...",
      "narrativaSanacion": "...",
      "afirmacionPositiva": "..."
    }
    ${JSON_PROMPT_RULES}
    `;
    return generateContentWithGemini(prompt, AnalisisEmocionalSchema);
};

export const runFullAnalysis = (searchTerm: string): Promise<AnalysisResult> => {
    const prompt = `
    Eres una IA experta y mentora en múltiples disciplinas de sanación y autoconocimiento.
    Tu propósito es ofrecer un análisis holístico y profundo sobre la consulta de un usuario.
    Consulta del Usuario: "${searchTerm}"
    Instrucciones de Análisis y Estructura de Respuesta JSON:
    Analiza la consulta y responde SIEMPRE con el siguiente formato JSON. Sé profundo, sabio y empático.
    {
      "perspectivaIntegral": {
        "tituloImpactante": "Crea un título poético y revelador para el análisis.",
        "mensajeCentral": "Resume en 1-2 párrafos el núcleo del conflicto o situación, conectando el síntoma/emoción con su propósito evolutivo. ¿Qué lección fundamental hay aquí?",
        "simbolismoProfundo": "Explora el simbolismo del síntoma, órgano o situación. ¿Qué representa a un nivel más profundo o arquetípico?"
      },
      "desglosePorDisciplinas": {
        "biodescodificacion": {
          "conflictoEmocional": "Identifica el conflicto emocional raíz desde la biodescodificación (ej. 'Conflicto de desvalorización en el territorio').",
          "utilidadBiologica": "Explica la 'lógica' o 'utilidad' biológica del síntoma como una adaptación a ese conflicto."
        },
        "constelacionesFamiliares": {
          "implicanciaSistemica": "Plantea una hipótesis sobre cómo esta situación podría estar conectada con una dinámica o lealtad familiar inconsciente (ej. 'Reparación de un ancestro excluido', 'Lealtad a un destino difícil').",
          "preguntaSanadora": "Formula una pregunta poderosa y sanadora que el usuario pueda hacerse para tomar conciencia de la implicancia sistémica."
        },
        "coachingYMentalHealing": {
          "creenciasLimitantes": ["Identifica 1 o 2 creencias limitantes clave que podrían estar sosteniendo el problema."],
          "preguntasDeCoaching": ["Formula 2-3 preguntas de coaching ontológico, enfocadas en la posibilidad y el futuro.", "Evita preguntas que busquen el 'por qué' y enfócate en el 'para qué' o 'cómo'."],
          "afirmacionEmpoderadora": "Crea una afirmación positiva en primera persona, potente y que contrarreste la creencia limitante."
        },
        "tarotSistemico": {
          "arquetipoPrincipal": "Asocia la situación con un Arcano Mayor del Tarot que represente el arquetipo central del aprendizaje.",
          "consejoDelTarot": "Ofrece un consejo breve y sabio inspirado en la energía de ese arquetipo."
        }
      },
      "planDeAccionConsciente": {
        "pasosParaLaTomaDeConciencia": ["Define 2-3 pasos iniciales, claros y realizables que el usuario puede tomar.", "Estos deben ser ejercicios de introspección o pequeñas acciones simbólicas."],
        "recursosSugeridos": {
          "lecturas": ["Sugiere 1-2 títulos de libros relevantes (autor y título)."],
          "practicas": ["Sugiere 1-2 prácticas o terapias complementarias (ej. 'Meditación Mindfulness', 'Constelaciones Familiares', 'Terapia Gestalt')."],
          "profundizacion": ["Sugiere un tema o área para seguir investigando (ej. 'Explorar el árbol genealógico', 'Indagar sobre la herida de abandono')."]
        }
      }
    }
    ${JSON_PROMPT_RULES}
    `;
    return generateContentWithGemini(prompt, AnalysisResultSchema);
};

export const realizarTiradaTarot = (nombre: string, fechaNacimiento: string, pregunta: string, cartasSeleccionadas: string[]) => {
    const prompt = `
    Eres un tarotista experto, sabio y profundo, especializado en el Tarot de Marsella.
    Tu objetivo es realizar una tirada de Tarot evolutivo de tres cartas (Pasado, Presente, Futuro) para el consultante, basada en su pregunta o intención específica.
    Para que la lectura sea personalizada y precisa, utiliza la vibración del nombre y la fecha de nacimiento para sintonizar con la energía del usuario.

    Datos del Consultante:
    - Nombre: ${nombre}
    - Fecha de Nacimiento: ${fechaNacimiento}
    
    Consulta o Intención: "${pregunta}"

    EL USUARIO HA SELECCIONADO ESTAS TRES CARTAS ESPECÍFICAS (Arcanos Mayores del Tarot de Marsella):
    1. Pasado: ${cartasSeleccionadas[0]}
    2. Presente: ${cartasSeleccionadas[1]}
    3. Futuro: ${cartasSeleccionadas[2]}

    Instrucciones de la Tirada:
    1. Utiliza exclusivamente los 22 Arcanos Mayores del Tarot de Marsella para tu interpretación.
    2. Debes interpretar EXACTAMENTE las cartas seleccionadas por el usuario en las posiciones indicadas.
    3. Para cada carta, proporciona su nombre exacto, la posición y un significado profundo, conectándolo con los datos del consultante y su pregunta.
    4. Finaliza con una conclusión general que sintetice el mensaje de las tres cartas y ofrezca un consejo sabio y práctico para el usuario.

    Formato de Respuesta (JSON estricto):
    {
      "cartas": [
        { "nombre": "Nombre del Arcano", "posicion": "Pasado", "significado": "..." },
        { "nombre": "Nombre del Arcano", "posicion": "Presente", "significado": "..." },
        { "nombre": "Nombre del Arcano", "posicion": "Futuro", "significado": "..." }
      ],
      "conclusionGeneral": "..."
    }
    ${JSON_PROMPT_RULES}
    `;
    return generateContentWithGemini(prompt, TiradaTarotSchema);
};

export type { AnalysisResult };
