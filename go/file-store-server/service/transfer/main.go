package main

import (
	"bufio"
	"encoding/json"
	"file-store-server/config"
	"file-store-server/mq"
	"file-store-server/store/oss"
	"log"
	"os"

	dblayer "file-store-server/db"
)

func ProcessTransfer(msg []byte) bool {
	pubData := mq.TransferData{}

	err := json.Unmarshal(msg, &pubData)
	if err != nil {
		log.Println(err.Error())
		return false
	}

	filed, err := os.Open(pubData.CurLocation)
	if err != nil {
		log.Println(err.Error())
		return false
	}

	err = oss.Bucket().PutObject(
		pubData.DestLocation,
		bufio.NewReader(filed),
	)
	if err != nil {
		log.Println(err.Error())
		return false
	}

	suc := dblayer.UpdateFileLocation(pubData.FileHash, pubData.DestLocation)
	if !suc {
		return false
	}

	return true
}

func main() {
	if !config.AsyncTransferEnable {
		log.Println("异步转移文件功能目前被禁用，请检查相关配置")
		return
	}
	log.Println("文件转移服务启动中，开始监听转移任务队列...")
	mq.StartConsume(
		config.TransOSSQueueName,
		"transfer_oss",
		ProcessTransfer,
	)
}
