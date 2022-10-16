import { computed, defineComponent, h, provide } from 'vue'

export default defineComponent({
    name: "MyRow",
    props: {
        tag: {
            tyep: String,
            default: 'div'
        },
        gutter: {
            type: Number,
            default: 0,
        },
        justify: {
            type: String,
            default: "start"
        }
    },
    setup(props, {slots}) {
        provide('MyRow', props.gutter) // 将该属性传给所有的子组件

        const classs = computed(() => [
            'my-row',
            props.justify !== 'start' ? `is-justify-${props.justify}` : ''
        ])

        const styles = computed(() => {
            let ret = {
                marginLeft: '',
                marginRight: '',
            }
            if(props.gutter) {
                ret.marginRight = ret.marginLeft = `-${props.gutter / 2}px`
            }

            return ret
        })

        return () => h(props.tag, {
            class: classs.value,
            style: styles.value
        }, slots.default?.())

    }
})