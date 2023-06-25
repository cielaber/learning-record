<template>
    <div class="my-button-group">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "MyButtonGroup"
})
</script>