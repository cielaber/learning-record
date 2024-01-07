package main

import (
	"file-store-server/service/apigw/route"
)

func main() {
	r := route.Router()
	r.Run(":8080")
}
