package handler

import (
	"context"
	"file-store-server/service/account/proto"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-micro/plugins/v4/registry/consul"
	micro "go-micro.dev/v4"
)

var (
	userCli proto.UserService
)

func init() {
	registry := consul.NewRegistry()

	service := micro.NewService(
		micro.Name("go.micro.api.user"),
		micro.Registry(registry),
	)
	service.Init()

	userCli = proto.NewUserService("go.micro.service.user", service.Client())
}

func SignUpHandler(c *gin.Context) {
	c.Redirect(http.StatusFound, "/static/view/signup.html")
}

func DoSignUpHandler(c *gin.Context) {
	username := c.Request.FormValue("username")
	password := c.Request.FormValue("password")

	resp, err := userCli.SignUp(context.TODO(), &proto.ReqSignUp{
		Username: username,
		Password: password,
	})

	if err != nil {
		log.Println(err.Error())
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code": resp.Code,
		"msg": resp.Message,
	})
}