# node进程

### 进程

在Node.js中每个应用程序都是一个进程类的实例对象。

使用`process`对象代表应用程序，这是一个全局对象，可以通过它来获取Node.js应用程序以及运行该程序的用户、环境等各种信息的属性、方法和事件。

#### process对象属性

- execPath：可执行文件的绝对路径
- version：版本号
- versions：依赖库的版本号
- platform：运行平台。如darwin、freebsd、linux、sunos、win32
- stdin：标准输入流
- stdout：标准输出可写流，同步操作
- stderr：错误输出可写流，同步操作
- argv：执行参数数组
- env：操作系统环境信息
- pid：应用程序进程id
- title：窗口标题
- arch：处理器架构

#### memoryUsage方法