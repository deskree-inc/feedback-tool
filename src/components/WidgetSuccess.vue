<script setup lang="ts">
import CloseButton from './CloseButton.vue';
import StarComponent from './StarComponent.vue';

const props = defineProps<{
  feedbackUid: string;
}>();

const star1 = ref(false);
const star2 = ref(false);
const star3 = ref(false);
const star4 = ref(false);
const star5 = ref(false);

const feedbackSent = ref(false);

function handleStar1Hover() {
  star1.value = true;
  star2.value = false;
  star3.value = false;
  star4.value = false;
  star5.value = false;
}

function handleStar2Hover() {
  star1.value = true;
  star2.value = true;
  star3.value = false;
  star4.value = false;
  star5.value = false;
}

function handleStar3Hover() {
  star1.value = true;
  star2.value = true;
  star3.value = true;
  star4.value = false;
  star5.value = false;
}

function handleStar4Hover() {
  star1.value = true;
  star2.value = true;
  star3.value = true;
  star4.value = true;
  star5.value = false;
}

function handleStar5Hover() {
  star1.value = true;
  star2.value = true;
  star3.value = true;
  star4.value = true;
  star5.value = true;
}

async function sendFeedback(rating: number) {
  const body = {
    rating,
  };
  try {
    await fetch(
      `https://feedback-tool.api.deskree.com/api/v1/rest/collections/feedbacks/${props.feedbackUid}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    feedbackSent.value = true;
  } catch (e) {
    console.error(e);
    // TODO: Catch error
  }
}
</script>

<template>
  <div
    class="bg-[#1E1E20] rounded-2xl mb-4 shadow-lg w-[calc(100vw-2rem)] min-h-[330px] px-4 md:w-auto sm:w-auto flex flex-col justify-evenly"
  >
    <CloseButton />
    <div class="flex flex-col items-center mt-8 gap-4">
      <img
        src="../assets/icons/circular-checkmark.svg"
        alt=""
        class="w-11.5 h-11.5"
      />
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
    <div class="flex items-center justify-center gap-2">
      <div
        :onMouseover="feedbackSent ? () => {} : handleStar1Hover"
        @click="sendFeedback(1)"
      >
        <img v-show="!star1" src="../assets/icons/star.svg" alt="Star" />
        <img
          v-show="star1"
          src="../assets/icons/filled-star.svg"
          alt="Filled star"
        />
      </div>
      <div
        :onMouseover="feedbackSent ? () => {} : handleStar2Hover"
        @click="sendFeedback(2)"
      >
        <img v-show="!star2" src="../assets/icons/star.svg" alt="Star" />
        <img
          v-show="star2"
          src="../assets/icons/filled-star.svg"
          alt="Filled star"
        />
      </div>
      <div
        :onMouseover="feedbackSent ? () => {} : handleStar3Hover"
        @click="sendFeedback(3)"
      >
        <img v-show="!star3" src="../assets/icons/star.svg" alt="Star" />
        <img
          v-show="star3"
          src="../assets/icons/filled-star.svg"
          alt="Filled star"
        />
      </div>
      <div
        :onMouseover="feedbackSent ? () => {} : handleStar4Hover"
        @click="sendFeedback(4)"
      >
        <img v-show="!star4" src="../assets/icons/star.svg" alt="Star" />
        <img
          v-show="star4"
          src="../assets/icons/filled-star.svg"
          alt="Filled star"
        />
      </div>
      <div
        :onMouseover="feedbackSent ? () => {} : handleStar5Hover"
        @click="sendFeedback(5)"
      >
        <img v-show="!star5" src="../assets/icons/star.svg" alt="Star" />
        <img
          v-show="star5"
          src="../assets/icons/filled-star.svg"
          alt="Filled star"
        />
      </div>
    </div>
    <div class="flex px-4 gap-2 w-full flex-col">
      <div class="flex flex-col gap-4 mt-2">
        <span
          class="text-xs text-deskree-600 hover:text-white text-center cursor-pointer mb-2 transition-colors"
          >Send another feedback</span
        >
      </div>
    </div>
  </div>
</template>
