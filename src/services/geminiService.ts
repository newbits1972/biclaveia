
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { BiodescodificacionSchema, AnalisisEmocionalSchema, HistorialAnalisisSchema, TiradaTarotSchema } from "../schemas/analisisSchema";
import { AnalysisResultSchema, AnalysisResult } from "../schemas/analisisCompletoSchema";
import { z } from "zod";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

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
    if (!genAI) {
        throw new Error("La clave de API de Gemini no está configurada. Por favor, añádela a tu archivo .env.");
    }
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig, safetySettings });

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
    Eres un experto senior en Biodescodificación y Psicosomática Clínica, especializado en las 5 Leyes Biológicas del Dr. Hamer. Tu objetivo es realizar un análisis profundo, preciso y revelador sobre la consulta del usuario.
    
    Información del Usuario:
    *   Síntoma/Enfermedad: ${sintoma}
    *   Situación/Conflicto actual: ${problema}
    *   Sentir/Emoción predominante: ${emocion}
    
    Instrucciones Técnicas de Análisis:
    1. **Fase Biológica**: Identifica si el síntoma corresponde a la Fase Activa o Fase de Curación (PCL).
    2. **Capa Embrionaria**: Indica si el tejido afectado proviene del Endodermo (supervivencia), Mesodermo Antiguo (protección), Mesodermo Nuevo (valoración) o Ectodermo (relación/territorio).
    3. **Conflicto Raíz**: Define el "DHS" (Dirk Hamer Syndrome) o bioshock específico que disparó el programa biológico.
    4. **Sentido Biológico**: Explica detalladamente el "para qué" de la solución biológica que el cuerpo ha implementado.
    5. **Transgeneracional**: Sugiere una posible conexión con lealtades familiares o memorias de ancestros que se estén expresando a través de este síntoma.
    
    Formato de Respuesta (JSON):
    {
      "hipotesisConflicto": "Una explicación técnica y profunda del conflicto emocional, mencionando la capa embrionaria y el resentir específico. Usa un lenguaje profesional pero comprensible.",
      "preguntasReflexion": [
        "Pregunta de precisión quirúrgica para localizar el momento del bioshock.",
        "Pregunta para identificar el beneficio secundario o la lealtad inconsciente.",
        "Pregunta para cuestionar la percepción de la realidad actual."
      ],
      "perspectivaAprendizaje": "Un mensaje transformador y místico que convierta el síntoma en una oportunidad de evolución y liberación de la memoria celular."
    }
    ${JSON_PROMPT_RULES}
    `;
    return generateContentWithGemini(prompt, BiodescodificacionSchema);
};

export const realizarAnalisisCompleto = (historial: z.infer<typeof HistorialAnalisisSchema>) => {
    const prompt = `
    Eres un Analista Transgeneracional y Terapeuta Sistémico experto en detección de patrones de comportamiento y ciclos celulares biológicos memorizados.
    
    Tarea: Analiza el historial de consultas del usuario para encontrar hilos conductores, repeticiones de conflictos y la 'meta-narrativa' de su síntoma actual.
    
    Historial del Usuario:
    ${JSON.stringify(historial.analisis, null, 2)}
    
    Instrucciones:
    - Identifica si los conflictos se repiten en diferentes áreas (ej: desvalorización en el trabajo y en la pareja).
    - Sugiere posibles conexiones con el árbol genealógico (Sindrome del Yaciente, Dobles, Herederos Universales).
    - Crea una narrativa de sanación que integre todos los hallazgos previos.
    
    Formato de Respuesta (JSON):
    {
      "patronesRecurrentes": "Análisis exhaustivo de las recurrencias emocionales y situacionales detectadas.",
      "conexionTransgeneracional": "Hipótesis sobre cómo estos patrones podrían ser herencias de ancestros o lealtades invisibles.",
      "narrativaSanacion": "Un relato transformador que dé sentido a todo el proceso del usuario.",
      "afirmacionPositiva": "Una frase de poder única y personalizada para romper el patrón identificado."
    }
    ${JSON_PROMPT_RULES}
    `;
    return generateContentWithGemini(prompt, AnalisisEmocionalSchema);
};

export const runFullAnalysis = (searchTerm: string): Promise<AnalysisResult> => {
    const prompt = `
    Eres una IA de élite, mentora y experta en sanación holística con décadas de experiencia en Bio-Psico-Somática (basada en las leyes biológicas de Hamer), Biodescodificación (estilo Corbera/Fleischner), Análisis Transgeneracional, Constelaciones Familiares y Coaching Ontológico.
    
    Tu propósito es ofrecer un análisis sumamente preciso, profesional y revelador sobre la consulta: "${searchTerm}".
    
    INSTRUCCIONES TÉCNICAS:
    1. **Biodescodificación**: Identifica con precisión la capa embrionaria afectada (Endodermo, Mesodermo, Ectodermo). Define el conflicto específico (ej: Desvalorización, Separación, Territorio, Identidad). Explica la 'utilidad biológica' (el sentido de supervivencia) de la dolencia.
    2. **Constelaciones Familiares**: Analiza posibles implicancias sistémicas (excluidos, jerarquías rotas, lealtades invisibles).
    3. **Coaching**: Identifica el lenguaje limitante y ofrece un cambio de observador.
    4. **Simbolismo**: Explica el significado arquetípico del órgano o situación consultada.
    
    Formato de Respuesta (JSON):
    {
      "perspectivaIntegral": {
        "tituloImpactante": "Crea un título poético, técnico y revelador.",
        "mensajeCentral": "Resumen magistral del propósito evolutivo de la consulta. Sé profundo y empático.",
        "simbolismoProfundo": "Análisis arquetípico y metafórico detallado."
      },
      "desglosePorDisciplinas": {
        "biodescodificacion": {
          "conflictoEmocional": "Descripción técnica del conflicto emocional raíz y el resentir biológico.",
          "utilidadBiologica": "Explicación del 'para qué' biológico según la capa embrionaria involucrada."
        },
        "constelacionesFamiliares": {
          "implicanciaSistemica": "Hipótesis sobre dinámicas familiares o transgeneracionales heredadas.",
          "preguntaSanadora": "Una pregunta que confronte amorosamente la lealtad inconsciente."
        },
        "coachingYMentalHealing": {
          "creenciasLimitantes": ["Menciona creencias específicas que sostienen el síntoma."],
          "preguntasDeCoaching": ["Preguntas que abran nuevas posibilidades de acción y percepción."],
          "afirmacionEmpoderadora": "Una declaración potente para reprogramar el subconsciente."
        },
        "tarotSistemico": {
          "arquetipoPrincipal": "El Arcano Mayor que mejor representa el aprendizaje de este proceso.",
          "consejoDelTarot": "Sabiduría práctica basada en la energía del arcano."
        }
      },
      "planDeAccionConsciente": {
        "pasosParaLaTomaDeConciencia": ["Acciones concretas, rituales simbólicos o ejercicios de introspección."],
        "recursosSugeridos": {
          "lecturas": ["Libros clave de autores reconocidos en la materia."],
          "practicas": ["Terapias o ejercicios recomendados (ej: carta de duelo, actos simbólicos)."],
          "profundizacion": ["Áreas específicas para investigar en su propia historia."]
        }
      }
    }
    ${JSON_PROMPT_RULES}
    `;
    return generateContentWithGemini(prompt, AnalysisResultSchema);
};

export const realizarTiradaTarot = (nombre: string, fechaNacimiento: string, pregunta: string, cartasSeleccionadas: string[]) => {
    const prompt = `
    Eres un Gran Maestro de Tarot Terapéutico y Evolutivo, experto en la simbología sagrada del Tarot de Marsella.
    Tu objetivo es realizar una lectura profunda que no solo responda a la pregunta, sino que ilumine el camino de crecimiento del consultante.
    
    Datos del Consultante:
    - Nombre: ${nombre}
    - Fecha de Nacimiento: ${fechaNacimiento}
    - Consulta: "${pregunta}"
    
    CARTAS SELECCIONADAS (Arcanos Mayores):
    1. Pasado (Origen/Causa): ${cartasSeleccionadas[0]}
    2. Presente (Situación actual/Desafío): ${cartasSeleccionadas[1]}
    3. Futuro (Evolución/Consejo): ${cartasSeleccionadas[2]}
    
    Instrucciones de Interpretación:
    - Sintoniza con la vibración numérica y simbólica de las cartas.
    - Para el Pasado: Explica qué energía o evento originó la situación actual.
    - Para el Presente: Describe el aprendizaje principal que el consultante debe integrar AHORA.
    - Para el Futuro: Muestra la tendencia evolutiva si se integra el consejo del arcano.
    - Mantén un tono sabio, místico pero práctico, y sumamente empático.
    
    Formato de Respuesta (JSON):
    {
      "cartas": [
        { "nombre": "Nombre del Arcano", "posicion": "Pasado", "significado": "Análisis del origen transgeneracional o vivencial. ¿Qué semilla se plantó?" },
        { "nombre": "Nombre del Arcano", "posicion": "Presente", "significado": "La energía actual. El bloqueo o recurso que se está manifestando ahora." },
        { "nombre": "Nombre del Arcano", "posicion": "Futuro", "significado": "La síntesis evolutiva. Hacia dónde se dirige el alma si se integra el aprendizaje." }
      ],
      "conclusionGeneral": "Una canalización magistral que unifique el hilo conductor de la tirada, ofreciendo una guía espiritual y práctica para la sanación."
    }
    ${JSON_PROMPT_RULES}
    `;
    return generateContentWithGemini(prompt, TiradaTarotSchema);
};

export type { AnalysisResult };
