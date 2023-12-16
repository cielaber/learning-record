package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func main() {
	filePath := "/Users/eternitywith/Desktop/learning-record/go/demo/fs/test.txt"
	creatFile(filePath)
	openFile(filePath)
	writeString(filePath)
	readFile(filePath)
}

func creatFile(path string) {
	// Create函数创建文件，文件已存在则会清空文件
	f, err := os.Create(path)
	if err != nil {
		fmt.Println("create file err:", err)
		return
	}
	defer f.Close()
}

func open(path string) {
	f, err := os.Open(path) // 以只读方式打开
	if err != nil {
		fmt.Println("open file err:", err)
	}
	defer f.Close()
}

func openFile(path string) {
	/*
		* flag 读写模式：O_RDONLY（只读模式）、O_WRONLY（只写模式）、O_RDWR（可读可写模式）、O_APPEND（追加模式）
		* perm 权限范围：
			0（没有任何权限）
			1（执行权限）
			2（写权限）
			3（写权限和执行权限）
			4（读权限）
			5（读权限和执行权限）
			6（读写权限）
			7（读、写、执行权限）
		*
	*/
	f, err := os.OpenFile(path, os.O_RDWR, 7)
	if err != nil {
		fmt.Println("open file err:", err)
	}
	defer f.Close()

	_, err = f.WriteString("111111")
	if err != nil {
		fmt.Println("write string err:", err)
		return
	}
}

func writeString(path string) {
	f, err := os.OpenFile(path, os.O_RDWR, 7)
	if err != nil {
		fmt.Println("open file err:", err)
	}
	defer f.Close()

	// 从头开始写字符串
	n, err := f.WriteString("hello world\n")
	if err != nil {
		fmt.Println("write string err:", err)
		return
	}
	fmt.Println("write string n:", n)

	/*
		修改文件的读写指针位置
			offset 偏移量：正表示向文件尾（向后）偏，负表示向文件头（向前）偏
			whence 偏移起始位置：
				io.SeekStart 文件起始位置
		 		io.SeekCurrent 文件当前，即上一次操作文件的读写指针的位置
				io.SeekEnd 文件结尾位置

			返回值：
				ret 文件起始位置开始到当前读写指针的偏移量
	*/
	ret, err := f.Seek(-5, io.SeekEnd)
	if err != nil {
		fmt.Println("seek err:", err)
		return
	}
	fmt.Println("offset:", ret)

	/*
		按字节写文件
		b 要写入的数据的字节
		off 读写指针的偏移量

		返回值：实际写入的文件字节数
	*/
	n, err = f.WriteAt([]byte("\n111啊啊啊aaa\n"), ret)
	if err != nil {
		fmt.Println("write at err:", err)
		return
	}
	fmt.Println("wrtie at n:", n)
}

func readFile(path string) {
	f, err := os.OpenFile(path, os.O_RDWR, 7)
	if err != nil {
		fmt.Println("open file err:", err)
	}
	defer f.Close()

	// 创建一个带有缓冲区的reader
	reader := bufio.NewReader(f)
	for {
		// 从缓冲区中读取数据
		// 每次读取到传入的delim结束
		buf, err := reader.ReadBytes('\n') // 按行读取，每行的结束符是\n
		if err == io.EOF { // 文件结束标记是要单独读一次才能读到
			fmt.Println("文件读取完毕！")
			return
		} else if err != nil {
			fmt.Println("read bytes err:", err)
		}
		fmt.Println(string(buf))
	}
}
