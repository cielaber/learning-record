package main

import (
	"fmt"
	"time"
)

type Blogger struct {
	Base
	Blogs    []*PostContent
	Comments map[int][]*PostContent
	Fans     []FansInterfacer
}

func newBlogger(name string) *Blogger {
	blg := new(Blogger)
	blg.Name = name
	blg.Comments = make(map[int][]*PostContent)
	blg.Blogs = make([]*PostContent, 0)

	return blg
}

func (b *Blogger) PostBlog(content string, blogType int) {
	blog := new(PostContent)

	blog.Id = b.GetId()
	blog.Content = content
	blog.Type = blogType
	blog.CommentTime = time.Now()
	blog.PostMan = b.Name
	blog.To = "All"

	b.Blogs = append(b.Blogs, blog)


	for _, value := range b.Blogs {
		fmt.Println(*value)
	}

	b.Notify(blog.Id)

}

func (b *Blogger) GetId() int {
	if len(b.Blogs) == 0 {
		return 0
	} else {
		return b.Blogs[len(b.Blogs)-1].Id + 1
	}
}

func (b *Blogger) GetBlog(blogId int) *PostContent {
	for _, blog := range b.Blogs {
		if blog.Id == blogId {
			return blog
		}
	}
	return nil
}

func (b *Blogger) AddComment(comment PostContent, blogId int) {
	b.Comments[blogId] = append(b.Comments[blogId], &comment)
}

func (b *Blogger) ShowComment(blogId int) {
	blog := b.GetBlog(blogId)
	fmt.Println("博主名称：", b.Name)
	fmt.Println("博客内容：", blog.Content)
	for _, value := range b.Comments[blogId] {
		fmt.Println("粉丝名称：", value.PostMan)
		fmt.Println("评论内容：", value.Content)
	}
}

type BloggerInterfacer interface {
	Attach(f FansInterfacer)
	Detach(f FansInterfacer)
	Notify(blogId int)
}

func (b *Blogger) Attach(f FansInterfacer) {
	b.Fans = append(b.Fans, f)
}

func (b *Blogger) Detach(f FansInterfacer) {
	for i := 0; i < len(b.Fans); i++ {
		if b.Fans[i] == f {
			b.Fans = append(b.Fans[:i], b.Fans[i+1:]...)
		}
	}
}

func (b *Blogger) Notify(blogId int) {
	for _, fan := range b.Fans {
		fan.Update(b, blogId)
	}
}

type PostContent struct {
	Id          int
	Content     string
	CommentTime time.Time
	Type        int
	PostMan     string
	To          string
}

type Fans struct {
	Base
}

type FansInterfacer interface {
	Update(blogger BloggerInterfacer, blogId int)
	Action(blogger BloggerInterfacer, blogId int)
}

type FineFans struct {
	Fans
}

func (f *FineFans) Update(blogger BloggerInterfacer, blogId int) {
	fmt.Printf("Hello: %s你所关注的博主发布了一条新的博客\n", f.Name)
	f.Action(blogger, blogId)
}
func (f *FineFans) Action(blogger BloggerInterfacer, blogId int) {
	bloggerI, ok := blogger.(*Blogger)
	if ok {
		blog := bloggerI.GetBlog(blogId)
		// fmt.Println(blog)
		cType := blog.Type
		message := ""
		switch cType {
		case 1:
			message = "good blog"
		case 2:
			message = "bad blog"
		}
		comment := PostContent{0, message, time.Now(), cType, f.Name, bloggerI.Name}
		bloggerI.AddComment(comment, blogId)
		bloggerI.ShowComment(blogId)
	}
}

type BadFans struct {
	Fans
}

func (f *BadFans) Update(blogger BloggerInterfacer, blogId int) {
	fmt.Printf("Hello: %s你所关注的博主发布了一条新的博客\n", f.Name)
	f.Action(blogger, blogId)
}
func (f *BadFans) Action(blogger BloggerInterfacer, blogId int) {
	bloggerI, ok := blogger.(*Blogger)
	if ok {
		blog := bloggerI.GetBlog(blogId)
		// fmt.Println(blog)

		cType := blog.Type
		message := ""
		switch cType {
		case 1:
			message = "good blog"
		case 2:
			message = "bad blog"
		}
		comment := PostContent{0, message, time.Now(), cType, f.Name, bloggerI.Name}
		bloggerI.AddComment(comment, blogId)
		bloggerI.ShowComment(blogId)
	}
}

type Base struct {
	Id   int
	Name string
}

func main() {
	blg := newBlogger("博主1号")

	fineFans := new(FineFans)
	fineFans.Id = 1
	fineFans.Name = "粉丝1号"
	blg.Attach(fineFans)
	// blg.Detach(fineFans)
	// for _, value := range blg.Fans {
	// 	fmt.Println(value)
	// }
	blg.PostBlog("这是第一条blog", 1)
}
