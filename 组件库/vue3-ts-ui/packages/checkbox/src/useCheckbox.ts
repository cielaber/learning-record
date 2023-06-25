import { computed, getCurrentInstance, inject, WritableComputedRef } from "vue";
import { ICheckboxGroupProvide, ICheckboxProps } from "./checkbox.types";

const useCheckboxGroup = () => {
    const checkboxGroup = inject<ICheckboxGroupProvide>('MyCheckboxGroup', {})
    const isGroup = checkboxGroup.name === 'MyCheckboxGroup' // 有没有父级checkboxGroup

    return {
        isGroup,
        checkboxGroup
    }
}

const useModule = (props: ICheckboxProps) => {
    const { emit } = getCurrentInstance()

    // 如果有checkboxGroup，则从checkboxGroup中取值
    const { isGroup, checkboxGroup } = useCheckboxGroup()
    const store = computed(() => checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue)

    const model = computed({
        get() {
            return isGroup ? store.value : props.modelValue
        },
        set(val) {
            if (isGroup) { // 如果是checkboxGroup，则触发组的更新事件
                return checkboxGroup.changeEvent(val)
            }

            emit('update:modelValue', val)
        }
    })

    return model
}

const useCheckboxStatus = (props: ICheckboxProps, model: WritableComputedRef<string | number | boolean>) => {
    const isChecked = computed(() => {
        const value = model.value; // 当前是不是选中

        if (Array.isArray(value)) { // checkboxGroup传递来的
            return value.includes(props.label)
        } else { // 单个checkbox
            return value
        }
    })

    return isChecked
}

const useEvent = () => {
    const { emit } = getCurrentInstance()

    const handleChange = (e: InputEvent) => {
        const target = e.target as HTMLInputElement
        const changeVal = target.checked ? true : false
        emit('change', changeVal)
    }
    return handleChange
}


export const useCheckbox = (props: ICheckboxProps) => {
    // 1.设计一个属性 这个属性采用的是modelValue，能更改，更改的时候触发一个事件，更新数据
    let model = useModule(props)

    // 2.需要给checkbox设置一个checked的状态，更改checkbox选中或取消时需要获取到checked的状态
    const isChecked = useCheckboxStatus(props, model)

    // 3.创造一个change事件，可以触发绑定到自己身上的change
    const handleChange = useEvent()

    // 状态发生变化，都需要调用changeEvent来触发更新


    return {
        model,
        isChecked,
        handleChange
    }
}