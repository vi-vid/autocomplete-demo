<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div :class="[$style.wrapper, { [$style.wrapperError]: error }, { [$style.wrapperHasValue]: searchTerm }]">
    <label :for="id" :class="[$style.icon, { [$style.iconLoading]: isLoading }]"></label>
    <input v-model="searchTerm" ref="input" type="text" :id="id" :class="[$style.input]" @input="onInput" @keydown="onKeyDown" />
    <ul :class="[$style.results]">
      <li
        :class="[$style.resultsItem, { [$style.resultsItemFocused]: focusedIndex === index }]"
        v-for="(item, index) in filteredItems"
        :key="index"
      >
        <button :class="[$style.resultsItemButton]" @click="selectItem(item)" tabindex="-1">
          <AppHighlight :text="item.title" :highlighter="searchTerm"></AppHighlight>
          <AppHighlight
            v-if="item.subtitle"
            :text="item.subtitle"
            :highlighter="searchTerm"
            :class="[$style.resultsItemSubtitle]"
          ></AppHighlight>
        </button>
      </li>
      <li v-if="!searchConditionSatisfied" :class="[$style.resultsItemPlaceholder]">type something to search</li>
      <li v-else-if="isLoading || !hasItemsFetched" :class="[$style.resultsItemPlaceholder]">items loading</li>
      <li v-else-if="!filteredItems.length" :class="[$style.resultsItemEmpty]">no results</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import AppHighlight from '@/components/AppHighlight.vue';
import debounce from '@/utils/debounce';
import prepareGoogleSearchURL from '@/utils/prepare-google-search-url';
import { StoreDefinition, storeToRefs } from 'pinia';
import { defineProps, ref, onMounted, computed } from 'vue';

const SEARCH_INPUT_DEBOUNCE_AMOUNT = 256;
const SEARCH_INPUT_CONDITION_LENGTH = 3;

export interface SearchInputItem {
  title: string;
  subtitle?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResultMapper = (item: any) => SearchInputItem;

interface SearchInputViewModel {
  id: string;
  items?: SearchInputItem[];
  automaticFocus?: boolean;
  useStore: StoreDefinition;
  resultMapper: ResultMapper;
}

const searchTerm = ref<string>('');
const focusedIndex = ref<number>(-1);

const input = ref<HTMLInputElement | null>(null);

const props = defineProps<SearchInputViewModel>();

const store = props.useStore();

const { items, isLoading, error } = storeToRefs(store);
const { fetch } = store;

const mappedItems = computed<SearchInputItem[]>(() => (items.value || []).map(props.resultMapper));

const searchConditionSatisfied = computed<boolean>(() => searchTerm.value.length >= SEARCH_INPUT_CONDITION_LENGTH);
const hasItemsFetched = computed<boolean>(() => Boolean(items.value));
const lowerCaseSearchTerm = computed<string>(() => searchTerm.value.toLowerCase());

const filteredItems = computed<SearchInputItem[]>(() => {
  if (!searchConditionSatisfied.value) {
    return [];
  }
  return mappedItems.value.filter(
    (item: SearchInputItem) =>
      item.title.toLowerCase().includes(lowerCaseSearchTerm.value) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(lowerCaseSearchTerm.value))
  );
});

const debouncedFetch = debounce(fetch, SEARCH_INPUT_DEBOUNCE_AMOUNT);

const searchItemOnGoogle = (item: SearchInputItem) => {
  const subtitleText = item.subtitle ? ` - ${item.subtitle}` : '';
  searchTerm.value = item.title;

  window.open(prepareGoogleSearchURL(`${item.title}${subtitleText}`), '_blank');
};

const selectItem = (item: SearchInputItem) => {
  if (input.value) {
    input.value.blur();
  }
  searchItemOnGoogle(item);
};

const onKeyDown = (event: KeyboardEvent) => {
  if (!hasItemsFetched.value || !filteredItems.value.length) {
    focusedIndex.value = -1;
    return;
  }

  let direction = 0;
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault();
      direction = -1;
      break;
    case 'ArrowDown':
      event.preventDefault();
      direction = 1;
      break;
    case 'Enter':
      if (filteredItems.value.length === 1) {
        selectItem(filteredItems.value[0]);
      } else if (focusedIndex.value >= 0 && filteredItems.value[focusedIndex.value]) {
        selectItem(filteredItems.value[focusedIndex.value]);
      }
      break;
    default:
      break;
  }

  if (direction) {
    focusedIndex.value = (focusedIndex.value + direction) % filteredItems.value.length;
  }
};

const onInput = () => {
  if (!hasItemsFetched.value && searchConditionSatisfied.value) {
    debouncedFetch();
  }
};

onMounted(() => {
  if (props.automaticFocus && input.value) {
    input.value.focus();
  }
});
</script>

<style lang="scss" module>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

$search-input-border-radius: 18px;

.wrapper {
  position: relative;
  display: inline-flex;
  outline: 0 solid $color-transparent-white;
  transition: outline-color 0.256s ease-in-out;
  border-radius: $search-input-border-radius;

  &:focus-within {
    z-index: 1;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    &:not(.wrapperError) {
      .results {
        display: block;
      }

      .input {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  &HasValue:focus-within {
    outline: 100vmax solid $color-black-25;
  }

  &Error {
    .input {
      border-color: $color-error;
      background: $color-error-light;
    }
  }
}

.icon {
  top: 0;
  left: 0;
  width: 36px;
  font-size: 0px;
  padding: 10px;
  font-size: 14px;
  position: absolute;

  &:before {
    content: '';
    width: 16px;
    height: 16px;
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('/public/magnifier.png');
  }

  &Loading {
    &:before {
      animation-name: spin;
      animation-duration: 0.512s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      background-image: url('/public/spinner.png');
    }
  }
}

.input {
  font-size: 16px;
  line-height: $search-input-border-radius;
  font-weight: 300;
  padding: 8px 8px 8px 32px;
  border-radius: $search-input-border-radius;
  border: 1px solid $color-black;
  background: $color-white;

  &:focus {
    outline: none;
  }
}

.results {
  left: 0;
  right: 0;
  top: 100%;
  display: none;
  font-weight: 300;
  overflow: hidden;
  position: absolute;
  background: $color-neutral-light;
  border-bottom-left-radius: $search-input-border-radius;
  border-bottom-right-radius: $search-input-border-radius;
  border: 1px solid $color-black;
  border-top: 0;

  &Item {
    font-size: 16px;
    position: relative;

    &Button,
    &Empty,
    &Placeholder {
      width: 100%;
      padding: 8px;
      line-height: $search-input-border-radius;
      display: flex;
      flex-direction: column;
      background: $color-white;
    }

    &Subtitle {
      font-size: 12px;
    }

    &Empty,
    &Placeholder {
      font-size: 14px;
      color: $color-secondary;
    }

    &Button {
      border: none;
      font: inherit;
      cursor: pointer;

      &:before {
        content: ' ';
        top: 0;
        left: 0;
        bottom: 0;
        width: 0px;
        z-index: 1;
        display: block;
        position: absolute;
        background: $color-primary;
        transition: width 0.128s ease-in-out;
      }
    }

    &:first-child:last-child &Button:before {
      width: 2px;
    }

    &:last-child {
      margin-bottom: 12px;
      border-bottom: 1px solid $color-neutral;
    }

    &:first-child:last-child &Button:hover,
    &Button:focus,
    &Button:hover,
    &Focused &Button {
      outline: none;
      background: $color-primary-light;

      &:before {
        width: 4px;
      }
    }
  }
}
</style>
