<template>
  <IconChat
    v-if="!open"
    class="h-10 w-10 fixed bottom-2 right-2"
    @click="open = !open"
  />
  <div
    v-if="open"
    class="fixed bottom-2 right-2 overflow-hidden w-[450px]"
  >
    <!-- Header -->
    
    <div class=" w-full p-2 flex z-100 bg-gray-200 justify-between items-center">
      <div>Customer Chat Support</div>
      <button class="p-4 pr-0" @click="open = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
    </div>

    <div class="w-full messages overflow-y-scroll max-h-[80vh]" ref="messageBox">
      <ChatBubble v-for="message in messages" :message="message" :users="users" />
      <ChatBubble v-for="user in usersTyping" :key="user.id"  :users="users">
        <AppLoading />
      </ChatBubble>
    </div>

    <!-- Input -->
    <div class="w-full mt-2">
      <input
        type="text"
        placeholder="Type here"
        class="input input-accent w-full"
        @keypress.enter.exact.prevent="
          $emit('newMessage', {
            text: ($event.target as HTMLInputElement).value,
            id: nanoid(),
            createdAt: new Date(),
            userId: 'user',
          }),
            (($event.target as HTMLInputElement).value = '')
        "
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { nanoid } from "nanoid";
import { Message, User } from "~~/types";

const open = ref(false);

const props = withDefaults(
  defineProps<{
    messages: Message[];
    me: User;
    users: User[];
    usersTyping?: User[];
  }>(),
  {
    usersTyping: () => [],
  }
);
defineEmits<{
  (e: "newMessage", payload: Message): void;
}>();
const messageBox = ref();
watch(
  () => props.messages,
  () => {
    nextTick(
      () => (messageBox.value.scrollTop = messageBox.value.scrollHeight)
    );
  },
  { deep: true }
);
</script>
