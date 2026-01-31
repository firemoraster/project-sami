<template>
  <section class="team-mob">
    <h4 class="h4 team-title">{{ $t("the") }}</h4>

    <div class="team-swiper swiper">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div v-for="(item, i) in teamData.person" :key="i" class="swiper-slide">
          <h4 class="spec h4">{{ item.position }}</h4>
          <img class="photo" :src="item.face" alt="team photo" />

          <h4 class="h4 name">{{ item.name }}</h4>
          <p class="p3 descr">{{ item.description }}</p>
        </div>
      </div>

      <div class="default-nav-wrap">
        <div class="default-button-prev">
          <IconPolygon />
        </div>
        <div class="default-pagination b3" />
        <div class="default-button-next">
          <IconPolygon />
        </div>
      </div>
    </div>

    <div class="btn-wrap">
      <button @click="isContactPopupOpen = true">
        <CommonButtonDefault :text="$t('coffee_chat')" />
      </button>
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
const teamData = data.value.about.team

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")

onMounted(async () => {
  await nextTick()

  initSwiper()
})

const initSwiper = () => {
  new Swiper(".team-swiper", {
    modules: [Navigation, Pagination],
    loop: true,
    pagination: {
      el: ".team-swiper .default-pagination",
      type: "fraction",
    },

    navigation: {
      nextEl: ".team-swiper .default-button-next",
      prevEl: ".team-swiper .default-button-prev",
    },
  })
}
</script>

<style scoped lang="scss">
.team-mob {
  background: var(--c-black);
  color: var(--c-white);
  display: none;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @include mobile {
    display: block;
  }
}
.btn-wrap {
  color: var(--c-black);
  display: flex;
  justify-content: center;
  margin-top: 8rem;
}
.team-swiper {
  text-align: center;
}
.spec {
  margin-bottom: 3.75rem;
}
.photo {
  height: 7rem;
  margin-bottom: 1.5rem;
}
.name {
  margin-bottom: var(--16);
}
.descr {
  width: 10.3125rem;
  margin-left: auto;
  margin-right: auto;
}
.team-title {
  text-align: center;
}
</style>
