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

func SpiderPage(index int, page chan int) {
	url := "https://movie.douban.com/top250?start=" + strconv.Itoa((index-1)*25) + "&filter="
	result, err := HttpGet(url)
	if err != nil {
		fmt.Println("HttpGet err:", err)
		return
	}

	// 电影名
	ret := regexp.MustCompile(`<img width="100" alt="(.*?)"`)
	filmName := ret.FindAllStringSubmatch(result, -1)

	// 分数
	ret2 := regexp.MustCompile(`<span class="rating_num" property="v:average">(?s:(.*?))</span>`)
	filmScore := ret2.FindAllStringSubmatch(result, -1)

	// 评分人数
	ret3 := regexp.MustCompile(`<span>(.*?)人评价</span>`)
	peopleNumber := ret3.FindAllStringSubmatch(result, -1)

	Save2File(index, filmName, filmScore, peopleNumber)

	page <- index
}

func Save2File(index int,filmName, filmScore, peopleNumber [][]string) {
	f, err := os.Create("第"+ strconv.Itoa(index) + "页.txt")
	if err != nil {
		fmt.Println("os.Create err:", err)
		return
	}
	defer f.Close()

	n := len(filmName)

	// 标题
	f.WriteString("电影名称" + "\t\t\t" + "评分" + "\t\t\t" + "评分人数" + "\n")

	for i:= 0; i< n; i++ {
		f.WriteString(filmName[i][1] + "\t\t\t" + filmScore[i][1] + "\t\t\t" + peopleNumber[i][1] + "\n")
	}
}

func HttpGet(url string) (result string, err error) {
	req, err1 := http.NewRequest("GET", url, nil)
	if err1 != nil {
		err = err1
		return
	}
	// 豆瓣反爬，需要设置代表浏览器的header
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
	resp, err2 := (&http.Client{}).Do(req)
		if err2 != nil {
		err = err2
		return
	}
	defer resp.Body.Close()

	buf := make([]byte, 4096)
	for {
		n, err3 := resp.Body.Read(buf)
		if n == 0 {
			break
		}
		if err3 != nil && err3 != io.EOF {
			err = err3
			return
		}
		result += string(buf[:n])
	}
	return
}