## 克隆项目

https://gitee.com/zhang_renyang/front-monitor.git

## 安装配置nginx

```
brew install nginx

vim /opt/homebrew/etc/nginx/nginx.conf
```

修改配置文件如下

```js
user eternitywith admin; # 中间是用户名
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$time_iso8601	-	-	$remote_addr	$http_host	$status	$request_time	$request_length	$body_bytes_sent	15d04347-be16-b9ab-0029-24e4b6645950	-	-	9689c3ea-5155-2df7-a719-e90d2dedeb2c	937ba755-116a-18e6-0735-312cba23b00c	-	$request_uri	$http_user_agent	-	sample=-&_UC_agent=-&device_id=-&-	-	-	-';

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;
        if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})") {
         set $year $1;
         set $month $2;
         set $day $3;
         set $hour $4;
         set $minute $5;
        }

        access_log  logs/$year$month-$day-$hour-$minute.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    include servers/*;
}
```

进入 /opt/homebrew/opt/nginx/html，放置静态资源。

```js
sudo nginx //启动nginx 
sudo nginx -s stop //停止nginx
sudo nginx -s reload //重启ngin
nginx -V // 查看配置路径
```

server/src/configs/common.js文件中修改nginx的日志位置

## mysql

安装mysql

新建数据库：plantform

server/src/configs/mysql.js文件中修改数据库配置

终端进入mysql之后执行以下两条命令使服务能够用原始密码连接数据库：

```sql
ALERT USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'eternity';

FLUSH PRIVILEGES;
```


## redis

安装redis

## 其他

上面nginx、mysql都安装完成能启动之后。

npm run watch

生成建表的sql文件: `node dist/fee.js Utils:GenerateSQL 1 "2023-06" "2023-06" > init.sql`，然后在plantform数据库中执行生成的init.sql文件自动建表。

plantform表执行语句，新建一个项目数据：

```sql
REPLACE INTO `t_o_project` (`id`, `rate`, `display_name`, `project_name`, `c_desc`, `is_delete`, `create_ucid`, `update_ucid`, `create_time`, `update_time`) VALUES (1, 100, '示例项目', 'template', '负责人', 0, '', '', 0, 0)
```

启动sdk项目，进行日志上报，nginx中收集日志。

执行命令对nginx中的日志进行收集: `node dist/fee.js SaveLog:Nginx`，该指令会将上一分钟的nginx中的日志进行数据清理并收集到server/log/nginx目录中。

执行命令将数据入库：`node dist/fee.js Parse:Performance "2023-06-13 22:38" "2023-06-13 22.38"`，该指令会将指定的时间间隔内的收集好的性能相关的日志导入到 `Performance`表中。

```bash


// 按小时汇总
node dist/fee.js Summary:Performance "2023-06-13 22" hour 

// 按天汇总
node dist/fee.js Summary:Performance "2023-06-13" day

// 按月汇总
node dist/fee.js Summary:Performance "2023-06" month

// 按小时入库
node dist/fee.js Parse:TimeOnSiteByHour "2023-06-14 08:49" "2023-06-14 08:49"

// 按天汇总
node dist/fee.js Summary:TimeOnSite "2023-06-14" day

// 按月汇总
node dist/fee.js Summary:TimeOnSite "2023-06" month

// 入库error数据
node dist/fee.js Parse:Monitor "2023-06-14 08:30" "2023-06-14 08.30"

// 汇总error数据
node dist/fee.js Summary:Error "2023-06-14 08:30" minute
node dist/fee.js Summary:Error "2023-06-14 08" hour
node dist/fee.js Summary:Error "2023-06-14" day

// 设备数据
node dist/fee.js Parse:Device "2023-06-14 22:11" "2023-06-14 22.11"
node dist/fee.js Summary:SystemBrowser "2023-06" month
node dist/fee.js Summary:SystemDevice "2023-06" month
node dist/fee.js Summary:SystemOS "2023-06" month
node dist/fee.js Summary:SystemRuntimeVersion "2023-06" month
```

## fee

```js
yum install gcc gcc-c++ gdb autoconf automake -y
yum install librdkafka-devel -y
```

```js
git clone https://github.com/LianjiaTech/fee.git
wget http://img.zhufengpeixun.cn/fee.zip
```

```
https://www.nuget.org/downloads

```

server目录

```js
cd server
npm install
npm run watch
npm run fee Utils:TemplateSQL 
node dist/fee.js Utils:TemplateSQL
```

client目录

```js
cnpm install
npm run build
cp -f dist/* /usr/share/nginx/monitor/
```

```js
error_log  /var/log/nginx/error.log warn;
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
access_log  /var/log/nginx/access.log  main;

include /etc/nginx/conf.d/*.conf;
```

```js
server {
    listen       80;
    server_name  monitor.zhufengpeixun.cn;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/monitor;
        index  index.html index.htm;
    }
}
```

文件被占用导致操作无法完成怎么办？
https://jingyan.baidu.com/article/948f5924d1c3a2d80ff5f98d.html

```js
 if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})") {
        set $year $1;
        set $month $2;
        set $day $3;
        set $hour $4;
        set $minute $5;
    }
    access_log  /var/log/nginx/access/$year$month/$day/$hour/$minute.log  main;
```

```js
$time_local	-	-	$http_x_real_ip	$http_host	$status	$request_time	$request_length	$body_bytes_sent	15d04347-be16-b9ab-0029-24e4b6645950	-	-	9689c3ea-5155-2df7-a719-e90d2dedeb2c 937ba755-116a-18e6-0735-312cba23b00c	$request	- 	$http_user_agent	-	sample=-&_UC_agent=-&lianjia_device_id=-&-	-	-	-
```

node-gyp，是由于node程序中需要调用一些其他语言编写的 工具

```js
npm install --global --production windows-build-tools
  python(v2.7 ，3.x不支持);
  visual C++ Build Tools,或者 （vs2015以上（包含15))
  net framework 4.5.1
npm install -g node-gyp
```

```js

node dist/fee.js -h

node dist/fee.js SaveLog:Nginx

CreateCache
node dist/fee.js  CreateCache:UpdatePerOneMinute

Parse
node dist/fee.js Parse:Device "2020-06-12 12:33" "2020-06-12 12:33"
node dist/fee.js Parse:MenuClick "2020-06-11 19:09" "2020-06-11 19:09"
node dist/fee.js Parse:Monitor "2020-06-11 21:05" "2020-06-11 21:05"
node dist/fee.js Parse:Performance "2020-06-11 15:54"   "2020-06-11 15:55"
node dist/fee.js Parse:TimeOnSiteByHour "2020-06-11 19:20"   "2020-06-11 19:20"
node dist/fee.js Parse:UV "2020-06-11 20:06"   "2020-06-11 20:06"
node dist/fee.js Parse:UserFirstLoginAt "2020-06-11 20:06" minute


Summary
node dist/fee.js Summary:Error "2020-06-11 21:05"   minute
node dist/fee.js Summary:HttpError "2020-06-11"   day
node dist/fee.js Summary:NewUser "2020-06-11"   day
node dist/fee.js Summary:Performance "2020-06-11"   day
node dist/fee.js Summary:SystemBrowser "2020-06"   month
node dist/fee.js Summary:SystemDevice "2020-06"   month
node dist/fee.js Summary:SystemOS "2020-06"   month
node dist/fee.js Summary:SystemRuntimeVersion "2020-06"  month
node dist/fee.js Summary:TimeOnSite "2020-06"  month
node dist/fee.js Summary:UV "2020-06-11 19"  hour
node dist/fee.js Summary:UV "2020-06-11"  day
node dist/fee.js Summary:UV "2020-06"  month

Task
node dist/fee.js Task:Manager

node dist/fee.js Utils:CleanOldLog
node dist/fee.js Utils:GenerateSQL
node dist/fee.js Utils:TemplateSQL
node dist/fee.js Utils:Test

WatchDog
node dist/fee.js WatchDog:Alarm
node dist/fee.js WatchDog:Saas
```

```js
 log_format  main '$time_iso8601	-	-	$remote_addr	$http_host	$status	$request_time	$request_length	$body_bytes_sent	15d04347-be16-b9ab-0029-24e4b6645950	-	-	9689c3ea-5155-2df7-a719-e90d2dedeb2c 937ba755-116a-18e6-0735-312cba23b00c	-	-	$request	$http_user_agent	-	sample=-&_UC_agent=-&lianjia_device_id=-&-	-	-	-';
 #access_log  logs/access.log  main;
```
