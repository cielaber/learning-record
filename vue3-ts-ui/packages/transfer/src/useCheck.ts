import { computed, getCurrentInstance, watch } from "vue";
import { IPanelState, ITransferPanelProps } from "./transfer.types";

export const useCheck = (
  props: ITransferPanelProps,
  panelState: IPanelState
) => {
  const { emit } = getCurrentInstance();

  const labelProp = computed(() => props.props.label);
  const keyProp = computed(() => props.props.key);
  const disabledProp = computed(() => props.props.disabled);

  // 过滤出不是禁用的
  const checkableData = computed(() => {
    return props.data.filter((item) => !item[disabledProp.value]);
  });

  const handleCheckedAllChange = (val) => {
    panelState.allChecked = val;
    panelState.checked = val
      ? checkableData.value.map((item) => {
          return item[keyProp.value];
        })
      : [];
  };

  watch(
    () => panelState.checked,
    () => {
      let checkKeys = checkableData.value.map((item) => item[keyProp.value]);
      panelState.allChecked =
        checkKeys.length > 0 &&
        checkKeys.every((item) => panelState.checked.includes(item));

      emit("checked-change", panelState.checked);
    }
  );

  watch(
    () => props.data,
    () => {
      panelState.checked = []; // 数据变化后，清空chekced属性，保证还原allChecked
    }
  );

  return {
    labelProp,
    keyProp,
    disabledProp,
    handleCheckedAllChange,
  };
};
