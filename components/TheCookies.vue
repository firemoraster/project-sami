<template>
  <div v-if="isCookies" class="cookies">
    <CommonButtonCloseSmall @click="isCookies = false" />

    <p class="emoji">🍪</p>

    <p class="b3">
      {{ $t("cookie_text") }}
      <br />
      <a href="#" target="_blank" class="link hover-line-hide b3">{{
        $t("learn_more")
      }}</a>
    </p>

    <button class="btn b3" @click="onCookiesClose" @mouseenter="playHoverSound">
      {{ $t("accept") }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { playHoverSound, playClickSound } = useSound()

const isCookies = ref(true)

function onCookiesClose() {
  playClickSound()

  isCookies.value = false
  localStorage.setItem("isCookiesAccepted", "true")
}

onMounted(() => {
  if (localStorage.getItem("isCookiesAccepted")) {
    isCookies.value = false
  }
})
</script>

<style scoped lang="scss">
.cookies {
  position: fixed;
  bottom: 2.875rem;
  right: var(--8);
  width: 11.6875rem;
  background: #000;
  box-shadow:
    0.125rem 0.125rem 0.5563rem 0rem rgba(255, 255, 255, 0.33) inset,
    0px -0.125rem 0.1875rem 0px rgba(0, 0, 0, 0.12) inset;
  background: var(--c-yellow);
  padding: 0.5rem 0.5625rem 1rem;
  z-index: var(--z-cookies);
  text-align: center;

  @include mobile {
    right: 1rem;
  }
}
.emoji {
  font-size: 1.125rem;
  margin-bottom: var(--8);
}
.btn {
  border-radius: 62rem;
  margin-top: var(--32);
  padding: var(--8) var(--24);
  background: linear-gradient(180deg, #fbfbfb 100%, #e4e4e4 0%);
  box-shadow:
    0px 0.25rem 0.3438rem 0px rgba(0, 0, 0, 0.15),
    0px 0.1875rem 0.4188rem 0px rgba(0, 0, 0, 0.25),
    0px 1.625rem 1.5938rem 0px #fff inset,
    -0.125rem 0.25rem 0.3125rem 0px #fff inset,
    0.125rem 0.125rem 0.3125rem 0px #fff inset,
    0px -0.1898rem 0.1898rem 0px #d3d3d3 inset,
    0px 0.1898rem 0.1898rem 0px #fff inset;

  transition: all 0.3s var(--default-ease);
}
@include hover {
  .btn:hover {
    box-shadow: none;
  }
}
</style>
