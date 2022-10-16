import ButtonGroup from '../button/src/button-group.vue'

import { App } from 'vue'

ButtonGroup.install = (app: App): void => {
    app.component(ButtonGroup.name, ButtonGroup)
}

// 在原有类型上新增install方法
type IWithInstall<T> = T & { install(app: App): void }

const _ButtonGroup: IWithInstall<typeof ButtonGroup> = ButtonGroup

export default _ButtonGroup
