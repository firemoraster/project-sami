<template>
  <div
    ref="selectWrap"
    class="select__wrap"
    :class="[
      { 'has-error': !!errorMessage, success: meta.valid },
      { _opened: isOpen },
    ]"
  >
    <div class="select" @click="toggleDropdown">
      <span class="decor">(</span>
      <span class="selected">
        <span class="title p2">{{ selectedValue || placeholder }}</span>
        <span class="arrow">
          <IconArrow />
        </span>
      </span>
      <span class="decor">)</span>
    </div>
    <ul v-if="isOpen" class="dropdown">
      <li
        v-for="option in options"
        :key="option"
        class="p2"
        :class="{ _selected: selectedValue === option }"
        @click="selectOption(option)"
      >
        <span class="option-text">{{ option }}</span>
        <span class="option-check">
          <IconCheck />
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate"

interface Props {
  name: string
  options: string[]
  placeholder: string
  value?: string
}
const props = defineProps<Props>()

const name = toRef(props, "name")
const {
  value: selectedValue,
  errorMessage,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
})

const isOpen = ref(false)
const selectWrap = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: string) {
  selectedValue.value = option
  isOpen.value = false
}

function closeDropdown(event: MouseEvent) {
  if (selectWrap.value && !selectWrap.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown)
})
</script>

<style lang="scss" scoped>
.select__wrap {
  position: relative;
  width: 18.75rem;

  @include mobile {
    width: 100%;
  }
}
.select {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include mobile {
    background: #E7E7E7;
    padding: .75rem 1rem;
  }
}
.selected {
  display: flex;
  align-items: center;
  gap: var(--8);

  @include mobile {
    justify-content: space-between;
    width: 100%;
  }
}
.arrow {
  width: 0.625rem;
  transition: all 0.3s var(--default-ease);
  display: inline-flex;
  position: relative;
  top: 0.125rem;

  @include mobile {
    top: 0;
  }
}
.decor {
  font-size: 2.1875rem;
  line-height: 128%;
  font-family: var(--f-peta-reg);
  opacity: 0.2;
  transition: all 0.3s var(--default-ease);

  @include mobile {
    display: none;
  }
}
.dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 16rem;
  z-index: 10;
  max-height: 18.75rem;
  padding: var(--8);
  overflow-y: auto;
  background: linear-gradient(180deg, #f4f4f4 24%, #fff 100%);
  box-shadow:
    0px 7.9375rem 2.1875rem 0px rgba(0, 0, 0, 0),
    0px 5.0625rem 2rem 0px rgba(0, 0, 0, 0.01),
    0px 2.875rem 1.6875rem 0px rgba(0, 0, 0, 0.05),
    0px 1.25rem 1.25rem 0px rgba(0, 0, 0, 0.09),
    0px 0.5625rem 0.5625rem 0px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: var(--4);

  @include mobile {
    width: 100%;
    left: 0;
    transform: none;
    padding: 0;
    background: none;
    gap: 0;
  }
}
.dropdown li {
  padding: var(--8) 0.625rem var(--12);
  cursor: pointer;
  transition: all 0.3s var(--default-ease);
  text-align: center;

  @include mobile {
    padding: .75rem 1rem;
    background: var(--c-white);
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.option-check {
  display: none;

  @include mobile {
    display: block;
    opacity: 0;
    width: .75rem;
  }
}
@include hover {
  .dropdown li:hover {
    background: #e7e7e7;
  }
}
.dropdown li._selected {
  background: var(--c-yellow);
}
.dropdown li._selected .option-check {
  opacity: 1;
}

.has-error .select {
  color: var(--c-red);
}
.has-error .decor {
  opacity: 1;
}
.has-error .arrow {
  --icon-color: var(--c-red);
}
._opened .decor {
  opacity: 1;
}
._opened .arrow {
  transform: rotate(180deg);
}
._opened .select {
  @include mobile {
    background: var(--c-white);
    box-shadow: inset 0 0 0 .0625rem var(--c-black);
  }
}
</style>
