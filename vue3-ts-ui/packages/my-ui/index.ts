import { App } from 'vue'
import Button from "@my-ui/button"
import Iocn from "@my-ui/icon"
import ButtonGroup from '@my-ui/button-group'

const components = [
    Button,
    Iocn,
    ButtonGroup
]

const install = (app: App):void => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export default {
    install
}