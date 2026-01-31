<template>
  <button class="close" @mouseenter="playHoverSound" @click="playClickSound">
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.28516 4.28516L11.7148 11.7148M11.7148 4.28516L4.28516 11.7148"
          stroke="white"
          stroke-width="2"
        />
      </svg>
    </button>
</template>
<script lang="ts" setup>
const { playHoverSound, playClickSound } = useSound()
</script>
<style lang="scss" scoped>
.close svg {
  width: 1rem;
  height: auto;
  display: block;

  @include mobile {
    width: 1.5rem;
  }
}
.close {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--c-black);
  cursor: pointer;
}
</style>
