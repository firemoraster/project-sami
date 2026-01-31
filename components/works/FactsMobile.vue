<template>
  <section class="facts-mob">
    <div class="logo">
      <IconLogo />
    </div>

    <div class="facts-swiper swiper">
      <div class="swiper-wrapper">
        <div v-for="(item, i) in factsData" :key="i" class="swiper-slide">
          <p class="number h1">
            {{ item.number }}
          </p>
          <p class="info p1">
            {{ item.text }}
          </p>
        </div>
      </div>
      <div class="default-nav-wrap _grey">
        <div class="default-button-prev">
          <IconPolygon />
        </div>
        <div class="default-pagination b3" />
        <div class="default-button-next">
          <IconPolygon />
        </div>
      </div>
    </div>


  </section>
</template>

<script setup lang="ts">
import Swiper from "swiper"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css/navigation"
import "swiper/css/pagination"
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const factsData = data.value.projects.facts

onMounted(async () => {
  await nextTick()

  initSwiper()
})

const initSwiper = () => {
  new Swiper(".facts-swiper", {
    modules: [Navigation, Pagination],
    loop: true,
    pagination: {
      el: ".facts-swiper .default-pagination",
      type: "fraction",
    },

    navigation: {
      nextEl: ".facts-swiper .default-button-next",
      prevEl: ".facts-swiper .default-button-prev",
    },
  })
}
</script>

<style scoped lang="scss">
.facts-mob {
  position: relative;
  display: none;
  background: var(--c-black);
  color: var(--c-white);
  padding: 4rem 0;
  @include mobile {
    display: block;
  }
}
.logo {
  position: absolute;
  width: 5.1875rem;
  top: 2rem;
  right: 4rem;
  z-index: 2;
}
.facts-swiper {
  text-align: center;
}
.number {
  color: var(--c-red);
}
.info {
  width: 16.125rem;
  margin: 1rem auto 0;
  color: var(--c-white);
}
</style>
