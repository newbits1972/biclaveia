const admin = require('firebase-admin');

// --- IMPORTANTE: Configuración ---
// 1. Descarga tu clave de cuenta de servicio de Firebase.
// 2. Guarda el archivo JSON en la raíz como 'firebase-service-account.json'.
// 3. Añade 'firebase-service-account.json' a tu .gitignore.
const serviceAccount = require('./firebase-service-account.json');

// --- Inicialización de Firebase Admin ---
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {
  if (error.code === 'app/duplicate-app') {
    // Ignoramos el error si la app ya está inicializada (útil en entornos de desarrollo).
  } else {
    console.error('Error inicializando Firebase Admin:', error.message);
    process.exit(1);
  }
}

// --- Lógica para asignar el rol de administrador ---
const emailToMakeAdmin = process.argv[2];

if (!emailToMakeAdmin) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Por favor, proporciona un correo electrónico como argumento.');
  console.log('Uso: node set-admin-role.cjs tu-email@ejemplo.com');
  process.exit(1);
}

(async () => {
  try {
    console.log(`Buscando usuario con el correo: ${emailToMakeAdmin}...`);
    const user = await admin.auth().getUserByEmail(emailToMakeAdmin);

    console.log(`Usuario encontrado: ${user.uid}. Verificando sus permisos actuales...`);
    if (user.customClaims && user.customClaims.admin === true) {
      console.log('\x1b[33m%s\x1b[0m', `El usuario ${emailToMakeAdmin} ya es un administrador.`);
      process.exit(0);
    }

    console.log('Asignando el rol de administrador...');
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    console.log('\x1b[32m%s\x1b[0m', `¡Éxito! El usuario ${emailToMakeAdmin} ahora tiene permisos de administrador.`);
    console.log('Para que los cambios surtan efecto, el usuario debe CERRAR SESIÓN y volver a INICIAR SESIÓN.');

    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error('\x1b[31m%s\x1b[0m', `Error: No se encontró ningún usuario con el correo ${emailToMakeAdmin}.`);
    } else {
      console.error('\x1b[31m%s\x1b[0m', 'Ocurrió un error inesperado:', error.message);
    }
    process.exit(1);
  }
})();
