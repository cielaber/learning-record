# git命令

![bg2015120901](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015120901.png)

- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库



### git init

初始化一个本地仓库



### git config --list

查看当前git配置



### git config -e [--global]

编辑git配置文件



### git config --global user.name "xxx"

配置所有本地仓库的用户名



### git config --global user.email "xxx"

配置所有本地仓库的email



### git add xxx

添加文件到暂存区



### git commit -m "xxx"

将暂存区的文件提交到分支，并添加描述说明



### git status

查看当前仓库的状态，是否有文件被修改



### git diff

查看仓库文件具体的修改内容



### git log

由近到远地显示历史提交日志



### git reflog

记录仓库历史命令，可用来查看版本号



### git reset --hard xxx

版本回退到固定版本，xxx表示版本号



### git checkout -- xxx

撤销修改，这里有两种情况

一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。



### git rm xxx

将文件从本地版本库中删除

git rm命令是从本地仓库中删除文件，如果工作区被删除的文件之前被添加进了暂存区或本地仓库，可以用`git checkout -- xxx`命令恢复。



### git remote add xxx_name xxx_url

关联远程仓库

- xxx_name是远程仓库在本地仓库的别名
- xxx_url是远程仓库的地址



### git fetch xxx_name xxx_remoteBranch

取回远程xxx_name仓库xxx_remoteBranch分支的更新

- xxx_remoteBranch如果省略则代表取回所有分支的更新



### git pull xxx_name xxx_remoteBranch:xxx_localBranch

取回远程某个分支的更新并合并，相当于先做`git fetch`再做`git merge`

如果需要采用rebase合并，则`git pull --rebase xxx_name xxx_remoteBranch:xxx_localBranch`。通常pull的情况下报错`failed to push some refs to git`时采用这个方法解决。

- xxx_name指远程主机在本地的别名
- xxx_remoteBranch指远程分支名，如果省略（`git pull xxx_name xxx_remoteBranch`），则表示与本地当前分支合并。
- 如果当前分支与远程分支存在追踪关系，则两个分支名都可省略（`git pull xxx_name`）。
- 如果当前分支只有一个追踪分支，则远程主机名也可以省略（`git pull`）。



### git push xxx_name xxx_localBranch:xxx_remoteBranch

将本地仓库的更新推送到远程仓库

- xxx_name指远程主机在本地的别名
- xxx_localBranch指本地分支名，如果省略（`git push xxx_name :xxx_remoteBranch`），则表示删除远程的某个分支，因为这等同于推送一个空的本地分支到远程分支。
- xxx_remoteBranch指远程分支名，如果省略（`git push xxx_name xxx_localBranch`），则表示推送到与本地分支存在“追踪关系”的远程分支，一般是同名分支，如果不存在远程同名分支，则会新建一个与本地分支同名的远程分支。
- 如果当前分支与远程分支存在追踪关系，xxx_localBranch与xxx_remoteBranch都可以省略（`git push xxx_name`），则表示将当前分支推送远程仓库的对应分支。
- git push -u xxx_name xxx_localBranch表示将本地该分支推送到远程仓库的对应分支，并制定xxx_name为默认主机，之后就可以不加任何参数使用`git push`命令了。



### git branch --set-upstream xxx_localBranch xxx_name/xxx_remoteBranch

指定本地xxx_localBranch分支追踪远程xxx_name仓库的xxx_remoteBranch分支



### git clone xxx_url xxx_filename

从远程仓库克隆一个仓库到本地

- xxx_fileanme代表指定的目录，省略则代表本地生成一个同名目录。



### git branch

列出所有分支、查看当前分支（*指当前分支）



### git branch -r

查看远程分支



### git branch -a

查看所有分支

- *代表本地主机的当前分支
- 远程分支前面有remote关键字

### git branch xxx

创建分支



### git branch -d xxx

删除分支



### git switch xxx

切换分支



### git checkout xxx

切换到该分支



### git switch -c xxx

创建xxx分支并切换到该分支



### git checkout -b xxx

创建xxx分支并切换到该分支



### git merge xxx_name/xxx_remoteBranch

合并xxx_remoteBranch分支到当前分支（实际就是当前分支指向了该分支）



### git rebase xxx_name/xxx_remoteBranch

合并xxx_remoteBranch分支到当前分支（实际就是当前分支指向了该分支）



### git log --graph

查看分支合并图









