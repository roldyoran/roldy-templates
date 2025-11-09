import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { logger } from 'hono/logger'

const app = new Hono()

app.use(cors())
app.use(logger())
app.use(prettyJSON())

app.get('/', (c) => {
  return c.json({ message: 'Hello, this is a template with Hono' })
})

export default app
