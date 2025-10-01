import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Heart, TrendingUp, Plus, BookOpen, Lightbulb, Target } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { db } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';

interface JournalEntry {
  id: string;
  text: string;
  createdAt: Timestamp;
}

const MyProgress = () => {
  const { user, isLoggedIn } = useAuth();
  const [isWriting, setIsWriting] = useState(false);
  const [newEntryText, setNewEntryText] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);

  // --- CONEXIÓN A FIRESTORE ---
  // Este efecto se ejecuta cuando el usuario está logueado y obtiene
  // las entradas del diario en tiempo real desde Firestore.
  useEffect(() => {
    if (!user) {
      setEntries([]);
      setLoadingEntries(false);
      return;
    };

    setLoadingEntries(true);
    const entriesCollection = collection(db, 'journalEntries');
    const q = query(
      entriesCollection, 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    // onSnapshot crea un listener en tiempo real.
    // Cada vez que los datos cambian en Firestore, esta función se ejecuta.
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userEntries: JournalEntry[] = [];
      querySnapshot.forEach((doc) => {
        userEntries.push({ id: doc.id, ...doc.data() } as JournalEntry);
      });
      setEntries(userEntries);
      setLoadingEntries(false);
    });

    // Limpia el listener cuando el componente se desmonta o el usuario cambia.
    return () => unsubscribe();
  }, [user]);

  if (!isLoggedIn) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold">Acceso Restringido</h1>
        <p className="mt-4 text-gray-600">Debes iniciar sesión para ver tu progreso.</p>
        <div className="mt-6">
          <Button to="/">Volver al Inicio</Button>
        </div>
      </div>
    );
  }

  const userMetrics = {
    entries: entries.length,
    sessions: 0, // Podrías calcular esto basado en las fechas de las entradas
    tracking: 0, // Lógica a implementar
  };
  
  const journalTips = [
    "Escribe regularmente, incluso si son solo unas líneas",
    "Sé honesto/a contigo mismo/a sobre tus emociones",
    "Observa patrones en tus conflictos y resentires",
    "Celebra los pequeños progresos y cambios positivos",
    "Usa esta información para crecer y evolucionar emocionalmente",
  ];

  const handleSaveEntry = async () => {
    if (!newEntryText.trim() || !user) return;

    try {
      // Añade un nuevo documento a la colección 'journalEntries'
      await addDoc(collection(db, 'journalEntries'), {
        userId: user.uid,
        text: newEntryText,
        createdAt: Timestamp.now(),
      });
      setNewEntryText('');
      setIsWriting(false);
    } catch (error) {
      console.error("Error al guardar la entrada:", error);
      alert("Hubo un error al guardar tu entrada. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="bg-gradient-page-background -mx-4 sm:-mx-6 lg:-mx-8 -my-8 md:-my-12 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue">Mi Progreso Personal</h1>
          <p className="mt-2 text-lg text-gray-500">Bienvenido/a, {user?.displayName}</p>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Lleva un registro de tu evolución emocional y reflexiones
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <Card className="flex items-center justify-center gap-4 py-6">
            <div className="p-3 rounded-full bg-purple-100">
              <Calendar className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-dark-blue">{userMetrics.entries}</p>
              <p className="text-sm text-gray-500">Entradas totales</p>
            </div>
          </Card>
          <Card className="flex items-center justify-center gap-4 py-6">
            <div className="p-3 rounded-full bg-pink-100">
              <Heart className="text-pink-500" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-dark-blue">{userMetrics.sessions}</p>
              <p className="text-sm text-gray-500">Sesiones trabajadas</p>
            </div>
          </Card>
          <Card className="flex items-center justify-center gap-4 py-6">
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-dark-blue">{userMetrics.tracking}</p>
              <p className="text-sm text-gray-500">Sesiones de seguimiento</p>
            </div>
          </Card>
        </section>

        <section className="text-center">
          {!isWriting && (
            <button
              onClick={() => setIsWriting(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus size={20} />
              Nueva Entrada del Diario
            </button>
          )}
        </section>

        <section>
          <Card className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-brand-purple" />
              <h2 className="text-xl font-semibold text-brand-dark-blue">Tu Diario Emocional</h2>
            </div>
            {isWriting ? (
              <div>
                <textarea
                  value={newEntryText}
                  onChange={(e) => setNewEntryText(e.target.value)}
                  placeholder="¿Qué sientes hoy? ¿Qué has descubierto sobre ti?"
                  className="w-full h-40 p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                ></textarea>
                <div className="flex justify-end gap-4 mt-4">
                   <button onClick={() => { setIsWriting(false); setNewEntryText(''); }} className="text-sm font-semibold text-gray-600 hover:text-gray-800">Cancelar</button>
                   <Button onClick={handleSaveEntry}>Guardar Entrada</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {loadingEntries ? (
                  <div className="text-center py-12 text-gray-500">Cargando entradas...</div>
                ) : entries.length > 0 ? (
                  entries.map(entry => (
                    <div key={entry.id} className="bg-gray-50 p-4 rounded-lg border">
                      <p className="text-sm text-gray-500 mb-2">{entry.createdAt.toDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-gray-700 whitespace-pre-wrap">{entry.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-700">Aún no tienes entradas</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Comienza tu diario emocional registrando tus reflexiones y evolución personal.
                    </p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </section>
        
        <section>
           <Card className="bg-green-50/70 border border-green-200">
            <div className="flex items-center gap-3">
              <Lightbulb className="text-green-600" size={24} />
              <h3 className="text-xl font-semibold text-green-800">Consejos para tu Diario Emocional</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {journalTips.map((tip, index) => (
                 <li key={index} className="flex items-start gap-3 text-gray-700">
                  <Target className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default MyProgress;
