
# roldy-templates

Repositorio monorepo de plantillas y utilidades para crear aplicaciones rápidas (frontend y backend) con una CLI de generación.

## ¿Para qué sirve?

Este monorepo centraliza plantillas (templates) de proyectos y una pequeña herramienta CLI para generar aplicaciones basadas en esas plantillas. Está pensado para:

- Compartir y versionar plantillas estándar de frontend y backend.
- Proporcionar una interfaz simple (CLI) para crear nuevos proyectos a partir de esas plantillas.
- Facilitar la reutilización y el mantenimiento de stacks (por ejemplo, Vue + shadcn, Hono + Bun + PostgreSQL).

## Requisitos

- Node.js (versión moderna, por ejemplo >= 18)
- pnpm (se usa como gestor de monorepo)
- (Opcional) Bun, si se quiere ejecutar plantillas que lo requieran localmente — revisa la README de cada plantilla.

## Instalación (rápida)

1. Clona el repositorio.
2. Instala dependencias de monorepo con pnpm:

```
pnpm install
```

Eso instalará las dependencias necesarias para la CLI y facilitará trabajar con las plantillas localmente.

## Estructura del repositorio

- `package.json` — configuración raíz del monorepo.
- `pnpm-workspace.yaml`, `pnpm-lock.yaml` — configuración y lockfile de pnpm.
- `cli/` — herramientas y scripts CLI para generar proyectos.
	- `create-roldy-app/` — la herramienta para crear una app desde una plantilla (contiene `index.js`, `package.json`, `Readme.md`).
- `templates/` — colección de plantillas organizadas por tipo:
	- `frontend/` — plantillas de frontend (por ejemplo `vue-spa-shadcn`).
	- `backend/` — plantillas de backend (por ejemplo `hono-bun-pgsql`).

Ejemplo de estructura:

- `templates/frontend/vue-spa-shadcn/` — plantilla de Single Page App con Vue + Vite + componentes shadcn.
	- `src/` — código de ejemplo.
	- `package.json`, `tsconfig.json`, `README.md` — configuración de la plantilla.
- `templates/backend/hono-bun-pgsql/` — plantilla backend usando Hono sobre Bun con ejemplo de conexión a PostgreSQL.

Cada plantilla suele incluir su propio `README.md` con instrucciones específicas de uso y pasos para arrancarla.

## La CLI: `cli/create-roldy-app`

La carpeta `cli/create-roldy-app` contiene una utilidad para generar un nuevo proyecto a partir de una de las plantillas del directorio `templates/`.

Uso base (desde la raíz del repo):

```
node ./cli/create-roldy-app/index.js
```

La CLI normalmente pedirá elegir una plantilla y una carpeta de destino. Consulta `cli/create-roldy-app/Readme.md` para detalles sobre opciones o banderas disponibles.

## Cómo probar una plantilla localmente

1. Entra en la carpeta de la plantilla que quieras probar, por ejemplo:

```
cd templates/frontend/vue-spa-shadcn
```

2. Instala dependencias y arranca según la README de la plantilla:

```
pnpm install
pnpm dev
```

Para plantillas backend que usen Bun o servicios adicionales (Postgres, etc.), revisa el `README.md` específico y prepara las dependencias del entorno (p. ej. base de datos, variables de entorno).

## Contribuir

Si quieres añadir plantillas o mejorar la CLI:

1. Crea un fork y una rama con tu cambio.
2. Añade o actualiza la plantilla en `templates/` con su propia `README.md` y `package.json` si aplica.
3. Asegúrate de documentar pasos de arranque y dependencias.
4. Abre un Pull Request describiendo los cambios.

## Buenas prácticas para plantillas

- Mantener `README.md` por plantilla con pasos de arranque claros.
- Incluir un `package.json` mínimo y scripts útiles (`dev`, `build`, `start`).
- Evitar dependencias globales y documentar requisitos de entorno.

## Licencia y contacto

Incluye aquí la licencia del proyecto (si procede) y datos de contacto o referencia al repositorio original.

---
