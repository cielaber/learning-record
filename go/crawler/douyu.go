package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"regexp"
	"strconv"
)

func main() {
	url := "https://www.douyu.com/g_yz"
	result, err := HttpGet(url)
	if err != nil {
		fmt.Println("HttpGet err:", err)
		return
	}

	page := make(chan int)

	err = os.Mkdir("img/", os.ModePerm)
	if err != nil {
		fmt.Println("os.Create err:", err)
		return
	}

	ret := regexp.MustCompile(`<img loading="lazy" src="(?s:(.*?))"`)
	alls := ret.FindAllStringSubmatch(result, -1)
	for i, imgUrl := range alls {
		// fmt.Println("imgUrl:", imgUrl[1])
		go SaveImg(i, imgUrl[1], page)
	}

	for i := 1; i <= len(alls); i++ {
		fmt.Printf("第%d张图下载完成\n", <-page)
	}
}

func SaveImg(i int, url string, page chan int) {
	f, err := os.Create("img/" + strconv.Itoa(i+1) + ".jpg")
	if err != nil {
		fmt.Println("os.Create err:", err)
		return
	}
	defer f.Close()

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("http.Get err:", err)
		return
	}
	defer resp.Body.Close()

	buf := make([]byte, 4096)
	for {
		n, err := resp.Body.Read(buf)
		if n == 0 {
			break
		}
		if err != nil && err != io.EOF {
			fmt.Println("resp.Body.Read err:", err)
			return
		}
		f.Write(buf[:n])
	}
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
