package route

import (
	"file-store-server/handler"

	"github.com/gin-gonic/gin"
)


func Router() *gin.Engine {
	router := gin.Default()

	router.Static("/static/", "./static")

	router.GET("/user/signup", handler.SignUpHandler)
	router.POST("/user/signup", handler.DoSignUpHandler)

	return router
}