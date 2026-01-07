import React, { useState, useEffect, ChangeEvent } from 'react';
import { Shield, Users, MessageSquare, Briefcase, PlusCircle, Loader2, Edit, Trash2, X, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { addProfessional, getProfessionals, updateProfessional, deleteProfessional, Professional, ProfessionalData } from '../services/professionalService';
import { uploadProfessionalImage, deleteProfessionalImage } from '../services/storageService';

// --- TIPOS Y ESTADOS INICIALES ---
type AdminTab = 'users' | 'queries' | 'professionals';

const initialFormState = {
  name: '', title: '', rating: '0', specialties: '', certifications: '', location: '',
  hours: '', imageUrl: '', whatsappUrl: '', emailUrl: '',
};

// --- COMPONENTES AUXILIARES ---
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; }
const InputField: React.FC<InputFieldProps> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input id={id} {...props} className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-brand-purple focus:border-brand-purple" />
  </div>
);

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { label: string; }
const TextareaField: React.FC<TextareaFieldProps> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea id={id} {...props} rows={3} className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-brand-purple focus:border-brand-purple" />
  </div>
);

// --- GESTOR DE PROFESIONALES (CRUD) ---
const ProfessionalsManager: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchProfessionals = async () => {
    try { setIsLoading(true); const data = await getProfessionals(); setProfessionals(data); } catch (err) { setError('No se pudieron cargar los profesionales.'); } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchProfessionals(); }, []);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      resetImageState();
    }
  };

  const resetImageState = () => {
    setImageFile(null);
    setImagePreview(null);
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleEditClick = (prof: Professional) => {
    handleCancelEdit();
    setEditingId(prof.id);
    setFormData({ ...initialFormState, ...prof, rating: String(prof.rating), specialties: prof.specialties.join(', '), certifications: prof.certifications.join(', ') });
    if (prof.imageUrl) setImagePreview(prof.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
    resetImageState();
    setFeedback(null);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
        const professionalToDelete = professionals.find(p => p.id === deletingId);
        await deleteProfessional(deletingId);
        if (professionalToDelete?.imageUrl) {
            await deleteProfessionalImage(professionalToDelete.imageUrl);
        }
        setFeedback({ type: 'success', message: 'Profesional eliminado.' });
        fetchProfessionals();
    } catch (err) {
        setFeedback({ type: 'error', message: 'Error al eliminar.' });
    } finally {
        setDeletingId(null);
        setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    try {
      let finalImageUrl = formData.imageUrl;
      if (imageFile) {
        setFeedback({ type: 'success', message: 'Subiendo imagen...' });
        finalImageUrl = await uploadProfessionalImage(imageFile);
      }
      const dataToSend: ProfessionalData = { ...formData, imageUrl: finalImageUrl, rating: parseFloat(formData.rating) || 0, specialties: formData.specialties.split(',').map(s => s.trim()).filter(Boolean), certifications: formData.certifications.split(',').map(c => c.trim()).filter(Boolean) };
      if (editingId) {
        await updateProfessional(editingId, dataToSend);
        setFeedback({ type: 'success', message: '¡Profesional actualizado!' });
      } else {
        await addProfessional(dataToSend);
        setFeedback({ type: 'success', message: '¡Profesional añadido!' });
      }
      fetchProfessionals();
      handleCancelEdit();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Ocurrió un error.';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div className="space-y-12">
      <section className="bg-white p-6 sm:p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{editingId ? 'Modificar Profesional' : 'Añadir Nuevo Profesional'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de Perfil</label>
                <div className="mt-1 flex justify-center items-center p-6 border-2 border-gray-300 border-dashed rounded-md h-full">
                  <div className="space-y-1 text-center">
                    {imagePreview ? <img src={imagePreview} alt="Previsualización" className="mx-auto h-32 w-32 object-cover rounded-full shadow-md" /> : <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="imageUpload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-purple hover:text-brand-dark-blue"><input id="imageUpload" type="file" accept="image/png, image/jpeg" className="sr-only" onChange={handleImageChange} /><span>{imagePreview ? 'Cambiar' : 'Subir imagen'}</span></label>
                    </div>
                    <p className="text-xs text-gray-500">PNG o JPG, max 2MB</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 content-start">
                  <div className="sm:col-span-2"><InputField id="name" label="Nombre" value={formData.name} onChange={handleFormChange} required /></div>
                  <div className="sm:col-span-2"><InputField id="title" label="Título" value={formData.title} onChange={handleFormChange} required /></div>
                  <InputField id="location" label="Ubicación" value={formData.location} onChange={handleFormChange} /><InputField id="hours" label="Horario" value={formData.hours} onChange={handleFormChange} />
                  <InputField id="rating" label="Rating (0-5)" type="number" min="0" max="5" step="0.1" value={formData.rating} onChange={handleFormChange} />
              </div>
            </div>
            <div><TextareaField id="specialties" label="Especialidades (separadas por coma)" value={formData.specialties} onChange={handleFormChange} /></div>
            <div><TextareaField id="certifications" label="Certificaciones (separadas por coma)" value={formData.certifications} onChange={handleFormChange} /></div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <InputField id="whatsappUrl" label="URL WhatsApp" value={formData.whatsappUrl} onChange={handleFormChange} placeholder="https://wa.me/..." />
                <InputField id="emailUrl" label="URL Email" value={formData.emailUrl} onChange={handleFormChange} placeholder="mailto:..." />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 w-48 bg-brand-purple text-white font-bold py-2 px-4 rounded-md hover:bg-brand-dark-blue disabled:bg-gray-400 transition-colors">
                  {isSubmitting ? <Loader2 className="animate-spin"/> : (editingId ? <Edit size={16}/> : <PlusCircle />)}
                  {isSubmitting ? 'Guardando...' : (editingId ? 'Guardar Cambios' : 'Añadir')}
              </button>
              {editingId && (
                  <button type="button" onClick={handleCancelEdit} className="flex items-center gap-2 text-gray-600 font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                      <X size={16} /> Cancelar
                  </button>
              )}
            </div>
            {feedback && <div className={`mt-4 p-3 rounded-md text-sm text-center ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{feedback.message}</div>}
        </form>
      </section>
      
      <section className="bg-white p-6 sm:p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Profesionales Actuales</h3>
        {isLoading && <div className="flex justify-center p-4"><Loader2 className="animate-spin h-8 w-8 text-brand-purple" /></div>}
        {error && <div className="text-red-600 p-4">{error}</div>}
        {!isLoading && !error && (
          <ul className="divide-y divide-gray-200">
            {professionals.map(prof => (
              <li key={prof.id} className="py-3 flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4 min-w-0">
                  <img className="h-12 w-12 rounded-full object-cover flex-shrink-0" src={prof.imageUrl || undefined} alt={prof.name} />
                  <div className="min-w-0"><p className="text-md font-bold text-gray-900 truncate">{prof.name}</p><p className="text-sm text-gray-500 truncate">{prof.title}</p></div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2">
                  <button onClick={() => handleEditClick(prof)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"><Edit size={18} /></button>
                  <button onClick={() => setDeletingId(prof.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"><Trash2 size={18} /></button>
                </div>
              </li>
            ))}
            {professionals.length === 0 && <p className='text-center text-gray-500 py-4'>No hay profesionales añadidos.</p>}
          </ul>
        )}
      </section>

      {deletingId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full animate-in fade-in-0 zoom-in-95">
            <div className="text-center"><AlertTriangle className="mx-auto h-12 w-12 text-red-500" /><h3 className="mt-2 text-xl font-bold text-gray-900">¿Eliminar Profesional?</h3><p className="mt-2 text-sm text-gray-500">Esta acción es irreversible.</p></div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={handleDelete} className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700">Sí, eliminar</button>
              <button onClick={() => setDeletingId(null)} className="bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('professionals');
  
  const renderTab = (tab: AdminTab, label: string, Icon: React.ElementType) => (
    <button onClick={() => setActiveTab(tab)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-brand-purple text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}><Icon size={16} />{label}</button>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8"><Shield className="text-brand-dark-blue" size={32} /><h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1></div>
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-8">
        {renderTab('users', 'Usuarios', Users)}
        {renderTab('queries', 'Consultas IA', MessageSquare)}
        {renderTab('professionals', 'Profesionales', Briefcase)}
      </div>
      <div>
        {activeTab === 'professionals' ? <ProfessionalsManager /> : <div className="bg-white p-8 rounded-lg shadow-sm"><p className="text-gray-500 text-center">Contenido de {activeTab} no implementado.</p></div>}
      </div>
    </div>
  );
};

export default Admin;
