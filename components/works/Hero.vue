<template>
  <section class="hero">
    <div class="title">{{ heroData.title }}</div>

    <div class="wrap">
      <div class="left">
        <p class="p4">{{ heroData.description }}</p>
      </div>
      <div class="right">
        <div class="head">
          <p v-if="hasBrandNames" class="b2">{{ $t("worked_with") }}</p>
          <p class="b2">{{ $t("industry") }}</p>
        </div>
        <div class="body">
          <div class="line" />
          <div class="items">
            <div
              v-for="(brand, i) in heroData.brands"
              :key="i"
              class="item"
              @mouseenter="onMouseEnter"
              @mouseleave="onMouseLeave"
            >
              <p v-if="hasBrandNames" class="p3">{{ brand.name }}</p>
              <p class="p3">{{ brand.industry }}</p>

              <img v-if="brand.logo" :src="brand.logo" alt="brand logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const heroData = data.value.projects.hero

const hasBrandNames = computed(() =>
  heroData.brands.some(brand => brand.name)
)

onMounted(async () => {
  await nextTick()

  animateSectionTransition()
})
const animateSectionTransition = () => {
  sectionTransition({
    title: ".works .hero .title",
    container: ".services .info .sticky",
    trigger: ".works .hero",
  })
}


const onMouseEnter = (event: MouseEvent) => {
  const line = document.querySelector(".works .hero .line")
  const target = event.currentTarget as HTMLElement
  const { offsetTop, offsetHeight } = target

  gsap.to(line, {
    y: offsetTop,
    height: offsetHeight,
  })
}

const onMouseLeave = () => {
  const line = document.querySelector(".works .hero .line")

  gsap.to(line, {
    height: 0,
  })
}
</script>

<style scoped lang="scss">
.hero {
  padding-top: var(--24);
  @include mobile {
    display: none;
  }
}
.title {
  font-size: 13.625rem;
  text-align: center;
  font-family: var(--f-roboto);
  font-weight: 300;
  text-transform: capitalize;
  font-variation-settings:
    "wght" 300,
    "wdth" 150,
    "grad" 0;
  line-height: 82%;
  white-space: nowrap;
  font-size: 13.625rem;
  letter-spacing: -0.3276rem;
}
.wrap {
  margin-top: var(--72);
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.left {
  padding-left: var(--8);
}
.left p {
  width: 13.625rem;
  line-height: 130%;
}
.head {
  display: flex;
  margin-bottom: var(--24);
}
.head p:first-child {
  flex: 0 0 15.0625rem;
}
.item {
  display: flex;
  position: relative;
  cursor: pointer;
  padding: var(--2) 0 var(--2) var(--2);
  z-index: 2;
}
.item:not(:last-child) {
  margin-bottom: var(--4);
}
.item p:first-child {
  flex: 0 0 15.0625rem;
}
.item p:nth-child(2) {
  flex: 1;
}
.item img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: var(--8);
  width: 6.9375rem;
  opacity: 0;
}
@include hover {
  .item:hover img {
    opacity: 1;
  }
}
.body {
  position: relative;
}
.line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background: var(--c-white);
}
</style>
