package route

import (
	"file-store-server/service/upload/api"

	"github.com/gin-gonic/gin"
)

func Router() *gin.Engine {
	router := gin.Default()

	router.Static("/static/", "./static")

	// router.Use(handler.HTTPInterceptor())

	router.POST("/file/uplaod", api.DoUploadHandler)
	router.OPTIONS("/file/upload", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		c.Status(204)
	})

	return router
}
