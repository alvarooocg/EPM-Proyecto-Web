# El Planeta de las Emociones

Aplicación web interactiva para la Educación Infantil enfocada en el reconocimiento y gestión de emociones.

## Decisiones de UX/UI y Accesibilidad (Revisión IPO)

Este proyecto ha sido refactorizado y diseñado teniendo en cuenta las mejores prácticas de Interacción Persona-Ordenador (IPO) enfocadas a un público muy específico: **niños pre-lectores (3-6 años) acompañados de un tutor o docente**.

### 1. Rol de la Estrella Guía (Avatar)
- **Problema Inicial**: El personaje de apoyo tenía fondos circulares o decorativos que lo asemejaban a los planetas/botones de navegación interactivos.
- **Solución UX**: Se eliminaron los contenedores sólidos. La Estrella Guía ahora flota en la interfaz usando `drop-shadow` para ganar volumen, posicionada fijamente en la esquina inferior derecha. Esto la define visualmente como un **asistente u observador**, reduciendo la carga cognitiva y evitando que los niños confundan una ayuda con un objetivo.

### 2. Consistencia en Navegación (Mental Model)
- **Problema Inicial**: Existía una inconsistencia en la ubicación y los iconos utilizados para retroceder o volver al inicio.
- **Solución UX**: Se implementó un componente `NavigationButton` universal, anclado rígidamente en la esquina superior izquierda (`fixed top-4 left-4 z-50`). Al establecer un patrón posicional constante e inmune al scroll, se ayuda a que el niño (y el tutor) construyan un modelo mental seguro: "arriba a la izquierda es siempre la salida".

### 3. Jerarquía Visual: Instrucciones vs. Actividades
- **Problema Inicial**: Mezcla visual entre el texto dirigido al tutor y las tarjetas de juego para el niño.
- **Solución UX**: Contraste jerárquico extremo. Las instrucciones para el tutor se agrupan en contenedores visualmente discretos (texto más pequeño, fondos neutros translúcidos y marcados con un icono de información). Por el contrario, los minijuegos ocupan el centro de la pantalla con tarjetas grandes, fondos brillantes y alto énfasis visual (imágenes y emojis), minimizando el texto.

### 4. Indicadores de Progreso
- **Problema Inicial**: Falta de *feedback* sobre los hitos alcanzados por el usuario.
- **Solución UX**: Se estableció un sistema visual de "completado" en los menús de selección de actividades mediante un estado booleano "isCompleted" que se evalúa en el renderizado para darles clases específicas. Cuando una actividad se marca como completada, su tarjeta adquiere un borde verde prominente, disminuye levemente su opacidad y recibe un icono (✅ o 🥇). Esto permite al usuario, de un simple vistazo, saber dónde ha estado y qué le falta por explorar.

### 5. Accesibilidad para Pre-lectores (Audio)
- **Problema Inicial**: Dependencia excesiva del texto en pantalla para guiar la actividad en un entorno de pre-lectores.
- **Solución UX**:
  - **Instrucciones audibles**: Se incorporaron botones grandes y amigables con el icono de un altavoz (🔊) junto a todos los enunciados importantes y actividades. Estos simulan la verbalización de las instrucciones por parte de la Estrella Guía.
  - **Atmósfera**: Se introdujo un botón de control global de música ambiental en la esquina superior derecha ligado a un contexto de estado general, permitiendo al tutor establecer un clima sonoro adecuado (motivador o relajante) sin interferir con la navegación del niño.

---

## Ejecución

1. Clona el repositorio.
2. Instala las dependencias: \`npm install\`
3. Levanta el servidor de desarrollo: \`npm run dev\`
