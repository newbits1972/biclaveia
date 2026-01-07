import React from 'react';

// Importamos los componentes de los artículos de forma dinámica
const IntroduccionBio = React.lazy(() => import('./introduccion-biodescodificacion'));
const ProyectoSentido = React.lazy(() => import('./proyecto-sentido-gestacional'));
const ElTransgeneracional = React.lazy(() => import('./el-transgeneracional'));
const SimbolismoSintomas = React.lazy(() => import('./simbolismo-de-los-sintomas'));
const CiclosBiologicos = React.lazy(() => import('./ciclos-biologicos-memorizados'));
const ProfesionReparacion = React.lazy(() => import('./profesion-como-reparacion'));

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  component: React.LazyExoticComponent<React.FC<{}>>;
}

export const articles: Article[] = [
  {
    slug: 'profesion-como-reparacion-transgeneracional',
    title: 'Tu Profesión como Reparación Transgeneracional',
    description: '¿Sabías que tu elección profesional puede ser un acto de lealtad a tu clan? Descubre si tu trabajo está reparando una historia de tus ancestros.',
    date: '2025-08-02',
    component: ProfesionReparacion,
  },
  {
    slug: 'ciclos-biologicos-celulares-memorizados',
    title: 'Ciclos Biológicos Memorizados: ¿Repites la Historia de tu Vida?',
    description: 'Descubre por qué ciertos eventos se repiten en tu vida a edades específicas y cómo los ciclos inconscientes marcan tu biografía y la de tu familia.',
    date: '2025-08-01',
    component: CiclosBiologicos,
  },
  {
    slug: 'simbolismo-de-los-sintomas',
    title: 'El Simbolismo de los Síntomas: Lo que tu Cuerpo te Quiere Decir',
    description: 'Aprende a descifrar los mensajes de tu cuerpo. Desde problemas de piel hasta dolores de rodilla, cada síntoma tiene una historia emocional que contar.',
    date: '2025-07-31',
    component: SimbolismoSintomas,
  },
  {
    slug: 'el-legado-transgeneracional',
    title: 'El Legado Transgeneracional: Cómo Sanar la Historia de tu Clan Familiar',
    description: 'Descubre cómo las lealtades invisibles y los secretos de tus ancestros pueden estar influyendo en tu vida actual y cómo puedes empezar a sanarlos.',
    date: '2025-07-30',
    component: ElTransgeneracional,
  },
  {
    slug: 'introduccion-a-la-biodescodificacion',
    title: 'Introducción a la Biodescodificación: El Vínculo entre Emociones y Síntomas',
    description: 'Descubre los principios fundamentales de la biodescodificación y cómo un "bioshock" emocional puede manifestarse en tu cuerpo como un síntoma.',
    date: '2025-07-29',
    component: IntroduccionBio,
  },
  {
    slug: 'que-es-el-proyecto-sentido-gestacional',
    title: '¿Qué es el Proyecto Sentido Gestacional y Cómo Influye en tu Vida?',
    description: 'Explora cómo las emociones y vivencias de tus padres durante tu gestación pueden estar moldeando tus patrones de vida y relaciones actuales.',
    date: '2025-07-28',
    component: ProyectoSentido,
  },
];

// Función para encontrar un artículo por su slug
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};