<template>
  <div class="w-full h-full">
    <div
        v-if="message"
      :class="[
        message?.userId === 'assistant'
          ? 'w-full chat chat-start'
          : 'w-full chat chat-end',
      ]"
    >
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img :src="message?.userId==='user'?users[0].avatar:users[1].avatar" />
        </div>
      </div>
      <div class="chat-header">
        {{ message?.userId }}
        <time class="text-xs opacity-50">
            {{useTimeAgo(message?.createdAt)}}
        </time>
      </div>
      <div class="chat-bubble">{{ message?.text }}</div>
      
    </div>
    <div v-else class=" chat chat-start">
        <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img :src="users[1].avatar" />
        </div>
      </div>
      <div class="chat-header">
        Typing...
        </div>
        <div class="chat-bubble">
            <slot ></slot>
        </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Message, User } from "~~/types";
import { useTimeAgo } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    message?: Message;
    usersTyping?: User;
    users:User[]
  }>(),
  {}
);
</script>
