import CheckBox from './src/checkbox.vue'

import { App } from 'vue'

CheckBox.install = (app: App): void => {
    app.component(CheckBox.name, CheckBox)
}

// 在原有类型上新增install方法
type IWithInstall<T> = T & { install(app: App): void }

const _CheckBox: IWithInstall<typeof CheckBox> = CheckBox

export default _CheckBox
