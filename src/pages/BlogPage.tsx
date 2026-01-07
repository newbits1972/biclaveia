import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../articles/articleData';
import { Calendar, ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  // Ordenar artículos por fecha, del más nuevo al más antiguo
  const sortedArticles = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <title>Blog | SentIA</title>
      <meta name="description" content="Artículos y guías sobre Biodescodificación, el Proyecto Sentido, el Transgeneracional y el simbolismo de los síntomas." />
      <link rel="canonical" href="https://sentiaia.web.app/blog" />

      <div className="bg-gray-50/50">
        <header className="py-16 sm:py-20 text-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">Blog de SentIA</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Un espacio para profundizar en el lenguaje del cuerpo y el alma. Explora artículos sobre Biodescodificación, el Proyecto Sentido y mucho más.
            </p>
          </div>
        </header>

        <main className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {sortedArticles.map((article) => (
                <article key={article.slug} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
                  <header>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      <Link to={`/blog/${article.slug}`} className="hover:text-teal-600 transition-colors">
                        {article.title}
                      </Link>
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 mt-3">
                      <Calendar size={14} className="mr-2" />
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    </div>
                  </header>
                  <p className="mt-4 text-gray-600 text-lg leading-relaxed flex-grow">
                    {article.description}
                  </p>
                  <footer className="mt-6">
                    <Link to={`/blog/${article.slug}`} className="inline-flex items-center font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                      Leer más
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPage;