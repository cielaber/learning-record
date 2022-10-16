import { computed, defineComponent, h, inject } from 'vue'

export default defineComponent({
    name: "MyCol",
    props: {
        tag: {
            tyep: String,
            default: 'div'
        },
        span: {
            type: Number,
            default: 24,
        },
        offset: {
            type: Number,
            default: 0
        }
    },
    setup(props, { slots }) {
        const gutter = inject("MyRow", 0) // 获取row传过来的gutter，0是默认值
console.log(gutter)


        const classs = computed(() => {
            const ret = []
            const pos = ['span', 'offset'] as const
            pos.forEach(item => {
                const size = props[item]
                if (typeof size == 'number' && size > 0) {
                    ret.push(`my-col-${item}-${props[item]}`)
                }
            })

            return [
                'my-col',
                ...ret
            ]
        })

        const styles = computed(() => {
            if (gutter !== 0) {
                return {
                    marginLeft: gutter / 2 + 'px',
                    marginRight: gutter / 2 + 'px',
                }
            }
            return {}
        })

        return () => h(props.tag, {
            class: classs.value,
            style: styles.value
        }, slots.default?.())
    }
})