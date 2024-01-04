package mq

import (
	"file-store-server/common"
)

type TransferData struct {
	FileHash string
	CurLocation string
	DestLocation string
	DestStoreType common.StoreType
}