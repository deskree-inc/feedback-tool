<script setup lang="ts">
import { Ref } from 'vue';
import CloseButton from './CloseButton.vue';
import html2canvas from 'html2canvas';
import LoadingWidget from './LoadingWidget.vue';
import ToastNotification from './ToastNotification.vue';

const props = defineProps<{
  feedback: {
    id: string;
    title: string;
    icon: string;
    type: 'bug' | 'request' | 'feedback';
  };
}>();

const emit = defineEmits<{
  (event: 'back', ...args: any[]): void;
  (event: 'success', ...args: any[]): void;
  (event: 'feedback_uid', ...args: any[]): void;
}>();

interface SendFeedbackBodyInterface {
  type: 'bug' | 'request' | 'feedback';
  message: string;
  image?: string | undefined;
}

interface GitHubCreateIssueInterface {
  title: string;
  body: string;
}

const isTakingScreenshot = ref(false);
const message: Ref<string> = ref('');
const image: Ref<string | undefined> = ref(undefined);
const error = ref('');

async function handleTakeScreenshot(): Promise<void> {
  isTakingScreenshot.value = true;

  const canvas = await html2canvas(
    document.querySelector('html') as HTMLElement
  );

  const base64Image = canvas.toDataURL('image/png');
  isTakingScreenshot.value = false;

  image.value = base64Image;
}

async function createIssueOnGitHub(body: GitHubCreateIssueInterface) {
  try {
    await fetch(
      'https://feedback-tool.api.deskree.com/api/v1/integrations/github/repos/deskree-inc/feedback-tool/issues',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  } catch (e: any) {
    console.error(e);
    showError.value = true;
    loading.value = false;
    error.value = e;
  }
}

async function createFeedback(body: SendFeedbackBodyInterface) {
  try {
    const res = await fetch(
      'https://feedback-tool.api.deskree.com/api/v1/rest/collections/feedbacks',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const { data } = await res.json();

    if (data !== undefined) {
      emit('feedback_uid', data.uid);
    } else {
      throw new Error("Couldn't create feedback");
    }
  } catch (e: any) {
    console.error(e);
    showError.value = true;
    loading.value = false;
    error.value = e;
  } finally {
    if (!showError.value) {
      image.value = undefined;
    }
  }
}

const loading = ref(false);

async function sendFeedback() {
  loading.value = true;
  let feedbackBody: SendFeedbackBodyInterface = {
    type: props.feedback.type,
    message: message.value,
  };

  if (image !== undefined) {
    feedbackBody.image = image.value;
  }

  await createFeedback(feedbackBody);
  if (showError.value) return;

  if (props.feedback.type === 'bug') {
    const gitHubBody: GitHubCreateIssueInterface = {
      title: 'Bug Found by User',
      body: message.value,
    };

    await createIssueOnGitHub(gitHubBody);
  }

  message.value = '';
  loading.value = false;
  emit('success');
}

const showError = ref(false);

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
    class="bg-[#1E1E20] rounded-2xl mb-4 shadow-lg w-[calc(100vw-2rem)] min-h-[390px] md:w-auto sm:w-auto"
  >
    <header class="flex flex-col item-center rounded-t-2xl p-3.5">
      <img
        src="../assets/icons/left-arrow.svg"
        alt="Back arrow"
        class="w-5 h-4 cursor-pointer"
        @click="$emit('back')"
      />
      <CloseButton />
      <div class="flex items-center mt-4 gap-2">
        <span
          class="flex items-center justify-center bg-gradient-to-r from-deskree-500 to-deskree-600 rounded-full w-8 h-8"
        >
          <img
            :src="props.feedback.icon"
            :alt="props.feedback.title"
            class="w-4 h-5"
          />
        </span>
        <h3 class="font-medium">{{ props.feedback.title }}</h3>
      </div>
      <p class="text-xs opacity-60 font-normal mt-4">
        Tell us a little more about it.
      </p>
    </header>
    <div class="flex px-4 gap-2 w-full flex-col">
      <form @submit.prevent="sendFeedback" class="w-full">
        <textarea
          v-model="message"
          class="min-w-[227px] w-full min-h-[150px] text-sm placeholder-white/[0.8] text-white bg-white/[0.08] rounded-lg border-0 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Share with details your feedback..."
        />
        <div class="flex flex-col gap-4 mt-2">
          <span
            v-if="image === undefined"
            class="text-xs text-deskree-300 hover:text-white cursor-pointer transition-colors"
            @click="handleTakeScreenshot"
            >Take a screenshot</span
          >
          <button
            v-else
            type="button"
            @click="image = undefined"
            class="p-1 w-8 h-8 rounded-md border-2 border-deskree-300 flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            :style="{ backgroundImage: `url(${image})` }"
            style="background-position: bottom right; background-size: 180px"
            :disabled="loading"
          >
            <img src="../assets/icons/delete.svg" alt="Delete icon" />
          </button>
          <button
            type="submit"
            class="bg-deskree-600 hover:bg-deskree-300 transition-colors rounded-lg min-h-[39px] flex items-center justify-center mb-2 disabled:bg-deskree-300 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            <LoadingWidget v-if="loading" />
            <span v-else>Send</span>
          </button>
        </div>
      </form>
    </div>
    <transition
      enter-active-class="animate-fade-in-up"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="animate-fade-out-down"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ToastNotification
        v-show="showError"
        @click="handleDismissError"
        class="cursor-pointer inset-0 overflow-hidden transition-opacity"
      >
        {{ error }}
      </ToastNotification>
    </transition>
  </div>
</template>
