<template>
  <section class="reviews-mobile">
    <div class="screenshots-swiper swiper">
      <div class="swiper-wrapper">
        <div v-for="(item, i) in reviewsData.brands" :key="i" class="swiper-slide">
          <div class="screenshot">
            <img :src="item.photo" :alt="item.name" />
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
const reviewsData = data.value.feedback.reviews

onMounted(async () => {
  await nextTick()
  initSwiper()
})

const initSwiper = () => {
  new Swiper(".screenshots-swiper", {
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 16,
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
}
.swiper-slide {
  width: auto;
}
.screenshot {
  width: 45vw;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.screenshot img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
