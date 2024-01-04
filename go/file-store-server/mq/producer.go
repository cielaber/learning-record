package mq

import (
	"file-store-server/config"
	"log"

	"github.com/streadway/amqp"
)

var conn *amqp.Connection
var channel *amqp.Channel

// 如果异常关闭，会接收通知
var notifyClose chan *amqp.Error

func init() {
	if !config.AsyncTransferEnable {
		return
	}
	
	if initChannel() {
		channel.NotifyClose(notifyClose)
	}
	// 断线自动重连
	go func() {
		for {
			select {
			case msg := <-notifyClose:
				conn = nil
				channel = nil
				log.Printf("onNotifyChannelClosed: %+v\n", msg)
				initChannel()
			}
		}
	}()
}

func initChannel() bool {
	if channel != nil {
		return true
	}

	conn, err := amqp.Dial(config.RabbitURL)
	if err != nil {
		log.Println("amqp.Dial error:", err.Error())
		return false
	}

	channel, err = conn.Channel()
	if err != nil {
		log.Println("conn.Channel error:", err.Error())
		return false
	}

	return true
}

func Publish(exchange, routingKey string, msg []byte) bool {
	if !initChannel() {
		return false
	}

	err := channel.Publish(exchange, routingKey, false, false, amqp.Publishing{
		ContentType: "text/plain",
		Body:        msg,
	})

	if err != nil {
		log.Println("channel.Publish error:", err.Error())
		return false
	}

	return true
}
