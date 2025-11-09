import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { logger } from 'hono/logger'
import productsRoutes from './products/product.routes'

const app = new Hono()

app.use(cors())
app.use(logger())
app.use(prettyJSON())

app.get('/', (c) => {
  return c.json({ message: 'Hello, this is a template with Hono' })
})

app.route('/products', productsRoutes)

app.notFound((c) => {
  return c.json({ message: 'Route not found, dont exits', error: 'Route not found' }, 404)
} )

export default app
