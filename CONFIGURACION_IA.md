# Configuración del Análisis IA con Google Gemini

## 🤖 ¿Qué es el Análisis IA?

El nuevo servicio de **Análisis IA** permite consultar sobre cualquier síntoma o dolencia a un experto virtual en biodescodificación basado en Joan Marc Vilanova i Pujó. La IA proporciona análisis completos que incluyen:

- **Conflictos emocionales** relacionados con la dolencia
- **Resentires biológicos** específicos
- **Perspectivas de múltiples expertos** (Louise Hay, Dr. Hamer, Enric Corbera, etc.)
- **Programas biológicos** de supervivencia
- **Recomendaciones de sanación** y cromoterapia
- **Sugerencias de búsqueda** inteligentes

## 🔧 Configuración Requerida

### Paso 1: Obtener API Key de Google Gemini

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia la API key generada

### Paso 2: Configurar Variables de Entorno

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Abre el archivo `.env` y reemplaza el placeholder con tu API key:
   ```bash
   VITE_GEMINI_API_KEY=tu_api_key_real_aqui
   ```

### Paso 3: Reiniciar el Servidor de Desarrollo

```bash
npm run dev
```

## 🎯 Funcionalidades del Análisis IA

### Análisis Completo
- Descripción médica de la dolencia
- Conflicto emocional principal
- Resentir biológico (en primera persona)
- Programa y utilidad biológica
- Fase del conflicto

### Múltiples Perspectivas
- **Louise L. Hay**: Causas metafísicas y afirmaciones sanadoras
- **Dr. Hamer**: Leyes biológicas de la Nueva Medicina Germánica
- **Enric Corbera**: Enfoque de bioneuroemoción
- **Lise Bourbeau**: Bloqueos físicos, emocionales, mentales y espirituales
- **Otros expertos**: Jacques Martel, Salomon Sellam, Claude Sabbah

### Información Complementaria
- Cromoterapia con colores específicos
- Información sobre lateralidad
- Conexiones transgeneracionales
- Proyecto sentido
- Ciclos biológicos
- Palabras clave para búsquedas

### Sugerencias Inteligentes
- El sistema sugiere dolencias relacionadas mientras escribes
- Búsqueda predictiva basada en síntomas
- Recomendaciones de términos de búsqueda

## 🔒 Seguridad y Privacidad

- Las consultas se procesan de forma segura a través de Google Gemini
- No se almacenan datos personales
- La API key se mantiene del lado del cliente
- Todas las comunicaciones están encriptadas

## 💡 Cómo Usar el Análisis IA

1. **Navega** a la sección "Análisis IA" en el menú
2. **Describe** tu síntoma o dolencia en el campo de búsqueda
3. **Selecciona** una sugerencia o presiona Enter para buscar
4. **Revisa** el análisis completo generado por la IA
5. **Explora** las diferentes perspectivas y recomendaciones

## ⚠️ Importante

- Este análisis es una herramienta de **reflexión y autoconocimiento**
- **NO sustituye** el diagnóstico médico profesional
- Siempre consulta con profesionales de la salud para dolencias físicas
- La biodescodificación es un enfoque **complementario**

## 🛠️ Solución de Problemas

### Error: "API Key no configurada"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Confirma que la variable `VITE_GEMINI_API_KEY` está definida
- Reinicia el servidor de desarrollo

### Error: "Error en la API"
- Verifica que tu API key es válida
- Revisa que tienes créditos disponibles en Google AI Studio
- Comprueba tu conexión a internet

### No aparecen sugerencias
- Asegúrate de escribir al menos 3 caracteres
- Verifica que la API key está configurada correctamente
- Revisa la consola del navegador para errores

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa este documento completo
2. Verifica la configuración de tu API key
3. Consulta la consola del navegador para errores
4. Contacta soporte técnico si persisten los problemas

---

**¡Disfruta explorando la biodescodificación con IA! 🧠✨**
