
import { z } from 'zod';

// Esquema para la respuesta de la IA del análisis holístico
export const AnalysisResultSchema = z.object({
    perspectivaIntegral: z.object({
        tituloImpactante: z.string(),
        mensajeCentral: z.string(),
        simbolismoProfundo: z.string(),
    }),
    desglosePorDisciplinas: z.object({
        biodescodificacion: z.object({
            conflictoEmocional: z.string(),
            utilidadBiologica: z.string(),
        }),
        constelacionesFamiliares: z.object({
            implicanciaSistemica: z.string(),
            preguntaSanadora: z.string(),
        }),
        coachingYMentalHealing: z.object({
            creenciasLimitantes: z.array(z.string()), // Cambiado de z.string() a z.array(z.string())
            preguntasDeCoaching: z.array(z.string()),
            afirmacionEmpoderadora: z.string(),
        }),
        tarotSistemico: z.object({
            arquetipoPrincipal: z.string(),
            consejoDelTarot: z.string(),
        }),
    }),
    planDeAccionConsciente: z.object({
        pasosParaLaTomaDeConciencia: z.array(z.string()),
        recursosSugeridos: z.object({
            lecturas: z.array(z.string()),
            practicas: z.array(z.string()),
            profundizacion: z.array(z.string()),
        }),
    }),
});

// Tipo inferido de Zod para usar en los componentes de React
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
