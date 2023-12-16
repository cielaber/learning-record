package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
)

func main() {
	var start, end int
	fmt.Print("请输入爬取的起始页(>=1):")
	fmt.Scan(&start)
	fmt.Print("请输入爬取的终止页(>=start):")
	fmt.Scan(&end)

	working(start, end)
}

func working(start, end int) {
	fmt.Printf("正在爬取第%d页到%d页...\n", start, end)

	for i := start; i <= end; i++ {
		url := "https://tieba.baidu.com/f?kw=%E7%BB%9D%E5%9C%B0%E6%B1%82%E7%94%9F&ie=utf-8&pn=" + strconv.Itoa((i-1)*50)

		result, err := HttpGet(url)
		if err != nil {
			fmt.Println("HttpGet err:", err)
			continue
		}
		// fmt.Println("result=", result)

		f, err :=	os.Create("第" + strconv.Itoa(i) +"页" + ".html")
		if err != nil {
			fmt.Println("os.Create err:", err)
			continue
		}
		f.WriteString(result)
		f.Close()
	}
}

func HttpGet(url string) (result string, err error) {
	resp, err1 := http.Get(url)
	if err1 != nil {
		err = err1
		return
	}
	defer resp.Body.Close()

	buf := make([]byte, 4096)
	for {
		n, err2 := resp.Body.Read(buf)
		if n == 0 {
			fmt.Println("读取网页完成")
			break
		}
		if err2 != nil && err2 != io.EOF {
			err = err2
			return
		}
		result += string(buf[:n])
	}
	return
}
