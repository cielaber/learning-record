import CheckBoxGroup from '../checkbox/src/checkbox-group.vue'

import { App } from 'vue'

CheckBoxGroup.install = (app: App): void => {
    app.component(CheckBoxGroup.name, CheckBoxGroup)
}

// 在原有类型上新增install方法
type IWithInstall<T> = T & { install(app: App): void }

const _CheckBoxGroup: IWithInstall<typeof CheckBoxGroup> = CheckBoxGroup

export default _CheckBoxGroup