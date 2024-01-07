package handler

import (
	"context"
	"file-store-server/common"
	proto "file-store-server/service/account/proto"
	"file-store-server/util"

	cfg "file-store-server/config"
	dblayer "file-store-server/db"
)

type User struct{}

func (u *User) SignUp(ctx context.Context, req *proto.ReqSignUp, res *proto.RespSignUp) error {
	username := req.Username
	password := req.Password

	if len(username) < 3 || len(password) < 5 {
		res.Code = common.StatusParamInvalid
		res.Message = "注册参数无效"
		return nil
	}

	enc_password := util.Sha1([]byte(password + cfg.PwdSalt))
	suc := dblayer.UserSignup(username, enc_password)
	if suc {
		res.Code = common.StatusOK
		res.Message = "注册成功"
	} else {
		res.Code = common.StatusRegisterFailed
		res.Message = "注册失败"
	}
	return nil
}
