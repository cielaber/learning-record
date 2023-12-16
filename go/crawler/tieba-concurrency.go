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

	page := make(chan int)
	for i := start; i <= end; i++ {
		go SpiderPage(i, page)
	}

	for i := start; i <= end; i++ {
		fmt.Printf("第%d个网页爬取完成\n", <- page)
	}
}

func SpiderPage(i int, page chan int) {
	url := "https://tieba.baidu.com/f?kw=%E7%BB%9D%E5%9C%B0%E6%B1%82%E7%94%9F&ie=utf-8&pn=" + strconv.Itoa((i-1)*50)

	result, err := HttpGet(url)
	if err != nil {
		fmt.Println("HttpGet err:", err)
		return
	}
	// fmt.Println("result=", result)

	f, err := os.Create("第" + strconv.Itoa(i) + "页" + ".html")
	if err != nil {
		fmt.Println("os.Create err:", err)
		return
	}
	f.WriteString(result)
	f.Close()

	page <- i
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
