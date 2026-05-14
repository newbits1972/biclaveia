
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dictionary from './pages/Dictionary';
import MyProgress from './pages/MyProgress';
import Professionals from './pages/Professionals';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import TiradaTarot from './pages/TiradaTarot'; // <-- AÑADIDO
import { AuthProvider } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/diccionario" element={<Dictionary />} />
            <Route path="/profesionales" element={<Professionals />} />
            <Route path="/tarot" element={<TiradaTarot />} /> {/* <-- AÑADIDO */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />

            {/* Rutas Protegidas (Ejemplo: Mi Progreso necesita login) */}
            <Route path="/mi-progreso" element={<MyProgress />} />

            {/* Ruta de Administrador Protegida */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />

            {/* Ruta para Página no encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
