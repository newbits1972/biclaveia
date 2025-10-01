import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dictionary from './pages/Dictionary';
import MyProgress from './pages/MyProgress';
import Professionals from './pages/Professionals';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diccionario" element={<Dictionary />} />
            <Route path="/mi-progreso" element={<MyProgress />} />
            <Route path="/profesionales" element={<Professionals />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
