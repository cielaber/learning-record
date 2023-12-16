package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	dirPath := "/Users/eternitywith/Desktop/learning-record/go/demo/fs"

	openDir(dirPath)
	readDir(dirPath)
}

func openDir(path string) {
	// 打开目录直接用openFile，打开权限使用os.ModeDir
	f, err := os.OpenFile(path, os.O_RDONLY, os.ModeDir)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer f.Close()
}

func readDir(path string) {
	f, err := os.OpenFile(path, os.O_RDONLY, os.ModeDir)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer f.Close()

	/*
		n 代表读取的目录项的个数，负数代表读取所有目录项
	*/
	info, err := f.Readdir(-1) // -1代表读取所有的目录项
	for _, fileInfo := range info {
		if fileInfo.IsDir() {
			fmt.Printf("%s 是一个目录\n", fileInfo.Name())
		} else {
			fmt.Printf("%s 是一个文件\n", fileInfo.Name())

			if strings.HasSuffix(fileInfo.Name(), ".txt") { // 查找txt后缀的文件
				fmt.Printf("%s 是一个txt文件\n", fileInfo.Name())
			}
		}
	}
}


