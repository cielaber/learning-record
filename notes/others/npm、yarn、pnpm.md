# npm、yarn、pnpm

### npm

#### node_modules结构原理

##### npm@3之前

在npm@3之前，假如：项目中直接依赖foo(foo拥有子依赖bar)，node_modules结构是这样的：

```text
node_modules
└─ foo
   ├─ index.js
   ├─ package.json
   └─ node_modules
      └─ bar
         ├─ index.js
         └─ package.json
```

导致：

- 软件包经常创建太深的依赖树，在Windows上会出现长目录路径问题。
- 如果有多个依赖同时依赖一个相同的包，这个包会被重复安装多次。

为了解决相同包被安装多次的问题，npm引入peerDependencies，其功能为：当foo声明bar为peerDependencies时，如果项目安装foo，会先检查项目中是否安装了依赖bar，如果有则跳过这个声明，如果没有，则会安装bar到node_modules下，其结构如下：

```text
node_modules
├─ foo
|  ├─ index.js
|  └─ package.json
└─ bar
   ├─ index.js
   └─ package.json
```

这就导致了一个问题：Phantom dependencies(幽灵依赖)，由于项目没有直接依赖bar，但是在项目中却能够直接引入bar，这时候bar就成了幽灵依赖。

##### npm@3

peerDependencies只解决了一部分问题，在npm@3时，将嵌套结构改为扁平结构，不管是直接依赖还是子依赖，都直接安装在node_modules根目录下，如果项目中直接依赖foo(foo拥有子依赖bar)，其结构为：

```text
node_modules
├─ foo
|  ├─ index.js
|  └─ package.json
└─ bar
   ├─ index.js
   └─ package.json
```

这种扁平化会导致更多的幽灵依赖，如果之后foo取消了bar的依赖，对bar的引用就会报错。

并且，相同依赖怎么办？

如果项目中直接依赖foo@1(foo@1拥有子依赖bar@1.2)，又直接依赖bar@1.1，则会检查已安装bar@1.2依赖是否满足即将要安装bar@1.1依赖的版本范围，如果满足，则直接使用已安装的bar@1.2依赖，不重新安装bar@1.1，不满足，则重新安装bar@1.1，其结构会变为如下：

```text
node_modules
└─ foo@1
|  ├─ index.js
|  ├─ package.json
|  └─ node_modules
|     └─ bar@1.2
|       ├─ index.js
|       └─ package.json
└─ bar@1.1
   ├─ index.js
   └─ package.json
```

因此，这并没有解决依赖冗余问题，并且还有新的问题：依赖结构的不确定性。

例如，如果项目中直接先依赖foo@1(foo@1拥有子依赖bar@1)，再直接依赖foo@2(foo@2拥有子依赖bar@2)，由于package.json中的依赖安装顺序是从上到下的，其依赖结构会是如下：

```text
node_modules
└─ foo@1
|  ├─ index.js
|  ├─ package.json
|  └─ node_modules
|     └─ bar@1
|       ├─ index.js
|       └─ package.json
└─ foo@2
|  ├─ index.js
|  └─ package.json
└─ bar@2
```

但如果项目中先直接依赖foo@2，再直接依赖foo@1，则其结构如下：

```
node_modules
└─ foo@2
|  ├─ index.js
|  ├─ package.json
|  └─ node_modules
|     └─ bar@2
|       ├─ index.js
|       └─ package.json
└─ foo@1
|  ├─ index.js
|  └─ package.json
└─ bar@1
```

这就因为依赖顺序而改变了node_modules结构，造成的不确定性可能会产生隐患。

此外，如果在上面基础上，项目还依赖foo@3(foo@3拥有子依赖bar@2)，由于bar@1被打平，foo@2和foo@3中的bar@2只能存在于foo@2和foo@3的node_modules中，则会形成以下结构：

```text
node_modules
└─ foo@2
|  ├─ index.js
|  ├─ package.json
|  └─ node_modules
|     └─ bar@2
|       ├─ index.js
|       └─ package.json
└─ foo@1
|  ├─ index.js
|  └─ package.json
└─ bar@1
└─ foo@3
   ├─ index.js
   └─ package.json
   └─ node_modules
			└─ bar@2
```

这就形成了NPM doppelgangers(分身依赖)：项目中依赖的第三方包以及第三方包所依赖的同名包都会被重复安装。分身依赖可能造成以下隐患：

- 项目打包会将这些“重身”的依赖都进行打包，增加产物体积。
- 无法共享库实例，引用的得到的是两个独立的实例。
- 重复 TypeScript 类型，可能会造成类型冲突。

#### peerDependencies

peerDependencies称为对等依赖或同伴依赖，用于指定当前包（也就是你写的包）兼容的宿主版本。

对于peerDependencies，在npm版本1、2和7将自动安装peerDependencies，如果它们在依赖关系树中没有明确依赖于更高级别。就是说如果用户在根目录的package.json文件里显式依赖了核心库，那么各个子项目里的peerDepenedencies声明就可以忽略，否则就会安装。

对于npm版本3到6，您将收到一条警告，提示未安装对等依赖项，需要手动安装。

由于npm@3之后将嵌套结构改为扁平结构改为扁平结构，npm@7又会自动安装peerDependencies，因此很容易造成同一个包多次安装且版本不兼容的问题，npm无法解决此冲突，因此会中断下载过程，让用户手动解决。

解决该问题的方式是使用指令`--legacy-peer-deps`或`--force`。

- `--legacy-peer-deps`：告诉npm忽略项目中引入的各个依赖模块之间依赖相同但版本不同的问题，以npm v4-v6的方式去继续执行安装操作，在v4-v6中则是忽略peerDepenedencies声明。
- `--force`：无视本地已有依赖，强制下载。如果某些依赖项显式地声明了其需要的版本，即使使用 `--force` 命令，也不会覆盖已经安装过的旧版本。

#### package-lock.json

npm采用[semver](https://semver.org/lang/zh-CN/)表示法管理版本， 在 package.json 中：

- 如果写入的是 `〜0.13.0`，则只更新补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。
- 如果写入的是 `^0.13.0`，则要更新补丁版本和次版本：即 `0.13.1`、`0.14.0`、依此类推。
- 如果写入的是 `0.13.0`，则始终使用确切的版本。

这样会导致的依赖的不确定性，为解决semver管理版本带来的问题，npm@5引入`package-lock.json`文件进行版本锁定，只要`package.json`和`package-lock.json`一致，安装的依赖包就会一致。

#### 缓存

npm会将下载的包进行缓存，在npm@5之前，每个缓存的模块在 ~/.npm 文件夹中以模块名的形式直接存储，储存结构是{cache}/{name}/{version}。

在npm@5中，相关信息被存放在package-lock.json中。具体原理参考：https://juejin.cn/post/6984062167339237389

### yarn

yarn出生于npm@3时期，其解决的问题与npm后续版本解决的问题相似。

主要使用**yarn.lock**解决依赖不确定性问题(类似`package-lock.json`)，采用并行下载策略解决依赖安装速度的问题(npm采用顺序下载，当一个下载完之后才下载下一个依赖。)。

### pnpm

#### hard link

hard link(硬链接)：同一个文件拥有多个文件名，当某一处修改该文件时，其他文件名的引用也会被修改。

pnpm 通过hard link机制，使计算机中不同项目下的相同的依赖实际上只有一份。npm、yarn则是通过复制或者重新下载。

只有相同版本的依赖不会重新下载，不同版本的依赖还是会重新下载。如果同一个依赖由版本1更新为版本2，则重新下载版本2，版本1不会被删除，还是会存在存储中。

#### pnpm 存储开销问题

依赖越来越多导致的存储开销问题，pnpm提供`pnpm store prune`，从存储中删除未被引用的包。

#### node_modules结构原理

如果一个项目下直接依赖foo@1.0.0(foo@1.0.0拥有子依赖bar@2.0.0)，其node_modules结构如下：

```text
-> - a symlink(软链接)

node_modules
├─ foo -> .pnpm/foo/1.0.0/node_modules/foo
└─ .pnpm
   ├─ foo/1.0.0/node_modules
   |  ├─ bar -> ../../bar/2.0.0/node_modules/bar
   |  └─ foo
   |     ├─ index.js
   |     └─ package.json
   └─ bar/2.0.0/node_modules
      └─ bar
         ├─ index.js
         └─ package.json
```

其中.pnpm中平铺着所有直接依赖和直接依赖的子依赖，每个依赖拥有node_modules目录，其下包含依赖本身和子依赖的硬链接或软链接。

例如：.pnpm/foo/1.0.0/node_modules/foo和.pnpm/bar/2.0.0/node_modules/bar均为硬链接，指向依赖真实存储地址。

.pnpm/foo/1.0.0/node_modules/bar则为软链接，链接到.pnpm/bar/2.0.0/node_modules/bar

直接依赖通过soft link(symlink、软链接)链接到.pnpm中对应的硬链接。

pnpm存在一个全局store，用于存储真实依赖，所有的硬链接都链接到store中的真实依赖。

一个其他地方的例子，他有图方便理解（注意他这里是bar@1.0.0依赖foo@1.0.0）：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2579a1f5207a4837a049fd7c6619211e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

源自：https://juejin.cn/post/7036319707590295565#heading-1

pnpm的机制解决了下载速度、存储开销、幽灵依赖(因为node_modules下只有package.json中显式声明的依赖)、分身依赖(因为同一个版本的包只有一个)等问题。

通过软链接的设计既保证了不会出现幽灵依赖的问题，同时也能兼容 node 的寻找模块方式。通过硬链接的方式保证了相同的包不会被重复下载。

而且由于依赖本身和依赖的子依赖都放在`node_modules`中的设计，巧妙的避免了循环软链接的问题。

pnpm中的peerDependencies：https://pnpm.io/zh/how-peers-are-resolved

时间线参考：https://zhuanlan.zhihu.com/p/451025256

npm中文文档：https://nodejs.cn/npm/