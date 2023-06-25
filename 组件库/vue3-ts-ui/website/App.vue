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
    <hr>
    <my-row>
        <my-col :span="6" style="background-color: red;">111</my-col>
        <my-col :span="6" :offset="6" style="background-color: blue;">222</my-col>
        <my-col :span="6" style="background-color: orange;">333</my-col>
    </my-row>
    <hr>
    <div style="border: 3px purple solid; width: 80%; margin: 0 auto;">
        <my-row :gutter="20">
            <my-col :span="8" style="background-color: red;">111</my-col>
            <my-col :span="8" style="background-color: blue;">222</my-col>
            <my-col :span="8" style="background-color: orange;">333</my-col>
        </my-row>
    </div>
    <hr>
    <div style="border: 3px purple solid; width: 80%; margin: 0 auto;">
        <my-row justify="space-around">
            <my-col :span="2" style="background-color: red;">111</my-col>
            <my-col :span="2" style="background-color: blue;">222</my-col>
            <my-col :span="2" style="background-color: orange;">333</my-col>
        </my-row>
    </div>
    <hr>
    <my-checkbox v-model="checkVal" @change="checkboxChange">checkbox</my-checkbox>
    <my-checkbox-group v-model="checkGroupVal" @change="checkboxChange">
        <my-checkbox v-for="c in checks" :key="c" :label="c"></my-checkbox>
    </my-checkbox-group>
    <hr>
    <my-transfer v-model="rightValue" :data="transferData" :props="transferProp"></my-transfer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useButton } from './hooks/useButton'
import { useCheckbox } from './hooks/useCheckbox'

function useTransfer() {
    const generateData = () => {
        const data = []
        for (let i = 1; i <= 15; i++) {
            data.push({
                key: i,
                label: `备选项 ${i}`,
                disabled: i % 4 === 0
            })
        }
        return ref(data)
    }

    return {
        transferData: generateData(),
        rightValue: ref([1, 4]),
        transferProp: {
            key: 'key',
            label: 'label',
            disabled: 'disabled'
        }
    }
}

export default defineComponent({
    name: 'app',

    setup() {
        return {
            ...useButton(),
            ...useCheckbox(),
            ...useTransfer()
        }
    }
})
</script>