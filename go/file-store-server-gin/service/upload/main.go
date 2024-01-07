package main

import (
	cfg "file-store-server/service/upload/config"
	upProto "file-store-server/service/upload/proto"
	"file-store-server/service/upload/route"
	upRpc "file-store-server/service/upload/rpc"
	"log"

	"github.com/go-micro/plugins/v4/registry/consul"
	"go-micro.dev/v4"
)

func startRpcService() {
	registry := consul.NewRegistry()

	service := micro.NewService(
		micro.Name("go.micro.service.upload"),
		micro.Registry(registry),
	)

	service.Init()

	upProto.RegisterUploadServiceHandler(service.Server(), new(upRpc.Uplaod))

	if err := service.Run(); err != nil {
		log.Println(err.Error())
	}
}

func startApiService() {
	router := route.Router()
	router.Run(cfg.UploadServiceHost)
}


func main() {
	go startRpcService()

	startApiService()
}