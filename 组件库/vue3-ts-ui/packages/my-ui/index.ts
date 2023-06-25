import { App } from 'vue'
import Button from "@my-ui/button"
import Iocn from "@my-ui/icon"
import ButtonGroup from '@my-ui/button-group'
import Row from "@my-ui/row"
import Col from "@my-ui/col"
import Checkbox from '@my-ui/checkbox'
import CheckboxGroup from '@my-ui/checkbox-group'
import Transfer from "@my-ui/transfer";

const components = [
  Button,
  Iocn,
  ButtonGroup,
  Row,
  Col,
  Checkbox,
  CheckboxGroup,
  Transfer,
];

const install = (app: App):void => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export default {
    install
}