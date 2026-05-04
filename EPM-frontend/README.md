<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# El Planeta de las Emociones (EPM)

¡Bienvenidos a **El Planeta de las Emociones**! Este es un proyecto frontend diseñado especialmente para educadores y tutores que trabajan con niños pequeños.

El objetivo principal de esta aplicación es ofrecer una herramienta interactiva para que los niños, guiados por sus tutores, puedan explorar, identificar y gestionar sus emociones en diferentes escenarios: relación social, relajación y autoconocimiento.

## Enlace al proyecto desplegado
Puedes acceder a la versión desplegada y al proyecto de AI Studio en los siguientes enlaces:
- AI Studio: https://ai.studio/apps/aab9ba45-f957-4ad0-9f10-57deedd6d238
*(Añadir aquí el enlace público del despliegue si existe en el repositorio original)*

## Objetivos del Proyecto

- **Autoconocimiento:** Ayudar a los niños a identificar cómo se sienten mediante representaciones visuales e interactivas.
- **Relajación:** Proveer ejercicios e interacciones que asistan en la regulación emocional.
- **Relación:** Facilitar el entendimiento de las interacciones sociales y la empatía.
- **Accesibilidad:** Interfaz diseñada pensando en pre-lectores, con soporte de audio global, botones grandes e íconos intuitivos para facilitar su uso.

## Instrucciones de Uso

1. **Acceso:** Al abrir la aplicación, te encontrarás con una pantalla de acceso (`PasswordScreen`) para restringir el uso a personal autorizado.
2. **Contraseña de Acceso:** Para ingresar a las funciones principales y usar la aplicación, utiliza la contraseña por defecto:
   **`epm2026`**
3. **Navegación:** Una vez dentro, los tutores pueden guiar a los niños a través de diferentes pantallas interactivas (como Relación, Me Relajo, Me Conozco) usando los controles de navegación. El Avatar Guía está siempre disponible en pantalla para ayudar con instrucciones visuales y auditivas.

## Ejecutar Localmente

**Requisitos previos:** Node.js

Para levantar el proyecto en tu entorno de desarrollo local, sigue estos pasos:

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Si requieres uso de APIs externas, configura tu clave `GEMINI_API_KEY` en un archivo `.env.local` basado en el `.env.example`.
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en la URL indicada por la terminal (por defecto [http://localhost:3000](http://localhost:3000)).

---
*Este proyecto está construido con React, Vite, Tailwind CSS y TypeScript.*
