<div align="center">
  <img width="1200" height="475" alt="Banner El Planeta de las Emociones" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<div align="center">

# 🌟 El Planeta de las Emociones

**Aplicación web interactiva de inteligencia emocional para niños de 3 a 6 años**

[![Despliegue](https://img.shields.io/badge/Vercel-Desplegado-black?style=for-the-badge&logo=vercel)](https://epm-proyecto-web.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

🌐 **[Acceder a la aplicación →](https://epm-proyecto-web.vercel.app/)**

</div>

---

## ¿Qué es este proyecto?

**El Planeta de las Emociones** es una herramienta terapéutica y educativa diseñada para que niños de entre 3 y 6 años desarrollen su inteligencia emocional de forma lúdica, acompañados por un tutor o educador.

A través de un universo de tres planetas temáticos, el niño aprende a:

- **Identificar** sus propias emociones y ponerles nombre
- **Empatizar** con los demás y comprender cómo se sienten
- **Regular** sus emociones mediante técnicas de relajación y respiración guiada

La interfaz es **100 % visual**: sin dependencia del texto para navegar, con pictogramas sobredimensionados, colores contrastados y respuesta sonora inmediata en cada interacción. Estela, la estrella guía animada, acompaña al niño en todo momento con voz e instrucciones sencillas.

---

## 🎯 Objetivos pedagógicos

| Área | Descripción |
|------|-------------|
| **Autoconocimiento** | El niño aprende a identificar y nombrar lo que siente mediante representaciones visuales interactivas. |
| **Empatía social** | Desarrolla la capacidad de leer las emociones de los demás y tomar decisiones prosociales. |
| **Regulación emocional** | Practica técnicas de calma (respiración diafragmática, estimulación sensorial suave) adaptadas a su edad. |
| **Accesibilidad** | Interfaz diseñada para pre-lectores: sin texto obligatorio, con audio, iconos intuitivos y elementos táctiles grandes. |

---

## 🪐 Los tres planetas

### 🌍 Planeta 1 — Me conozco
> *¿Cómo me siento hoy?*

Actividades centradas en el autoconocimiento emocional.

| Actividad | Descripción |
|-----------|-------------|
| 😊 **¿Cómo me siento?** | El niño elige entre 6 emociones la que mejor describe su estado en ese momento. |
| 🧳 **La maleta de las emociones** | Arrastra objetos que le hacen sentir bien (peluche, música, familia…) a su maleta personal. |
| 🪞 **El espejo mágico** | Selecciona emociones en un carrusel y observa cómo cambia la expresión facial en el espejo animado. |

---

### 🌸 Planeta 2 — Relación con los demás
> *¿Cómo se siente mi amigo?*

Actividades de empatía y toma de decisiones sociales.

| Actividad | Descripción |
|-----------|-------------|
| 👀 **¿Qué siente mi amigo?** | Observa a "Lila" en 3 escenas y elige la emoción correcta entre 4 opciones. |
| 🤝 **Juego por parejas** | Su amiga se ha caído. ¿Qué hace? Elige entre abrazar, ayudar, compartir o ignorar. |

---

### 🌊 Planeta 3 — Me relajo
> *Respira conmigo*

Actividades de calma, respiración y estimulación sensorial suave.

| Actividad | Descripción |
|-----------|-------------|
| ☁️ **Mundo tranquilo** | Toca despacio nubes, estrellas y burbujas flotantes en un entorno visual calmado. |
| 🫁 **Respiramos con la estrella** | Sigue un círculo que se expande (inspira) y se contrae (espira) durante 4 ciclos guiados. |

---

## 📊 Informe de sesión

Al terminar una sesión, el tutor puede acceder al **Informe de Sesión** pulsando **"📖 Mi Viaje"** en el Sistema Solar. El informe recoge automáticamente todos los datos generados:

- Emoción inicial elegida por el niño
- Objetos empacados en la maleta y tiempo dedicado
- Emociones exploradas en el espejo mágico
- Aciertos y errores en la actividad de empatía
- Decisión social tomada y número de intentos
- Toques y tiempo en Mundo tranquilo
- Ciclos de respiración completados y pausas realizadas

El informe puede **exportarse a PDF** directamente desde el navegador (`Archivo → Imprimir → Guardar como PDF`), sin necesidad de ninguna cuenta ni servidor.

> ⚠️ Los datos de sesión se almacenan solo en el navegador (`sessionStorage`) y se eliminan al cerrar la pestaña. **No se envía ningún dato a ningún servidor.**

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **React** | 19 | UI y componentes |
| **TypeScript** | 5.8 | Tipado estático |
| **Vite** | 6 | Bundler y servidor de desarrollo |
| **TailwindCSS** | v4 | Estilos utilitarios |
| **React Router** | v7 | Navegación SPA |
| **Framer Motion** | 12 | Animaciones del avatar guía |
| **Web Speech API** | nativa | Síntesis de voz (Estela) |
| **Web Audio API** | nativa | Efectos de sonido |

---

## 🚀 Uso de la aplicación

### Acceso

1. Abre la aplicación en **[https://epm-proyecto-web.vercel.app/](https://epm-proyecto-web.vercel.app/)**
2. Introduce la contraseña de acceso: **`epm2026`**
3. Pulsa **"Empezar viaje"** en la pantalla de bienvenida

### Recomendaciones para tutores

- Usa la aplicación **junto al niño**, no como actividad autónoma
- Activa el **sonido** antes de empezar para que Estela pueda hablar
- La sesión recomendada es de **15–25 minutos**
- Al terminar, accede al informe con el botón **"📖 Mi Viaje"** y descárgalo como PDF antes de cerrar la pestaña

> 📄 Para una guía completa de uso, consulta el archivo [`guia-tutores.html`](./guia-tutores.html) incluido en el repositorio. Ábrelo en el navegador y guárdalo como PDF para tener un manual imprimible de 7 páginas.

---

## 💻 Ejecutar localmente

**Requisitos previos:** Node.js 18+

```bash
# 1. Clona el repositorio
git clone https://github.com/alvarooocg/EPM-Proyecto-Web.git
cd EPM-Proyecto-Web/EPM-frontend

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
npm run lint     # Verificar tipos TypeScript
```

---

## 🏗️ Estructura del proyecto

```
EPM-frontend/
├── src/
│   ├── components/
│   │   ├── Shared.tsx          # Componentes globales (Topbar, Star, EmotionButton…)
│   │   └── AvatarGuia.tsx      # Avatar Estela con voz y temporizador
│   ├── context/
│   │   └── SessionProgressContext.tsx  # Estado de sesión (sessionStorage)
│   ├── screens/
│   │   ├── ElUniverso.tsx      # Sistema Solar — pantalla de inicio
│   │   ├── PlanetScreen.tsx    # Base reutilizable para planetas
│   │   ├── Planet1Screen.tsx   # Planeta Me conozco
│   │   ├── Planet2Screen.tsx   # Planeta Relaciones
│   │   ├── Planet3Screen.tsx   # Planeta Me relajo
│   │   ├── Informe.tsx         # Informe de sesión con export PDF
│   │   ├── Dashboard.tsx       # Panel de datos reales de sesión
│   │   └── LogrosGalacticos.tsx # Logros desbloqueados
│   ├── types/
│   │   └── progress.ts         # Tipos TypeScript de payloads de actividad
│   ├── utils/
│   │   └── achievements.ts     # Lógica de logros
│   ├── styles/
│   │   ├── animations.css      # Keyframes globales
│   │   └── print.css           # Estilos de impresión para el informe PDF
│   ├── i18n.ts                 # Textos en ES/EN
│   └── App.tsx                 # Rutas y providers
└── public/
    └── assets/                 # Imágenes de planetas y sprites de Estela
```

---

## 🌍 Despliegue

La aplicación está desplegada en **Vercel** con despliegue automático desde la rama `main`.

🔗 **[https://epm-proyecto-web.vercel.app/](https://epm-proyecto-web.vercel.app/)**

---

<div align="center">
  <sub>Desarrollado con ❤️ para la educación emocional infantil · 2025</sub>
</div>
