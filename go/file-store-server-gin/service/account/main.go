package main

import (
	"log"
	"time"

	micro "go-micro.dev/v4"

	"file-store-server/service/account/handler"
	proto "file-store-server/service/account/proto"

	"github.com/go-micro/plugins/v4/registry/consul"
)

func main() {
	registry := consul.NewRegistry()
  
	// 创建一个service
	service := micro.NewService(
		micro.Name("go.micro.service.user"),
		micro.RegisterTTL(time.Second*10),
		micro.RegisterInterval(time.Second*5),
		micro.Registry(registry),
	)
	service.Init()

	proto.RegisterUserServiceHandler(service.Server(), new(handler.User))
	if err := service.Run(); err != nil {
		log.Println(err)
	}
}
