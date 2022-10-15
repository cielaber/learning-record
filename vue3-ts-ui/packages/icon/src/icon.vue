<template>
    <i :class="`my-icon-${name}`"></i>
</template>
    
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "MyIcon",
    props: {
        name: {
            type: String,
            default: ''
        }
    }
})
</script>