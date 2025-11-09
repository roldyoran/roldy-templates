import { Context } from "hono";

export const getProducts = async (c: Context, productName: string) => {
  return c.json({ message: `Fetching products for ${productName}` });
}