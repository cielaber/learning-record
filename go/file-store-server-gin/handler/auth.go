package handler

import (
	"file-store-server/common"
	"file-store-server/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HTTPInterceptor() gin.HandlerFunc {
	return func(c *gin.Context) {
			username := c.Request.FormValue("username")
			token := c.Request.FormValue("token")

			if len(username) < 3 || !IsTokenValid(token) {
				c.Abort()
				resp := util.NewRespMsg(
					int(common.StatusTokenInvalid),
					"token无效",
					nil,
				)
				c.JSON(http.StatusOK, resp)
				return
			}

			c.Next()
		}
}
