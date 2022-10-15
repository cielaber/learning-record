## 创建项目

1. npm i lerna -g
2. lerna init

## 配置

1. lerna.json 中配置`"npmClient": "yarn"`，标识项目用的包管理器。
2. yarn install

## 初始化

1. 运行`lerna create button`会在packages下创建一个button项目

2. 运行`lerna create icon`会在packages下创建一个icon项目

3. 删除项目下的lib目录，项目下新建src目录和index.ts，src目录下新建对应的.vue文件。

4. 运行`yarn add typescript -W`在项目根目录下安装ts

5. 运行`npx tsc --init`初始化ts配置文件

6. 配置tsconfig.json文件，内容如下：

   ```json
   {
     "compilerOptions": {
       "target": "ESNext",      // 打包的目标语法
       "module": "ESNext",      // 模块转化后的格式     
       "esModuleInterop": true,  // 支持模块转化，比如commonjs的模块支持以import方式引入 
       "skipLibCheck": true, // 跳过类库检测
       "forceConsistentCasingInFileNames": true,   // ts类型强制区分大小写
       "moduleResolution": "node", // 模块解析方式
       "jsx": "preserve", // ts不解析jsx，vue自带jsx的解析规则
       "declaration": true, // 打包时生成声明文件
       "sourceMap": true, // 打包时生成映射文件                                    
     }
   }
   ```

7. 运行`yarn add vue@next -W`在项目根目录下安装vue

8. 新建typings用于存放全局的类型文件

9. 新建typings/vue-shim.d.ts文件为vue写类型垫片，内容如下：

   ```ts
   declare module '*.vue' {
       import { defineComponent, DefineComponent } from "vue";
   
       // const component: ReturnType<typeof defineComponent> // 使用教程中的写法后这里类型结果为any，因此换了以下方式
       const component: DefineComponent
   
       export default component
   }
   
   /** 
   然后在vue文件中，使用defineComponent来定义组件，并使用export default导出，使其在外面的文件中引入.vue文件时能够有正确的类型。
   
   <script lang="ts">
   import { defineComponent } from "vue"
   
   export default defineComponent({
   
   })
   </script>
   **/
   ```
   
   10. button/index.ts中实现注册组件(icon/index.ts类似)，内容如下：
   
   ```ts
   import Button from './src/button.vue'
   
   import { App } from 'vue'
   
   Button.install = (app: App): void => {
       app.component(Button.name, Button)
   }
   
   // 在原有类型上新增install方法
   type IWithInstall<T> = T & { install(app: App): void }
   
   const _Button: IWithInstall<typeof Button> = Button
   
   export default _Button                
   ```
11. vue-shim.d.ts中为组件类型添加install方法，因此需要将component类型声明为如下：
  ```ts
  const component: DefineComponent & { install(app: App): void }
  ```
12. 运行命令`lerna create my-ui`创建组件库主项目，并导入单个组件。

## 创建文档

1. 根目录创建website目录用于组件库文档。

2. 使用webpack开发，安装依赖`yarn add webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc -D -W`
- webpack-cli：解析webpack命令行
- webpack-dev-server：开发环境开启一个server
- vue-loader@next：webpack解析最新版本的vue
- @vue/compiler-sfc：webpack解析vue模板

3. `yarn add babel-loader @babel/core @babel/preset-env @babel/preset-typescript url-loader file-loader html-webpack-plugin css-loader sass-loader style-loader sass -D -W`
- babel-loader、@babel/core、@babel/preset-env：自动将最新的js语法转为es5
- @babel/preset-typescript：使用bebel解析ts
- file-loader：文件处理loader
- url-loader：可以将小文件转为base64
- html-webpack-plugin：调用html
- css-loader：处理css
- style-loader：把CSS插入到DOM中
- sass、sass-loader：处理sass

4. 使用ts-loader替换@babel/preset-typescript，解决无法编译ts的问题。

## 创建样式库
`lerna create theme-chalk`

## 样式库使用字体图标
1. iconfont中对项目设置FontClass/Symbol前缀为`my-icon-`，设置Font Family为`my-ui-icons`。
2. 使选择font class类型，下载至本地。
3. 将iconfont.css文件的内容复制到icon.scss中并修改，并将需要的字体文件复制到fonts目录下。

## 打包样式库

1. `yarn add gulp gulp-autoprefixer gulp-cssmin gulp-dart-sass gulp-rename -D -W`
- gulp-autoprefixer：自动处理浏览器前缀，它可以解析CSS文件并且添加浏览器前缀到CSS内容里。
- gulp-cssmin：压缩css
- gulp-dart-sass：gulp处理scss
- gulp-rename：用于重命名文件名