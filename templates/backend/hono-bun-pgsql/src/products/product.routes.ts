import { Hono } from "hono";
import { getProducts } from "./product.controllers";

const productsRoutes = new Hono()

productsRoutes.get('/', (c) => getProducts(c, 'producto1234'))
productsRoutes.get('/cua', (c) => c.json({ hola: 'cua', product: 'cua' }))

export default productsRoutes
