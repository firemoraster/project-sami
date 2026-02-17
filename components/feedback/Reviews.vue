<template>
  <section class="reviews">
    <div class="block">
      <p class="from b2">
        <span v-if="locale === 'en'">{{ $t("from") }}</span
        ><br />
        {{ $t("influencers") }}
      </p>
      <div class="items">
        <FeedbackCard
          v-for="(_, i) in reviewsData.influencers"
          :key="i"
          :index="i"
          type="influencers"
          class="card"
        />
      </div>
    </div>
    <div class="block">
      <p class="from b2">
        <span v-if="locale === 'en'">{{ $t("from") }}</span
        ><br />
        {{ $t("brands") }}
      </p>
      <div class="items">
        <FeedbackCard
          v-for="(_, i) in reviewsData.brands"
          :key="i"
          :index="i"
          type="brands"
          class="card"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const { locale } = useI18n()

const data = useState<MainPage>("all-data")
const reviewsData = data.value.feedback.reviews

onMounted(async () => {
  await nextTick()

  initRandomRotationAndPosition()
  initDraggable()
})

const initDraggable = () => {
  const items = document.querySelectorAll(".feedback .reviews .item")

  items.forEach((el) => {
    Draggable.create(el, {
      type: "x,y",
      bounds: ".feedback",
    })
  })
}

const initRandomRotationAndPosition = () => {
  const containers = document.querySelectorAll(".feedback .reviews .items")

  containers.forEach((container) => {
    const containerRect = container.getBoundingClientRect()
    const items = container.querySelectorAll(".item")

    items.forEach((el) => {
      const randomX = gsap.utils.random(0, containerRect.width - el.clientWidth)
      const randomRotation = gsap.utils.random(-13, 13, 1)

      gsap.set(el, { x: randomX, rotate: randomRotation })
    })
  })
}
</script>

<style scoped lang="scss">
.reviews {
  margin-top: var(--32);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--8);
  padding-left: var(--8);
  padding-right: var(--8);

  @include mobile {
    display: none;
  }
}
.block {
  height: 30rem;
  position: relative;
}
.from {
  position: absolute;
  top: var(--16);
  color: white;
}
.block:first-child .from {
  left: var(--16);
}
.block:last-child .from {
  right: var(--16);
  text-align: right;
}
.card:nth-child(even) {
  background: #eee;
}
</style>
