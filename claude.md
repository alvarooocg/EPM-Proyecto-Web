# Contexto del Proyecto: El Planeta de las Emociones

## 🎯 Propósito General
Aplicación web interactiva dirigida a niños de 3 a 6 años para el desarrollo de la inteligencia emocional. El diseño debe ser 100% visual, intuitivo y adaptado a usuarios pre-lectores.

## 🛠️ Stack Tecnológico
- **Frontend:** React.js.
- **Estilos:** TailwindCSS.
- **Backend:** Node.js con Express.
- **Base de Datos:** MongoDB.

## 🏗️ Arquitectura y Reglas UX/UI (CRÍTICO)
- **Personaje Guía (Estrella):** Su estado (presencia, animaciones y respuestas de audio) debe gestionarse mediante un estado global para que sea persistente y contextual en todas las vistas.
- **Interfaz Infantil:** - Prohibido depender de texto para la navegación; usa siempre pictogramas y navegación por colores.
  - Los elementos interactivos deben estar sobredimensionados para adaptarse a la motricidad infantil.
  - Toda interacción debe tener feedback visual o sonoro inmediato.

## 🧩 Reglas por Módulo
- **Planeta 1 (Me conozco):** Para la actividad "La maleta", usa librerías de Drag and Drop compatibles con eventos táctiles. Para "El espejo mágico", renderiza condicionalmente clases de Tailwind para cambiar fondos y sprites.
- **Planeta 2 (Relaciones):** Desarrolla componentes de branching (toma de decisiones) que disparen secuencias animadas según la elección del usuario.
- **Planeta 3 (Me relajo):** Prohibidas las animaciones bruscas o sobreestimulantes. Usa `easing functions` atenuadas, partículas lentas y sincroniza estrictamente los temporizadores de React con las pistas de audio para los ejercicios de respiración.

## 👨‍💻 Normas de Desarrollo para Claude
- **Idioma:** Háblame siempre en español, pero escribe el código, variables y commits en inglés.
- **Componentes:** Usa Functional Components y Hooks.
- **Librerías:** Antes de instalar nuevas dependencias de animación (ej. Framer Motion, dnd-kit) o manejo de estado global (ej. Zustand, Redux), consúltame para evaluar el peso en el bundle.
- **Commits:** Usa siempre el estándar de Conventional Commits.