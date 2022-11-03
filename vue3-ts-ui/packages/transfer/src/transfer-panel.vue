<template>
  <div class="my-transfer__panel">
    <my-checkbox v-model="allChecked" @change="handleCheckedAllChange">全选、反选</my-checkbox>
    <div>
      <my-checkbox-group v-model="checked">
        <my-checkbox v-for="item in data" :key="item[keyProp]" :label="item[keyProp]" :disabled="item[disabledProp]">
          {{item[labelProp]}}
        </my-checkbox>
      </my-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from "vue";
import { Props } from "./transfer.types";
import MyCheckboxGroup from "@my-ui/checkbox-group";
import MyCheckbox from "@my-ui/checkbox";
import { useCheck } from "./useCheck";

export default defineComponent({
  name: "MyTransferPanel",
  components: {
    MyCheckbox,
    MyCheckboxGroup,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    props: Object as PropType<Props>,
  },
  emits: ['checked-change'],
  setup(props) {
    const panelState = reactive({
      checked: [],
      allChecked: false,
    });

    const { keyProp, labelProp, disabledProp, handleCheckedAllChange } = useCheck(props, panelState);

    return {
      keyProp,
      labelProp,
      disabledProp,
      handleCheckedAllChange,
      ...toRefs(panelState),
    };
  },
});
</script>
