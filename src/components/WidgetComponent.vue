<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { Ref } from 'vue';
import WidgetForm from './WidgetForm.vue';
import WidgetStart from './WidgetStart.vue';

export interface FeedbackTypeInterface {
  id: string;
  title: string;
  icon: string;
  type: 'bug' | 'request' | 'feedback';
}

const isFormTypeSelected = ref(false);
const selectedFeedbackType: Ref<FeedbackTypeInterface | null> = ref(null);

function handleSelectedFeedbackType(event: any) {
  selectedFeedbackType.value = event;
  isFormTypeSelected.value = true;
}
</script>

<template>
  <Popover
    class="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end"
  >
    <PopoverPanel>
      <WidgetStart
        v-if="!isFormTypeSelected"
        @feedback-type-selected="handleSelectedFeedbackType"
      />
      <WidgetForm
        v-else-if="isFormTypeSelected && selectedFeedbackType !== null"
        :feedback="selectedFeedbackType"
        @back="isFormTypeSelected = false"
      />
    </PopoverPanel>

    <PopoverButton
      class="bg-gradient-to-r from-deskree-500 to-deskree-600 rounded-full px-3 h-12 text-white flex items-center group focus:outline-none focus:ring-2 focus:ring-deskree-300"
    >
      <img src="@/assets/icons/feedback.svg" alt="Union" class="w-5 h-5" />
      <span
        class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear"
      >
        <span class="pl-2"></span>
        Feedback
      </span>
    </PopoverButton>
  </Popover>
</template>
