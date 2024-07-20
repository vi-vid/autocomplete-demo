<template>
  <span
    >{{ highlightArray[0] }}<b :class="[$style.highlight, { [$style.highlightFull]: fullMatch }]">{{ highlightArray[1] }}</b
    >{{ highlightArray[2] }}</span
  >
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

export interface HighlightViewModel {
  text: string;
  highlighter: string;
}

const props = defineProps<HighlightViewModel>();

const lowerCaseText = computed<string>(() => props.text.toLowerCase());
const lowerCaseHighlighter = computed<string>(() => props.highlighter.toLowerCase());

const fullMatch = computed<boolean>(() => lowerCaseText.value === lowerCaseHighlighter.value);

const highlightArray = computed<string[]>(() => {
  const originalText = props.text;
  const index = lowerCaseText.value.indexOf(lowerCaseHighlighter.value);
  const { length } = lowerCaseHighlighter.value;
  if (index >= 0) {
    return [originalText.substring(0, index), originalText.substring(index, index + length), originalText.substring(index + length)];
  }
  return [originalText];
});
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
