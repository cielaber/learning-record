<template>
  <transition
    name="z-message-fade"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div class="z-message" v-show="visible" :class="classs" :style="styles">
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
// before-leave: 利用动画，在组件消失之前调用用户的onClose回调
// after-leave: 在组件消失之后触发一个手动挂载的destroy事件销毁dom

import { computed, onMounted, onUnmounted, ref } from "vue";
import { defineComponent, PropType } from "vue";
import { IType } from "./message.types";

export default defineComponent({
  props: {
    id: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<IType>,
      default: "info",
    },
    duration: {
      type: Number,
      default: 3000,
    },
    center: {
      type: String,
      default: "",
    },
    onClose: {
      type: Function as PropType<() => void>,
    },
    offset: {
      type: Number,
      default: 20,
    },
  },
  setup(props) {
    const classs = computed(() => [
      "z-message--" + props.type,
      props.center ? "is-center" : "",
    ]);

    const visible = ref(false);

    let timer;
    const startTimer = () => {
      timer = setTimeout(() => {
        visible.value = false;
      }, props.duration);
    };

    const styles = computed(() => ({
      top: `${props.offset}px`,
    }));

    onMounted(() => {
      startTimer();

      visible.value = true;
    });

    onUnmounted(() => {
      clearTimeout(timer);
    });

    return {
      classs,
      visible,
      styles,
    };
  },
});
</script>
