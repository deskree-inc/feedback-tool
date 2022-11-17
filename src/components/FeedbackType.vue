<script setup lang="ts">
import { TabList, Tab } from '@headlessui/vue';

const props = defineProps<{
  id: string;
  title: string;
  icon: string;
}>();
</script>

<template>
  <TabList>
    <Tab class="flex items-center gap-2 focus:outline-none">
      <span
        class="flex items-center justify-center bg-gradient-to-r from-deskree-500 to-deskree-600 rounded-full w-8 h-8"
      >
        <img :src="props.icon" :alt="props.title" class="w-4 h-5" />
      </span>
      <h6 class="text-xs font-medium">{{ props.title }}</h6>
    </Tab>
  </TabList>
</template>
