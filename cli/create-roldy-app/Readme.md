# create-roldy-app

Herramienta CLI para crear proyectos a partir de las plantillas definidas en el repositorio `roldy-templates`.

Este pequeño generador pregunta qué categoría y plantilla quieres usar, clona los archivos iniciales con `degit`, e intenta instalar las dependencias según la plantilla seleccionada (pnpm, bun, etc.).

## Requisitos

- Node.js (16+) para ejecutar el CLI localmente.
- Si vas a usar plantillas que requieran `pnpm`, `bun` o `deno`, tener instalado el gestor correspondiente para ejecutar los pasos posteriores.

## Instalación / Ejecución

1. Desde este directorio puedes ejecutar directamente (modo desarrollo):

```powershell
cd cli/create-roldy-app
node index.js
```

2. También puedes instalarlo localmente y ejecutar el binario:

```powershell
cd cli/create-roldy-app
npm install
npx create-roldy-app
```

3. Si el paquete se publica o lo instalas globalmente, podrás usar directamente:

```powershell
create-roldy-app
```

## Uso

El flujo es interactivo:

- Selecciona la categoría de proyecto (ej. frontend, backend).
- Selecciona la plantilla dentro de la categoría.
- Introduce el nombre del proyecto.

La herramienta usará `npx degit <repo> <projectName>` para copiar la plantilla y luego intentará instalar dependencias según la configuración de la plantilla.

Al finalizar verás los pasos siguientes sugeridos, por ejemplo:

```text
cd my-project
pnpm dev
```

## Plantillas disponibles (local)

El archivo `templates.json` define las plantillas. Actualmente hay, entre otras, las siguientes plantillas locales:

- `frontend/vue` — Vue + Tailwind + shadcn-vue + Axios
  - repo: `roldyoran/roldy-templates/templates/frontend/vue-spa-shadcn`
  - runtime: `node`
  - packageManager: `pnpm`

- `backend/hono` — Hono + Bun + Typescript + Zod
  - repo: `roldyoran/roldy-templates/templates/backend/hono-bun-pgsql`
  - runtime: `bun`
  - packageManager: `bun`

Puedes ver y editar las plantillas disponibles en `cli/create-roldy-app/templates.json` o actualizar la URL remota dentro de `index.js` para apuntar a otro índice de plantillas.

## Cómo añadir una nueva plantilla

1. Abre `cli/create-roldy-app/templates.json`.
2. Añade una entrada bajo la categoría deseada con la forma:

```json
"mi-plantilla": {
  "name": "Nombre descriptivo",
  "repo": "usuario/repo/ruta-a-plantilla",
  "runtime": "node|bun|deno|none",
  "packageManager": "pnpm|npm|yarn|bun"
}
```

3. Guarda y prueba ejecutando `node index.js`.

## Contribuir

Si quieres mejorar las plantillas o el CLI:

1. Haz fork del repositorio.
2. Añade/actualiza plantillas en `templates/` y/o `cli/create-roldy-app/templates.json`.
3. Abre un Pull Request describiendo los cambios.

## Notas técnicas

- El CLI intenta descargar un índice remoto de plantillas (definido en `index.js`). Si falla, usa el `templates.json` local.
- Usa `npx degit` para clonar plantillas sin historial git.
- Las instalaciones de dependencias se ejecutan según la propiedad `runtime` y `packageManager` de la plantilla.

## Licencia

Este repositorio sigue la licencia definida en la raíz del proyecto (revisa `LICENSE` si existe).

---

Si quieres que añada ejemplos más concretos o instrucciones para Windows/Bun/Deno en particular, dime qué prefieres y lo agrego.
