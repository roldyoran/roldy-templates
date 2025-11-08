import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono this is a Backend by Roldyoran!')
})

export default app
