# Visualización Organizacional

Visualización interactiva de redes organizacionales construida con **React**, **Vite**, **Material UI**, **Tailwind** y **Lucide**.

Permite explorar personas, proyectos y roles, con filtros avanzados, paneles contextuales y visualizaciones alternativas.

---

## 🚀 Características principales

- Visualización de red con nodos interactivos (personas, proyectos, roles)
- Paneles laterales para detalles de persona, proyecto y rol
- Filtros por rol, proyecto, cantidad de conexiones, etc.
- Zoom, pan y selector de visualización (red, matriz, lista, heatmap)
- Tooltips modernos y avatares con iniciales
- UI moderna y responsiva (MUI + Tailwind)
- Código modular y fácil de extender

---

## 📦 Instalación y uso local

1. Clona el repo:
   ```bash
   git clone https://github.com/nahueleo/org-network-viz.git
   cd org-network-viz
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Corre en modo desarrollo (accesible en tu red):
   ```bash
   npm run dev -- --host
   ```
4. Abre en tu navegador:
   - [http://localhost:5173](http://localhost:5173)
   - O desde otra máquina: `http://IP_DE_TU_PC:5173`

---

## 🌐 Deploy en Vercel o Netlify

1. Sube el repo a GitHub.
2. Ve a [vercel.com](https://vercel.com/) o [netlify.com](https://netlify.com/) y conecta tu repo.
3. Elige framework **Vite** y deployea. ¡Listo!

---

## 📁 Estructura principal

- `/juli/components/` — Componentes React (paneles, controles, visualización)
- `/juli/data/` — Datos de personas, proyectos, roles, asignaciones
- `/juli/utils/` — Utilidades de red y layout
- `/juli/src/` — Entrypoint Vite/React

---

## ✨ Créditos y stack
- React, Vite, Material UI, Tailwind, Lucide
- Inspirado en mejores prácticas de visualización de redes y UX

---

**Hecho con ❤️ por [nahueleo](https://github.com/nahueleo)**
