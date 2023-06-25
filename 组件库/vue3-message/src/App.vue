<!-- <script lang="ts">
import { defineComponent } from 'vue';

// vue2
// export default defineComponent({
//   methods: {
//     showMessage() {
//       this.$message()
//     }
//   }
// })
</script> -->
   
<script lang="ts">
import { defineComponent } from 'vue';
import { Message } from '../packages/message'
export default defineComponent({
  setup() {
    const showMessage = () => {
      Message({
        message: 'message!',
        center: true,
        type: 'success',
      })
    }
    return {
      showMessage
    }
  },
  // methods: {
  //   showMessage(this: { $messgae: () => void }) {
  //     this.$messgae()
  //   }
  // }
})
</script>

<template>
<button @click="showMessage">xianshianniu</button>

</template>

<style scoped>

</style>
