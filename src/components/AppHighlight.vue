<template>
  <span
    >{{ highlightArray[0]
    }}<b v-if="highlightArray[1]" :class="[$style.highlight, { [$style.highlightFull]: fullMatch }]">{{ highlightArray[1] }}</b
    >{{ highlightArray[2] }}</span
  >
</template>

<script setup lang="ts">
import highlight from '@/utils/highlight';
import { defineProps, computed } from 'vue';

export interface HighlightViewModel {
  text: string;
  highlighter: string;
}

const props = defineProps<HighlightViewModel>();

const fullMatch = computed<boolean>(() => props.text.toLowerCase() === props.highlighter.toLowerCase());

const highlightArray = computed<string[]>(() => highlight(props.text, props.highlighter));
</script>

<style lang="scss" module>
.highlight {
  font-weight: 600;
  color: $color-secondary;

  &Full {
    color: $color-primary-dark;
  }
}
</style>
