<template lang="pug">
div This is a test component. 1 + {{ testValue }} = {{ 1 + testValue }}
</template>
<script setup lang="ts">
defineProps<{ testValue: number }>()
</script>
