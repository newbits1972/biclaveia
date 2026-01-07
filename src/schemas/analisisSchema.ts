import { z } from 'zod';

// Esquema para la respuesta del análisis de biodescodificación
export const BiodescodificacionSchema = z.object({
  hipotesisConflicto: z.string().min(20, "La hipótesis debe tener al menos 20 caracteres."),
  preguntasReflexion: z.array(z.string().min(10, "Cada pregunta debe tener al menos 10 caracteres.")).min(2, "Debe haber al menos 2 preguntas de reflexión."),
  perspectivaAprendizaje: z.string().min(20, "La perspectiva de aprendizaje debe tener al menos 20 caracteres."),
});

// Esquema para la respuesta del análisis emocional completo
export const AnalisisEmocionalSchema = z.object({
  patronesRecurrentes: z.string().min(20, "El texto de patrones recurrentes debe ser más descriptivo."),
  conexionTransgeneracional: z.string().min(20, "El texto de conexión transgeneracional debe ser más detallado."),
  narrativaSanacion: z.string().min(20, "La narrativa de sanación debe ser más elaborada."),
  afirmacionPositiva: z.string().min(10, "La afirmación debe tener al menos 10 caracteres."),
});

// Esquema para un único análisis guardado en el historial
export const AnalisisGuardadoSchema = z.object({
  id: z.string(),
  fecha: z.string(),
  sintoma: z.string(),
  problema: z.string(),
  emocion: z.string(),
  resultado: BiodescodificacionSchema,
});

// Esquema para el historial completo de análisis del usuario
export const HistorialAnalisisSchema = z.object({
  analisis: z.array(AnalisisGuardadoSchema),
});

// Esquema para una única carta de Tarot en una tirada
export const CartaTarotSchema = z.object({
  nombre: z.string().min(3, "El nombre de la carta debe ser válido."),
  posicion: z.enum(["Pasado", "Presente", "Futuro"]),
  significado: z.string().min(30, "El significado debe ser una explicación detallada."),
  // Opcional: podrías añadir un campo para el arquetipo o imagen si lo necesitas
  // arquetipo: z.string().optional(),
});

// Esquema para la respuesta completa de una tirada de Tarot de 3 cartas
export const TiradaTarotSchema = z.object({
  cartas: z.tuple([CartaTarotSchema, CartaTarotSchema, CartaTarotSchema]),
  conclusionGeneral: z.string().min(50, "La conclusión debe ser un resumen profundo y útil."),
});
