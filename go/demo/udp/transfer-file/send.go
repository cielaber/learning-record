package main

import (
	"fmt"
	"io"
	"net"
	"os"
)

func main () {
	list := os.Args

	if len(list) != 2 {
		fmt.Println("格式为： go run xxx.go 文件名")
		return
	}

	path := list[1]

	fileInfo, err := os.Stat(path)
	if err != nil {
		fmt.Println("os.Stat err:", err)
		return
	}

	fileName := fileInfo.Name()
	fmt.Println("文件名:", fileInfo.Name())
	fmt.Println("文件大小:", fileInfo.Size())

	conn, err := net.Dial("tcp", "127.0.0.1:8008")
	if err != nil {
		fmt.Println("net.Dial err:", err)
		return
	}
	defer conn.Close()

	_, err = conn.Write([]byte(fileName))
	if err != nil {
		fmt.Println("conn.Write err:", err)
		return
	}

	buf := make([]byte, 16)
	n, err := conn.Read(buf)
	if err != nil {
		fmt.Println("conn.Read err:", err)
		return
	}
	fmt.Println(string(buf[:n]))
	if "ok" == string(buf[:n]) {
		sendFile(conn, path)
	}
}

func sendFile(conn net.Conn, filePath string) {
	f, err := os.Open(filePath)
	if err != nil {
		fmt.Println("os.Open err:", err)
		return
	}
	defer f.Close()

	buf := make([]byte, 4096)
	for {
		n, err := f.Read(buf)
		fmt.Println("----", n)

		if err != nil {
			if err == io.EOF {
				fmt.Println("发送文件完成！")
			} else {
				fmt.Println("f.Read err:",err)
			}
			return
		}
		fmt.Println(buf[:n])
		_, err = conn.Write(buf[:n])
		if err != nil {
			fmt.Println("conn.Write err:", err)
			return
		}
	}
}