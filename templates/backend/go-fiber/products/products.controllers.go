
package products

import (
  "fmt"

  "github.com/gofiber/fiber/v2"
)

// GetProducts handles GET requests to fetch products.
func GetProducts(c *fiber.Ctx, productName string) error {

  return c.JSON(fiber.Map{
    "message": fmt.Sprintf("Fetching products for %s", productName),
  })
}