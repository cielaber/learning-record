package rpc

import (
	"context"
	"file-store-server/service/upload/config"
	upProto "file-store-server/service/upload/proto"
)

type Uplaod struct{}

func (u *Uplaod) UploadEntry(ctx context.Context, req *upProto.ReqEntry, res *upProto.RespEntry) error {
	res.Entry = config.UploadEntry
	return nil
}