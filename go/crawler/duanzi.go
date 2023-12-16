package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"strings"
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
		fmt.Printf("第%d个网页爬取完成\n", <-page)
	}
}

func SpiderPage(i int, page chan int) {
	url := "https://www.pengfu.com/" + strconv.Itoa(i) + ".html"

	result, err := HttpGet(url)
	if err != nil {
		fmt.Println("HttpGet err:", err)
		return
	}
	// fmt.Println("result=", result)

	// 先获取每个段子的url
	ret := regexp.MustCompile(`<h1 class="dp-h"><a href="(?s:(.*?))"`)
	alls := ret.FindAllStringSubmatch(result, -1)

	fileTitle := make([]string, 0)
	fileContent := make([]string, 0)
	for _, url := range alls {
		title, content, err := SpiderItemPage(url[1])
		if err != nil {
			fmt.Println("SpiderItemPage err:", err)
			continue
		}
		// fmt.Println("title:", title)
		// fmt.Println("content:", content)
		fileTitle = append(fileTitle, title)
		fileContent = append(fileContent, content)

	}
	
	Save2File(i, fileTitle, fileContent)

	page <- i
}

func Save2File(index int, fileTitle, fileContent []string) {
	f, err := os.Create("第" + strconv.Itoa(index) + "页.txt")
	if err != nil {
		fmt.Println("os.Create err:", err)
		return
	}
	defer f.Close()

	n := len(fileTitle)

	for i := 0; i < n; i++ {
		f.WriteString(fileTitle[i] + "\n" + fileContent[i] + "\n")
		f.WriteString("-----------------------------------------------\n")
	}
}

func SpiderItemPage(url string) (title, content string, err error) {
	result, err1 := HttpGet(url)
	if err1 != nil {
		err = err1
		return
	}

	ret1 := regexp.MustCompile(`<h1>(?s:(.*?))</h1>`)
	alls := ret1.FindAllStringSubmatch(result, 1)
	for _, temTitle := range alls {
		title = temTitle[1]
		title = strings.Replace(title, "\t", "", -1)
		break
	}

	ret2 := regexp.MustCompile(`<div class="content-txt pt10">(?s:(.*?))<a id="prev" href="`)
	alls2 := ret2.FindAllStringSubmatch(result, 1)
	for _, tmpContent := range alls2 {
		content = tmpContent[1]
		content = strings.Replace(content, "\n", "", -1)
		content = strings.Replace(content, "\t", "", -1)
		break
	}

	return
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
