<template>
  <div class="my-transfer">
    <MyTransferPanel
      :data="sourceData"
      :props="props"
      @checked-change="onSourceCheckedChange"
    >
    </MyTransferPanel>
    <div class="my-transfer__buttons">
      <my-button
        icon="my-icon-left-square-fill"
        :disabled="rightChecked.length === 0"
        @click="addToLeft"
      ></my-button>
      &nbsp;
      <my-button
        icon="my-icon-right-square-fill"
        :disabled="leftChecked.length === 0"
        @click="addToRight"
      ></my-button>
    </div>
    <MyTransferPanel
      :data="targetData"
      :props="props"
      @checked-change="onTargetCheckedChange"
    >
    </MyTransferPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import MyTransferPanel from "./transfer-panel.vue";
import MyButton from "@my-ui/button";
import { DataItem, Key, Props } from "./transfer.types";
import { useComputedData } from "./useComputedData";

export default defineComponent({
  name: "MyTransfer",
  components: {
    MyTransferPanel,
    MyButton,
  },
  props: {
    data: {
      type: Array as PropType<DataItem[]>,
    },
    modelValue: {
      type: Array as PropType<Key[]>,
    },
    props: {
      type: Object as PropType<Props>,
      default: () => ({
        label: "label",
        key: "key",
        disabled: "disabled",
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // 1. 将数据分成两左边的和右边的
    let { propsKey, sourceData, targetData } = useComputedData(props);

    const checkedState = reactive({
      leftChecked: [],
      rightChecked: [],
    });

    const onSourceCheckedChange = (leftValue) => {
      console.log("left", leftValue);
      checkedState.leftChecked = leftValue;
    };

    const onTargetCheckedChange = (rightValue) => {
      console.log("right", rightValue);
      checkedState.rightChecked = rightValue;
    };

    const addToLeft = () => {
      const currentValue = props.modelValue.slice(0);
      checkedState.rightChecked.forEach((item) => {
        let index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      emit("update:modelValue", currentValue);
    };

    const addToRight = () => {
      // 将当前左边的映射成key 和右边的拼接一下，把数据发射
    };

    return {
      propsKey,
      sourceData,
      targetData,
      onSourceCheckedChange,
      onTargetCheckedChange,
      ...toRefs(checkedState),
      addToLeft,
      addToRight,
    };
  },
});
</script>
