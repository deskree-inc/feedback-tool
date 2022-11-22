<script setup lang="ts">
import { TabGroup } from '@headlessui/vue';
import { types } from '../mock/feedbackTypes.json';
import FeedbackType from './FeedbackType.vue';
import CloseButton from './CloseButton.vue';
import { FeedbackTypeInterface } from '../interfaces/feedback';

const emit = defineEmits(['feedback-type-selected']);

function selectFeedbackType(feedbackType: FeedbackTypeInterface) {
  emit('feedback-type-selected', feedbackType);
}
</script>

<template>
  <div class="mb-4 shadow-lg w-[calc(100vw-2rem)] md:w-auto sm:w-auto">
    <header
      class="bg-deskree-600 flex flex-col item-center rounded-t-2xl p-3.5"
    >
      <CloseButton />
      <h3 class="mt-6 font-medium">Send us a feedback</h3>
      <p class="text-xs opacity-60 font-normal">
        Choose one of the feedback type below.
      </p>
    </header>
    <div
      class="bg-[#1E1E20] w-full rounded-b-2xl flex flex-col min-h-[296px] gap-2 pt-4"
    >
      <TabGroup
        v-for="feedbackType in types"
        :id="feedbackType.id"
        class="hover:bg-hover-rgba rounded-lg cursor-pointer px-2 h-12 mx-2 flex items-center transition-colors"
      >
        <FeedbackType
          :id="feedbackType.id"
          :title="feedbackType.title"
          :icon="feedbackType.icon"
          @click="selectFeedbackType(feedbackType)"
        />
      </TabGroup>
      <div class="flex items-center px-6 pb-4 mt-16">
        <NuxtLink
          to="https://deskree.com"
          target="_blank"
          class="flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-deskree-300"
        >
          <span class="font-normal text-xs opacity-40">Powered by</span>
          <img
            src="/icons/deskree-logo.svg"
            alt="Deskree Logo"
            class="opacity-50"
          />
          <img
            src="/icons/deskree-name.svg"
            alt="Deskree Name"
            class="opacity-50"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
