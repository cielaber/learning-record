<template>
    <div>App</div>
    <hr>
    <my-icon name="api"></my-icon>
    <hr>
    <my-button icon="my-icon-api" @click="buttonClick">按钮</my-button>
    <my-button icon="my-icon-api" disabled @click="buttonClick">按钮</my-button>
    <my-button icon="my-icon-api" round>按钮</my-button>
    <my-button icon="my-icon-api" :loading="buttonLoading" @click="buttonClick">按钮</my-button>
    <hr>
    <my-button type="primary">按钮</my-button>
    <my-button type="info">按钮</my-button>
    <my-button type="danger">按钮</my-button>
    <my-button type="warning">按钮</my-button>
    <my-button type="success">按钮</my-button>
    <hr>
    <my-button-group>
        <my-button type="primary" icon="my-icon-arrowleft">上一页</my-button>
        <my-button type="primary">下一页
            <i class="my-icon-arrowright"></i>
        </my-button>
    </my-button-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const useButton = () => {
    const buttonLoading = ref(true)
    const buttonClick = () => {
        console.log('handle-click')
    }

    setTimeout(() => {
        buttonLoading.value = false
    }, 3000)

    return {
        buttonLoading,
        buttonClick,
    }
}

export default defineComponent({
    name: 'app',

    setup() {
        return {
            ...useButton()
        }
    }
})
</script>