import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug } from '../articles/articleData';
import NotFound from './NotFound';
import { Calendar, ArrowLeft } from 'lucide-react';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <NotFound />;
  }

  const ArticleContent = article.component;
  const canonicalUrl = `https://sentiaia.web.app/blog/${slug}`;

  return (
    <>
        <title>{`${article.title} | SentIA`}</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={canonicalUrl} />

        <div className="bg-white py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Botón de volver --- */}
                <div className="mb-8">
                    <Link to="/blog" className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors font-semibold">
                        <ArrowLeft size={18} className="mr-2" />
                        Volver a todos los artículos
                    </Link>
                </div>

                {/* --- Encabezado del Artículo --- */}
                <article className="max-w-4xl mx-auto">
                    <header>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex items-center text-md text-gray-500 mt-6">
                            <Calendar size={16} className="mr-2" />
                            <time dateTime={article.date}>
                                Publicado el {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </time>
                        </div>
                    </header>

                    <hr className="my-8 border-gray-200" />
                    
                    {/* --- Contenido del Artículo (Cargado dinámicamente) --- */}
                    <Suspense fallback={<div className="text-center py-10">Cargando artículo...</div>}>
                        <ArticleContent />
                    </Suspense>

                </article>
            </div>
        </div>
    </>
  );
};

export default ArticlePage;