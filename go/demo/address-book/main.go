package main

import (
	"fmt"
)

type Person struct {
	userName     string
	addressPhone map[string]string
}

var personList = make([]Person, 0)

func main() {
	for {
		scanNum()
	}
}

func scanNum() {
	fmt.Println("添加联系人信息，请按1")
	fmt.Println("删除联系人信息，请按2")
	fmt.Println("查询联系人信息，请按3")
	fmt.Println("编辑联系人信息，请按4")

	var num int
	fmt.Scan(&num)
	switchType(num)
}

func switchType(n int) {
	switch n {
	case 1:
		addPerson()
	case 2:
		removePerson()
	case 3:
		findPerson()
	case 4:
		editPerson()
	}
}

func addPerson() {
	var name string
	var address string
	var phone string
	var addressPhone = make(map[string]string)
	var exit string
	fmt.Println("请输入姓名")
	fmt.Scan(&name)

	for {

		fmt.Println("请输入电话类型")
		fmt.Scan(&address)
		fmt.Println("请输入电话号码")
		fmt.Scan(&phone)

		addressPhone[address] = phone

		fmt.Println("如果结束电话的录入，请按Q")
		fmt.Scan(&exit)
		if exit == "Q" {
			break
		} else {
			continue
		}
	}

	personList = append(personList, Person{userName: name, addressPhone: addressPhone})

	showPersonList()
}

func showPersonList() {
	if len(personList) == 0 {
		fmt.Println("暂时没有联系人信息")

	} else {
		for _, value := range personList {
			fmt.Println("姓名：", value.userName)
			for k, v := range value.addressPhone {
				fmt.Println("电话类型：", k)
				fmt.Println("电话号码：", v)
			}
		}
	}
}

func removePerson() {
	var name string
	var index int = -1
	fmt.Println("请输入要删除的联系人姓名：")
	fmt.Scan(&name)

	for i := 0; i < len(personList); i++ {
		if personList[i].userName == name {
			index = i
			break
		}
	}
	if index != -1 {
		personList = append(personList[:index], personList[index+1:]...)
	}
	showPersonList()
}

func findPerson() *Person {
	var name string
	var index = -1
	fmt.Println("请输入要查询的联系人姓名：")
	fmt.Scan(&name)
	for k, value := range personList {
		if value.userName == name {
			index = k
			fmt.Println("联系人姓名：", value.userName)
			for key, v := range value.addressPhone {
				fmt.Printf("%s:%s\n", key, v)
			}
		}
	}

	if index == -1 {
		fmt.Println("没有找到联系人信息")
		return nil
	} else {
		return &personList[index]
	}
}

func editPerson() {
	var p *Person
	var name string
	var num int
	var menu = make([]string, 0)
	var pNum int
	var phone string
	p = findPerson()
	if p != nil {
		for {
			fmt.Println("编辑用户名称请按:5,编辑电话请按:6,退出请按:7")
			fmt.Scan(&num)
			switch num {
			case 5:
				fmt.Println("请输入新的姓名：")
				fmt.Scan(&name)
				p.userName = name
				showPersonList()
			case 6:
				var j int
				for key, value := range p.addressPhone {
					fmt.Println("编辑(", key, ")", value, "请按:", j)
					menu = append(menu, key)
					j++
				}
				fmt.Println("请输入编辑号码的类型：")
				fmt.Scan(&pNum)
				for index, v := range menu {
					if index == pNum {
						fmt.Println("请输入新的电话号码：")
						fmt.Scan(&phone)
						p.addressPhone[v] = phone
					}
				}
			}
			if num == 7 {
				break
			}
		}
	} else {
		fmt.Println("没有找到要编辑的联系人信息")
	}
}
