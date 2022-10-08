import Button from './src/button.vue'

import { App } from 'vue'

Button.install = (app: App): void => {
    app.component(Button.name, Button)
}

// 在原有类型上新增install方法
type IWithInstall<T> = T & { install(app: App): void }

const _Button: IWithInstall<typeof Button> = Button

export default _Button
