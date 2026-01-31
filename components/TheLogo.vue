<template>
  <div class="fixed-logo">
    <IconLogo />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.fixed-logo {
  padding: var(--32);
  position: fixed;
  bottom: 0;
  left: 0;
  transform-origin: bottom;
  z-index: 9500;
  pointer-events: none;
  opacity: 0;
}
.fixed-logo:deep(svg) {
  width: 8rem;
}
</style>
