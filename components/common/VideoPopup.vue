<template>
  <div class="video-popup">
    <div class="video-close">
      <CommonButtonClose @click="closeVideoPopup" />
    </div>

    <CommonVideoPlayer :src="videoData" />
  </div>
</template>

<script lang="ts" setup>
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const videoData = data.value.intro.hero.video

const isVideoPopupOpen = useState<boolean>("is-video-popup-open")

onMounted(() => {
  console.log(videoData)

  useLockScroll(true)
  gsap.to(".video-popup", {
    opacity: 1,
  })
})
const closeVideoPopup = () => {
  gsap.to(".video-popup", {
    opacity: 0,
    onComplete() {
      useLockScroll(false)
      isVideoPopupOpen.value = false
    },
  })
}
</script>

<style lang="scss" scoped>
.video-popup {
  position: fixed;
  inset: 0;
  z-index: var(--z-popup);
  overflow: hidden;
  background: var(--c-black);
  opacity: 0;
}
.video-close {
  position: absolute;
  top: var(--16);
  right: 0;
  z-index: 10;
  color: var(--c-white);
  cursor: pointer;
}
</style>
