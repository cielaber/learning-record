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
