declare module '*.vue' {
    import { App, defineComponent, DefineComponent } from "vue";

    // const component: ReturnType<typeof defineComponent> & { install(app: App): void } // 使用教程的写法中后这里类型结果为any，因此换了以下方式 
    const component: DefineComponent & { install(app: App): void }

    export default component
}