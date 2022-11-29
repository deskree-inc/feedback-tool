<script setup lang="ts">
import { Ref } from 'vue';

const config = useRuntimeConfig();

const props = defineProps<{
  feedbackUid: string;
}>();

const emit = defineEmits<{
  (e: 'send-another'): void;
}>();

const feedbackSent = ref(false);
const error = ref('');
const showError = ref(false);

const allStars: Ref<{ id: number; isHovered: boolean }[]> = ref([
  { id: 1, isHovered: ref(false) },
  { id: 2, isHovered: ref(false) },
  { id: 3, isHovered: ref(false) },
  { id: 4, isHovered: ref(false) },
  { id: 5, isHovered: ref(false) },
]);

function handleAllStarsHover(id: number): void {
  if (feedbackSent.value) return;
  for (let i = 0; i < 5; i++) {
    allStars.value[i].isHovered = i <= id;
  }
}

async function sendFeedback(rating: number) {
  const body = {
    rating,
  };
  try {
    feedbackSent.value = true;
    // TODO: Set User's Feedback Rating
  } catch (e) {
    console.error(e);
  }
}

function handleSendAnother() {
  emit('send-another');
  feedbackSent.value = false;
  allStars.value.forEach(star => star.isHovered = false);
}

function handleDismissError() {
  showError.value = false;
}

watchEffect(() => {
  if (showError.value) {
    setTimeout(() => {
      showError.value = false;
    }, 3000);
  }
});
</script>

<template>
  <div
    class="bg-[#1E1E20] rounded-2xl mb-4 shadow-lg w-[calc(100vw-2rem)] min-h-[330px] px-4 md:w-auto sm:w-auto flex flex-col justify-evenly">
    <AppCloseButton />
    <div class="flex flex-col items-center mt-8 gap-4">
      <img src="/icons/circular-checkmark.svg" alt="" class="w-11.5 h-11.5" />
      <h3 class="font-medium">Feedback Sent</h3>
    </div>
    <p class="text-xs opacity-60 font-normal mt-4 text-center">
      Thank you for your time.<br />
      We have received your feedback and <br />
      will look into it.
    </p>
    <p class="text-xs opacity-60 font-normal mt-4 text-center">
      How would you rate your experience?
    </p>
    <div v-if="!feedbackSent" class="flex items-center justify-center gap-3 pt-2"
      :onMouseleave="() => handleAllStarsHover(-1)">
      <div v-for="star in allStars" :key="star.id" :onMouseover="() => handleAllStarsHover(star.id - 1)"
        @click="sendFeedback(star.id)"
        class="hover:bg-blue-rgba hover:rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
        <img v-show="!star.isHovered" src="/icons/star.svg" alt="Star" class="group-hover:opacity-0" />
        <img v-show="star.isHovered" src="/icons/filled-star.svg" alt="Filled star" class="group-hover:opacity-0" />
      </div>
    </div>
    <div v-else class="flex items-center justify-center gap-3 pt-2">
      <div v-for="star in allStars" :key="star.id"
        class="hover:bg-transparent w-6 h-6 flex items-center justify-center">
        <img v-show="!star.isHovered" src="/icons/empty-star.svg" alt="Disabled star" class="group-hover:opacity-0" />
        <img v-show="star.isHovered" src="/icons/filled-star.svg" alt="Filled star" class="group-hover:opacity-0" />
      </div>
    </div>
    <div class="flex px-4 gap-2 w-full flex-col">
      <div class="flex flex-col gap-4 mt-2">
        <span @click="handleSendAnother"
          class="text-xs text-deskree-600 hover:text-white text-center cursor-pointer mb-2 transition-colors">Send
          another feedback</span>
      </div>
    </div>
    <transition enter-active-class="animate-fade-in-up" enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="animate-fade-out-down" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <AppToastNotification v-show="showError" @click="handleDismissError"
        class="cursor-pointer inset-0 overflow-hidden transition-opacity">
        {{ error }}
      </AppToastNotification>
    </transition>
  </div>
</template>
