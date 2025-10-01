import { Shield, Users, MessageSquare, Briefcase } from 'lucide-react';

const Admin = () => {
  // --- CONEXIÓN A BASE DE DATOS ---
  // Esta página es el punto de entrada para la administración del sitio.
  // Aquí se conectaría un servicio como Supabase o Firebase para:
  // 1. Obtener la lista de usuarios.
  // 2. Ver un log de las consultas hechas a la IA (de forma anónima).
  // 3. Gestionar la lista de profesionales (añadir, editar, eliminar).
  //
  // La lógica de acceso a esta ruta estaría protegida en el backend o mediante
  // reglas de seguridad en la base de datos (ej. RLS en Supabase),
  // permitiendo el acceso solo a usuarios con el rol 'admin'.

  return (
    <div className="p-8 bg-gray-100 rounded-lg">
      <div className="flex items-center gap-4">
        <Shield className="text-brand-purple" size={32} />
        <h1 className="text-4xl font-bold text-brand-dark-blue">Panel de Administración</h1>
      </div>
      <p className="mt-2 text-gray-600">
        Este es el centro de control de BioClave. Desde aquí podrás gestionar el contenido y los usuarios de la aplicación.
      </p>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {/* Sección comentada: Gestión de Usuarios */}
        <div className="bg-white p-6 rounded-lg shadow-md opacity-50">
          <div className="flex items-center gap-3">
            <Users className="text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-500">Gestión de Usuarios</h2>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            (Próximamente) Ver, editar o eliminar perfiles de usuario.
          </p>
        </div>

        {/* Sección comentada: Gestión de Consultas */}
        <div className="bg-white p-6 rounded-lg shadow-md opacity-50">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-500">Gestión de Consultas IA</h2>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            (Próximamente) Monitorizar el uso de la IA y revisar logs de consultas.
          </p>
        </div>

        {/* Sección comentada: Gestión de Profesionales */}
        <div className="bg-white p-6 rounded-lg shadow-md opacity-50">
          <div className="flex items-center gap-3">
            <Briefcase className="text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-500">Gestión de Profesionales</h2>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            (Próximamente) Añadir, actualizar o eliminar perfiles de profesionales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
