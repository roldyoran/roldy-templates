# Plantilla: Vue SPA (shadcn-vue)

Esta carpeta contiene una plantilla pre-preparada para crear una aplicación frontend con Vue 3 y componentes de `shadcn-vue`.

Es ideal para comenzar rápidamente con una SPA moderna usando TypeScript, Vite y utilidades de Tailwind CSS.

Características principales:

- Plantilla lista para usar: estructura de carpetas, configuración de TypeScript y Vite.
- Componentes UI basados en `shadcn-vue` (Cards, Buttons, Inputs, Badges, etc.).
- Ejemplos de vistas y componentes reutilizables.
- Peticiones HTTP ejemplos con `axios` (archivo `src/requests`).

Tecnologías incluidas
--------------------

- Vue 3 (Composition API)
- TypeScript
- Vite (bundler / dev server)
- Tailwind CSS (estilos utilitarios)
- shadcn-vue (componentes UI)
- Pinia (estado global)
- Vue Router (enrutamiento)
- Axios (peticiones HTTP)
- Lucide (iconos) — opcional en componentes
- pnpm (gestor de paquetes recomendado)

Archivos y carpetas relevantes
-----------------------------

- `src/` — código fuente (vistas, componentes, stores, requests)
- `src/components/ui/` — componentes UI (Button, Input, Card, Badge, ...)
- `src/views/` — vistas de ejemplo (HomeView, SecondView, NotFoundView)
- `src/requests/` — ejemplo de llamadas a APIs (ej. PokeAPI)
- `public/` — archivos públicos estáticos

Cómo empezar
--------------

1. Instala dependencias (recomendado usar pnpm):

```bash
pnpm install
```

2. Inicia el servidor de desarrollo:

```bash
pnpm dev
```

Notas
-----

- Ajusta los componentes UI de `shadcn-vue` según tu diseño. Algunos componentes de ejemplo (Card, Badge, Button, Input) ya están referenciados en la plantilla.
- Si no deseas usar iconos, elimina las importaciones de `lucide-vue-next` en los componentes.
- Esta plantilla forma parte de una colección mayor; adapta las rutas y configuraciones según tu proyecto final.

