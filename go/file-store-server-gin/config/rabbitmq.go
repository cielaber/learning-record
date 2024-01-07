package config

const (
	// AsyncTransferEnable : 是否开启文件异步转移
	AsyncTransferEnable = true
	// RabbitURL : rabbitmq服务的入口url
	RabbitURL = "amqp://guest:guest@127.0.0.1:5672/"
	// TransExchangeName : 用于文件transfer的交换机
	TransExchangeName = "file-store-server.transfer"
	// TransOSSQueueName : oss转移队列名
	TransOSSQueueName = "file-store-server.transfer.oss"
	// TransOSSErrQueueName : oss转移失败后写入另一个队列的队列名
	TransOSSErrQueueName = "file-store-server.transfer.oss.err"
	// TransOSSRoutingKey : routingkey
	TransOSSRoutingKey = "oss"
)