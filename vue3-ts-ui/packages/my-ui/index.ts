import { App } from 'vue'
import Button from "@my-ui/button"
import Iocn from "@my-ui/icon"

const components = [
    Button,
    Iocn
]

const install = (app: App):void => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export default {
    install
}