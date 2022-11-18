<script setup lang="ts">
import { Ref } from 'vue';

const props = defineProps<{
  isHovered: Ref<boolean>;
}>();
</script>

<template>
  <img v-show="!isHovered" src="../src/assets/icons/star" alt="Star" />
  <img
    v-show="isHovered"
    src="../src/assets/icons/filled-star"
    alt="Filled star"
  />
</template>
