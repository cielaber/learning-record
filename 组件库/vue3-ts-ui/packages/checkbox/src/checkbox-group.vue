<template>
    <div class="my-checkbox-group" @change="">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue'

export default defineComponent({
    name: 'MyCheckboxGroup',
    props: {
        modelValue: Array, // 父组件将这个值传递给子组件
    },
    emits: ['change', 'update:modelValue'],
    setup(props, { emit }) {
        const modelValue = computed(() => props.modelValue);

        const changeEvent = (val) => { // 子组件调用这个方法去通知更新
            emit('change', val) // change
            emit('update:modelValue', val) // modelValue
        }

        provide('MyCheckboxGroup', {
            name: "MyCheckboxGroup",
            modelValue,
            changeEvent
        })
    }
})
</script>