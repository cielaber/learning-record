import { ComputedRef } from "vue"

export interface ICheckboxProps {
    indeterminate?: boolean // 是否半选
    checked?: boolean // 是否选中
    name?: string // 原生name
    disabled?: boolean // 是否禁用
    label?: string | boolean | number // checkbox-grop中使用
    modelValue?: string | number | boolean // vue3中v-model和value会编译成modelValue
}

export interface ICheckboxGroupProvide {
    modelValue?: ComputedRef
    changeEvent?: (val: unknown) => void
    name?: string
}