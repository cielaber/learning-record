package main

import (
	"fmt"
	"net"
	"os"
)

func main() {
	listener, err := net.Listen("tcp", "127.0.0.1:8008")
	if err != nil {
		fmt.Println("net.Listen err:", err)
		return
	}
	defer listener.Close()

	conn, err := listener.Accept()
	if err != nil {
		fmt.Println("listener.Accept() err:", err)
		return
	}
	defer conn.Close()

	buf := make([]byte, 4096)
	n, err := conn.Read(buf)
	if err != nil {
		fmt.Println("conn.Read err:", err)
		return
	}
	fileName := string(buf[:n])
	conn.Write([]byte("ok"))

	recvFile(conn, fileName)

	for{}

}
func recvFile(conn net.Conn, fileName string) {
	f, err := os.Create(fileName)
	if err != nil {
		fmt.Println("os.Create err:", err)
	}
	defer f.Close()

	buf := make([]byte, 4096)

	for {
		n, _ := conn.Read(buf)
		if n == 0 {
			fmt.Println("接受文件完成。")
			return
		}
		fmt.Println(string(buf))
		f.Write(buf[:n])
	}
}
