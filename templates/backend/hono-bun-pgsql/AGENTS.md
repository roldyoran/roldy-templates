# AGENTS.md

## Build & Development Commands

```bash
# Install dependencies
bun install

# Development server with hot reload
bun run dev

# Production build
bun run build

# Start production server
bun start
```

## Testing & Linting

No testing framework or linter is currently configured. When adding tests or linting:
- Use Bun's built-in test runner (`bun test`) for unit/integration tests
- Run specific test file: `bun test path/to/test.test.ts`
- Consider adding ESLint with TypeScript rules for code quality
- Consider adding Prettier for consistent formatting

## Code Style Guidelines

### Project Structure
```
src/
  index.ts              # Main app entry point, middleware setup
  products/
    product.routes.ts   # Route definitions
    product.controllers.ts  # Controller functions
```

### TypeScript Configuration
- Strict mode enabled
- JSX configured for Hono (react-jsx with hono/jsx import source)
- Always use TypeScript types

### Imports
- Use named imports from Hono modules: `import { Hono } from 'hono'`
- Import middleware from Hono sub-modules: `import { cors } from 'hono/cors'`
- Keep imports grouped: external libs first, then internal modules

### Naming Conventions
- **Files**: kebab-case (e.g., `product.routes.ts`)
- **Routes**: plural resource names (e.g., `productsRoutes`)
- **Controllers**: camelCase with descriptive verbs (e.g., `getProducts`, `createProduct`)
- **Variables/Constants**: camelCase
- **Exported functions**: `export const functionName`

### Route Definition Pattern
```typescript
const resourceRoutes = new Hono()

resourceRoutes.get('/', (c) => getItems(c))
resourceRoutes.post('/', (c) => createItem(c))
resourceRoutes.get('/:id', (c) => getItem(c, c.req.param('id')))

export default resourceRoutes
```

### Controller Pattern
- Controllers accept Hono Context as first parameter
- Use async/await for asynchronous operations
- Return responses using `c.json()` for JSON responses
- Type Context parameter: `async (c: Context, ...params) => {}`

### Middleware Setup
- Configure middleware in main index.ts before routes
- Common middleware: cors, logger, prettyJSON
- Use `app.use()` to apply middleware globally

### Error Handling
- Use Hono's error middleware when needed
- Return appropriate HTTP status codes
- Include error messages in JSON responses
- Example: `return c.json({ message: 'Not found' }, 404)`

### Response Format
- Use consistent JSON response structure
- Include `message` field for user-facing messages
- Include `error` field for error scenarios
- Return data directly for success responses

### Code Organization
- Separation of concerns: routes separate from controllers
- Route files should only define route paths and map to controllers
- Controllers should contain business logic and data access
- Main app file should only handle middleware and route registration

### PostgreSQL Integration
- This template uses PostgreSQL (no ORM currently configured)
- Consider using Drizzle ORM or similar when adding database operations
- Use environment variables for database credentials
- Create separate database service files for queries

### Best Practices
- Keep route handlers thin, delegate logic to controllers
- Use Hono's built-in validation middleware (zod-validator) when available
- Type all parameters and return values
- Use async/await for I/O operations
- Use meaningful variable and function names
