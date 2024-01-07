package config

import (
	cmn "file-store-server/common"
	"os"
	"path"
)

const (
	// CurrentStoreType : 设置当前文件的存储类型
	CurrentStoreType = cmn.StoreLocal
	
	OSSRootDir = "oss/"
	CephRootDir = "/ceph"
)

var TempLocalRootDir = path.Join(func() string { dir, _ := os.Getwd(); return dir }(), "/tmp")

func init() {
	os.Mkdir(TempLocalRootDir, 0744);
}