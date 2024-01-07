package mq

import "log"

var done chan bool

func StartConsume(qName, cName string, callback func(msg []byte) bool) {
	msgs, err := channel.Consume(
		qName,
		cName,
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Println("channel.Consume error:", err.Error())
		return
	}

	done = make(chan bool)

	go func() {
		for msg := range msgs {
			processSuc := callback(msg.Body)
			if !processSuc {
				// TODO: 将任务写到另一个队列，用于异常情况的重试
			}
		}
	}()

	<-done

	channel.Close()

}
