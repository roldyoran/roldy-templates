package main

import (
    "log"

	// Air to reload the server on file changes
	// command: air init 
	// command: air
	// go install github.com/air-verse/air@latest

    "github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
    app := fiber.New()


	// Initialize default config
	app.Use(cors.New())
	// Initialize default config
	app.Use(logger.New())


    app.Get("/", func (c *fiber.Ctx) error {
        return c.SendString("Hello from GO FIBER for roldyoran!")
    })

	app.Get("/cua", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"success": true,
			"message": "Hello from CUA endpoint",
		})
	})

	app.Get("/cua/:param", func (c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"param": c.Params("param"),
		})
	})

	// app.Post("/", func (c *fiber.Ctx) error {
	// 	return c.SendString("POST request")
	// })

    log.Fatal(app.Listen(":4200"))
}