# Go语言基础

### 语法基础

#### 数组

1. 声明和赋值：

   ```go
   var arr1 [5]int
   arr2 := [5]int{1, 2, 3, 4, 5}
   arr3 := [...]int{1, 2, 3, 4, 5}
   ```
2. 数组属于值类型，数组作为函数参数，函数内修改数组不会改变原有数组。

#### 切片

1. 声明和赋值：

   ```go
   var s1 []int
   s2 := []int{1, 2}
   s3 = make([]int, 5, 5)

   arr = [5]int{0, 1, 2, 3, 4}
   s4 := arr[1, 3] // 从数组产生的切片，修改切片会改变原数组对应的值
   ```
2. 使用数组/切片产生的切片，切片容量为被切起始到剩余容量的长度。且超出长度的部分仍能被下一次切割时访问到，但不能超越最原始的底层数组，如下：

   ```go
   	arr := [...]int{0, 1, 2, 3, 4, 5, 6, 7}

   	s := arr[2:6]

   	fmt.Println(s) // [2 3 4 5]
   	fmt.Println(len(s)) // 4
   	fmt.Println(cap(s)) // 6
   	s1 := s[3:5] // 此时切片已经超出了s切片的长度范围，但是由于没有超出其容量范围，剩余部分仍能被访问到并产生新的切片
   	fmt.Println(s1) // [5 6]
   	fmt.Println(len(s1)) // 2
   	fmt.Println(cap(s1)) // 3

   ```
3. 切片作为函数参数，函数内修改切片会修改原有切片。

   ```go
   // go语言中底层对切片的定义为一个结构体，其中存储值的部分是一个Pointer类型
   type slice struct {
     array unsafe.Pointer
     len int
     cap int
   }
   // 而Pointer类型本质是一个指针
   type Pointer *ArbitraryType

   // 因此当函数传参传入一个切片时，实际上传入的是一个内存地址，因此在函数中修改切片会修改原切片的值。
   ```
4. 切片作为函数参数，当在函数中对切片有扩容操作时，函数中的切片会被分配新的内存空间，此时，函数内的切片与原切片已经是两个不同的切片，函数内切片的操作都不会改变原切片。

   ```go
   package main

   import "fmt"

   func main() {
   	s := make([]int, 5)
   	fmt.Println(s) // [0 0 0 0 0]
   	// changeSlice(s)
   	appendSlice(s)
     fmt.Println(s) // changeSlice：[1 0 0 0 0]  appendSlice：[0 0 0 0 0]
   }

   func changeSlice(funcS []int) {
   	funcS[0] = 1;
   }

   func appendSlice(funcS []int) {
   	for i := 0; i < 3; i++ {
   		funcS = append(funcS, i)
   	}
   	funcS[0] = 1;
   	fmt.Println(funcS) // [1 0 0 0 0 0 1 2]
   }
   ```

#### Map

1. 声明和赋值：

   ```go
   var m map[int]string
   m1 := map[int]string{1: 'a', 2: 'b'}
   m2 := make(map[string]int)
   ```
2. map作为函数参数，函数内修改map会修改原有map。原因和切片类似，map的本质也是一个结构体指针。

#### 结构体

1. 声明和赋值：

   ```go
   type Student struct {
     id int
     name string
   }

   var s Student = Student{id: 1, name: "zhangsan"}
   s1 := Student{id: 2, name: "lisi"}
   ```
2. 结构体作为函数参数，函数内修改结构体不会修改原有结构体。

#### 指针

Go语言中的指针操作非常简单，只需要记住两个符号：`&`（取地址）和 `*`（根据地址取值）。

- 对变量进行取地址（&）操作，可以获得这个变量的指针变量。
- 指针变量的值是指针地址。
- 对指针变量进行取值（*）操作，可以获得指针变量指向的原变量的值。

1. []的优先级高于*，因此如果要获取数组指针的某一项的值需要先用括号获取指针的值：`(*p)[0]`。当然，go语言提供了数组指针的简写方式：`p[0]`。

   ```go
   nums := [2]int{10, 20}
   var p *[2]int
   p = &nums
   fmt.Println((*p)[0]) // 10
   fmt.Println(p[1]) // 20
   ```
2. 但如果是从指针数组中取值，则先是：`*p[0]`。

   ```go
   var p[2]*int
   var i int = 10
   var j int = 20
   p[0] = &i
   p[1] = &j
   fmt.Println(*p[0]) // 10
   ```
3. 切片指针中取值只有一种写法：`(*p)[0]`，而不支持 `p[0]`的写法。

   ```go
   s := []int{10, 20}
   var p *[]int
   p = &s
   fmt.Println((*p)[0]) // 10
   // fmt.Println(p[0]) // 该写法不支持
   ```

> 等号左边的变量代表变量所指向的内存空间，等号右边的变量代表变量内存空间存储的数据值。
>
> 案例：实现一个两个变量交换
>
> func fn(a, b *int) {
>
>     *a, *b = *b, *a
>
> }
>
> func mian() {
>
>     a, b := 10, 20
>
>     fn(&a, &b)
>
> }

#### range

1. 修改range得到后的value，不影响原始切片或数组的值。

### 面向对象

1. 匿名字段继承

   ```go
   type Person struct {
     id   int
     name string
     age  int
   }
   type Student struct {
     Person // 匿名字段，只有类型，没有成员的名字
     score  float64
   }
   stu := Student{Person{id: 1, name: "zhangsan", age: 18}, 18.5} // 第一种实例化的方法
   fmt.Println(stu) // {{1 zhangsan 18} 18.5}
   fmt.Println(stu.Person.name) // zhangsan
   fmt.Println(stu.name) // zhangsan
   stu1 := Student{Person: Person{id: 2, name: "lisi"}} // 第二种实例化的方法
   fmt.Println(stu1) // {{2 lisi 0} 0}
   fmt.Println(stu1.Person.name) // lisi
   fmt.Println(stu1.name) // lisi
   ```
2. 指针类型匿名字段

   ```go
   type Person struct {
     id   int
     name string
     age  int
   }
   type Student struct {
     *Person // 指针类型的匿名字段
     score  float64
   }
   stu := Student{&Person{id: 1, name: "zhangsan", age: 18}, 18.5}
   fmt.Println(stu) // {0xc000062020 18.5}
   fmt.Println(stu.Person.name) // zhangsan
   fmt.Println(stu.name) // zhangsan
   stu1 := Student{Person: &Person{id: 2, name: "lisi"}}
   fmt.Println(stu1) // {0xc000062040 0}
   fmt.Println(stu1.Person.name) // lisi
   fmt.Println(stu1.name) // lisi
   ```
3. 为结构体添加方法

   ```go
   type Person struct {
   	id   int
   	name string
   	age  int
   }
   func (p Person) GetPerson() {
   	fmt.Println(p)
   }
   // 如果要修改结构体的值，需要把参数定义为指针类型
   func (p *Person) ChangePerson() {
     (*p).age = 10
   	// p.age = 10 // 简写
   }
   person := Person{name: "zhangsan"}
   person.GetPerson() // {0 zhangsan 0}
   person.ChangePerson()
   person.GetPerson() // {0 zhangsan 10}
   ```
4. 方法的多种调用方式

   ```go
   type Person struct {
   	id   int
   	name string
   	age  int
   }
   func (p *Person) GetInfo() {
   	fmt.Println(*p)
   }

   person := Person{name: "zhangsan"}

   // 直接点调用
   person.GetInfo() 
   // 将实例的方法值赋值给另一个变量调用
   f1 := person.GetInfo 
   f1()
   // 通过结构体并传入实例作为参数来调用
   f2 := (*Person).GetInfo
   f2(&person)
   ```
5. 接口

   ```go
   type Personer interface {
     SayHello()
   }
   type Student struct {}

   func (s *Student) SayHello() {
     fmt.Println("hello")
   }

   var stu Student
   var person Personer
   person = &stu
   // 通过调用Student结构体实现的方法，该方式的要求是，Student结构体必须实现Personer接口生命的所有方法，如果Personer接口中有方法Student没实现，则无法通过这种方式调用接口。
   person.SayHello() 

   ```
6. 接口实现多态

   ```go
   type Personer interface {
     SayHello()
   }

   type Stundent struct {}

   func (s *Student) SayHello() {
     fmt.Println("老师好")
   }

   type Teacher struct {}

   func (t *Teacher) SayHello() {
     fmt.Println("学生好")
   }

   func WhoSayHello(p Personer) {
     p.SayHello()
   }

   func main() {
   	var stu Student
     var teacher Teacher
     WhoSayHello(&stu) // 老师好
     WhoSayHello(&teacher) // 学生好
   }
   ```
7. 接口继承与转换

   ``` go
   type Humaner interface {
     SayHello()
   }
   type Personer interface {
     Humaner,
     Say()
   }

   type Student Struct {}

   func (s *Student) SayHello() {
     fmt.Println("大家好")
   }
   func (s *Student) Say() {
     fmt.Println("你好")
   }

   func main() {
     var stu Student
     var per Personer
     per = &stu
     per.Say()
     // 可以调用所继承的接口中的方法
     per.SayHello()

     var h Humaner
     h = per // Personer可以转换成Humaner
     h.SayHello()
   }
   ```
8. 空接口

   ```go
   var i interface {}
   // 空接口类型可以赋值任何类型的数据
   i = 123
   i = "abc"

   var s []interface{}
   // 空接口类型的切片可以往里面存储任何类型的数据
   s = append(s, 123, "abc", 0.99)
   for j := 0, j < len(s); j++ {
     fmt.Println(s[j])
   }
   ```
9. 类型断言

   通过类型断言，可以判断空接口中存储的数据类型。

   语法：value, ok := m.(T)

   - m：空接口类型变量
   - T：断言的类型
   - 变量m的值
   - ok：如果断言成功为true，否则为false

   ```go
   var i interface{}
   i = 123

   value, ok := i.(int)
   if ok {
     fmt.Println(value) // 123
   } else {
     fmt.Println("类型推断错误")
   }
   ```
