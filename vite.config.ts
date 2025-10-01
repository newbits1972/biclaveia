import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // FIX: Se actualiza la versión del SDK cargada desde el CDN a una más reciente.
      // La versión 0.12.0 apuntaba a una API 'v1beta' obsoleta.
      // Una versión más nueva se comunicará con la API estable correcta, resolviendo el error 404.
      '@google/generative-ai': 'https://esm.sh/@google/generative-ai@0.15.0'
    }
  }
});
