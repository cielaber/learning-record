import { App } from 'vue'
import Button from "@my-ui/button"
import Iocn from "@my-ui/icon"
import ButtonGroup from '@my-ui/button-group'
import Row from "@my-ui/row"
import Col from "@my-ui/col"

const components = [
    Button,
    Iocn,
    ButtonGroup,
    Row,
    Col
]

const install = (app: App):void => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export default {
    install
}