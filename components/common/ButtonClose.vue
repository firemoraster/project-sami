<template>
  <button class="close b2" @mouseenter="playHoverSound" @click="playClickSound">
    {{ $t("close") }}
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 7L17 17M17 7L7 17" stroke="white" stroke-width="2" />
    </svg>
  </button>
</template>
<script lang="ts" setup>
const { playHoverSound, playClickSound } = useSound()
</script>
<style lang="scss" scoped>
.close {
  display: flex;
  align-items: center;
  padding: var(--2) var(--2) var(--4) var(--8);
  color: var(--c-white);
  background: var(--c-black);

  @include mobile {
    width: 100%;
    padding: 0.15rem 1rem 0.2rem;
    justify-content: space-between;
  }
}
.close svg {
  width: 1.5rem;
  transition: all 0.5s var(--default-ease);
}

@include hover {
  .close:hover svg {
    transform: rotate(180deg);
  }
}
</style>
