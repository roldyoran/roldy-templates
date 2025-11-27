package products

import (
    "github.com/gofiber/fiber/v2"
)

// RegisterRoutes registers product-related routes on the provided app.
func RegisterRoutes(app *fiber.App) {
    products := app.Group("/products")

    // GET /products -> optional query param ?productName=...
	products.Get("/", func(c *fiber.Ctx) error {
        return GetProducts(c, "nombre-productos")
    })

    // Example extra route matching the original TS file
    products.Get("/cua", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "hola":    "cua",
            "product": "cua",
        })
    })
}
