<template>
    <button :class="classs" @click="handleClick">
        <i v-if="loading" class="my-icon-cloud-sync"></i>
        <i v-if="icon && !loading" :class="icon"></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity"
import { defineComponent, PropType } from "vue"

type IButtonType = 'primary' | 'warning' | 'danger' | 'default' | 'info' | 'success'

export default defineComponent({
    name: "MyButton",
    props: {
        type: {
            type: String as PropType<IButtonType>,
            default: '',
            validator: (val: string) => {
                return ['primary', 'warning', 'danger', 'default', 'info', 'success'].includes(val)
            }
        },
        icon: {
            type: String,
            default: ''
        },
        disabled: Boolean,
        loading: Boolean,
        round: Boolean,
    },
    emits: ['click'],
    setup(props, ctx) {
        const classs = computed(() => [
            'my-button',
            'my-button--' + props.type,
            {
                'is-disabled': props.disabled,
                'is-loading': props.loading,
                'is-round': props.round
            }
        ])

        const handleClick = (e) => {
            console.log('innerClick')
            ctx.emit('click', e)
        }
 
        return {
            classs,
            handleClick
        }
    }
})
</script>