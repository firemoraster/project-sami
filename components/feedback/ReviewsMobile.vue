<template>
  <section class="reviews-mobile">
    <div class="screenshots-swiper swiper">
      <div class="swiper-wrapper">
        <div v-for="(img, i) in reviewsData" :key="i" class="swiper-slide">
          <div class="screenshot">
            <img :src="img" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Swiper from "swiper"
import "swiper/css"
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const reviewsData = data.value.feedback.screens

onMounted(async () => {
  await nextTick()
  initSwiper()
})

const initSwiper = () => {
  new Swiper(".screenshots-swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 8,
  })
}
</script>

<style scoped lang="scss">
.reviews-mobile {
  display: none;
  background: var(--c-black);
  padding: 2rem 0 4rem;

  @include mobile {
    display: block;
  }
}
.screenshots-swiper {
  overflow: visible;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}
.swiper-slide {
  width: auto;
}
.screenshot {
  width: 17.75rem;
  border-radius: 1.5rem;
  overflow: hidden;
}
.screenshot img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
