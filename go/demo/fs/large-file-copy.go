package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	args := os.Args // 获取命令行参数

	if args == nil || len(args) != 3 {
		fmt.Println("usage: xxx srcFile dstFile")
		return
	}

	srcPath := args[1]
	dstPath := args[2]
	fmt.Printf("srcPath = %s, dstPath = %s\n", srcPath,dstPath)
	if (srcPath == dstPath) {
		fmt.Println("error: 源文件与目标文件同名")
		return
	}

	srcFile, err := os.Open(srcPath)
	if err != nil {
		fmt.Println(err)
		return
	}

	dstFile, err := os.Create(dstPath)
	if err != nil {
		fmt.Println(err)
		return
	}

	buf := make([]byte, 1024) // 创建缓冲区
	for {
		n, err := srcFile.Read(buf)
		if err != nil && err != io.EOF {
			fmt.Println(err)
			break
		}

		if n == 0 {
			fmt.Println("文件处理完毕！")
			break
		}

		tmp := buf[:n] // 读多少写多少
		dstFile.Write(tmp)
	}

	srcFile.Close()
	dstFile.Close()
}