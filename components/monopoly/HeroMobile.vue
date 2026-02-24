<template>
  <section class="board">
    <IconMonopolyDecorMob class="monopoly-decor" />

    <div class="details">
      <div
        v-for="({ details }, i) in monopoly.blocks"
        :key="i"
        class="info"
        :class="{ active: activeKey === i }"
      >
        <div
          v-for="({ number, text }, d) in details"
          :key="d"
          class="info-item"
        >
          <div class="mask">
            <div class="mask-line info-number">{{ number }}</div>
          </div>
          <div class="mask">
            <div class="mask-line info-text">{{ text }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="slider">
      <button class="nav" :disabled="!canPrev" @click="prev">
        <svg
          class="icon"
          viewBox="0 0 8 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-3.49691e-07 8L8 -3.49691e-07L8 16L-3.49691e-07 8Z"
            fill="white"
          />
        </svg>
      </button>

      <div
        ref="viewportEl"
        class="viewport"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @pointerleave="onPointerUp"
      >
        <div class="track" :style="trackStyle">
          <button
            v-for="({ img, title }, i) in monopoly.blocks"
            :key="i"
            class="slide"
            :class="{ active: activeKey === i }"
            type="button"
          >
            <div class="slide-inner">
              <img class="slide-img" :src="img" alt="" />
              <span class="slide-title">{{ title }}</span>
            </div>
          </button>
        </div>
      </div>

      <button class="nav" :disabled="!canNext" @click="next">
        <svg
          class="icon"
          viewBox="0 0 8 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 8L-6.99382e-07 16L0 -3.49691e-07L8 8Z" fill="white" />
        </svg>
      </button>
    </div>

    <div class="globe">
      <div class="globe-wrap">
        <img src="/images/globe.png" alt="globe" :style="globeStyle" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const monopoly = data.value.monopoly

const activeKey = ref(0)

const total = computed(() => monopoly.blocks?.length ?? 0)
const canPrev = computed(() => activeKey.value > 0)
const canNext = computed(() => activeKey.value < total.value - 1)

const setActive = (i: number) => {
  if (i < 0 || i > total.value - 1) return
  activeKey.value = i
}

const prev = () => setActive(activeKey.value - 1)
const next = () => setActive(activeKey.value + 1)

const viewportEl = ref<HTMLElement | null>(null)

const isDragging = ref(false)
const startX = ref(0)
const dragOffset = ref(0) // px
const dragStarted = ref(false)

const thresholdRatio = 0.2 // 20% ширини свайпа для перемикання

const getWidth = () => viewportEl.value?.clientWidth || 1

const onPointerDown = (e: PointerEvent) => {
  if (!viewportEl.value) return

  isDragging.value = true
  dragStarted.value = false
  startX.value = e.clientX
  dragOffset.value = 0

  viewportEl.value.setPointerCapture?.(e.pointerId)
}

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return

  const dx = e.clientX - startX.value
  // якщо реально потягнули — блокуємо клік по слайду
  if (Math.abs(dx) > 6) dragStarted.value = true

  dragOffset.value = dx
}

const onPointerUp = () => {
  if (!isDragging.value) return

  const w = getWidth()
  const dx = dragOffset.value
  const threshold = w * thresholdRatio

  isDragging.value = false
  dragOffset.value = 0

  if (dx > threshold) prev()
  else if (dx < -threshold) next()
}

// style: 100% + px drag
const trackStyle = computed(() => ({
  transform: `translateX(calc(${-activeKey.value * 100}% + ${dragOffset.value}px))`,
  transition: isDragging.value ? "none" : "transform 0.6s var(--default-ease)",
}))

const globeDeg = ref(0)

// 360° за весь шлях 0 -> last
const stepDeg = computed(() => {
  const n = total.value
  return n > 1 ? 360 / (n - 1) : 0
})

// цільовий кут по активному слайду
watch(
  () => activeKey.value,
  (k) => {
    globeDeg.value = k * stepDeg.value
  },
  { immediate: true }
)

const globeStyle = computed(() => ({
  transform: `rotate(-${globeDeg.value}deg)`,
  transition: "transform 0.6s var(--default-ease)",
  willChange: "transform",
}))
</script>

<style scoped lang="scss">
.board {
  display: none;
  background: #000;
  color: #fff;
  padding-top: 3.125rem;
  position: relative;
  overflow: hidden;
  @include mobile {
    display: block;
  }
}

.details {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  text-align: right;
  padding-right: 1rem;
}

.mask {
  overflow: hidden;
}
.mask-line {
  transform: translateY(110%);
  transition: transform 1s var(--default-ease);
  will-change: transform;
}
.info {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.info.active .mask-line {
  transform: translateY(0);
}

.info-number {
  color: var(--c-red);
  font-family: var(--f-roboto);
  font-size: 8rem;
  font-weight: 300;
  font-variation-settings:
    "wght" 300,
    "wdth" 50,
    "grad" 0;
  line-height: 90%;
  letter-spacing: -0.286rem;
  text-transform: capitalize;
}
.info-text {
  font-family: var(--f-peta-med);
  font-size: 0.5625rem;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.02rem;
  text-transform: uppercase;
}

.monopoly-decor {
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
}

/* SLIDER */
.slider {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 4rem 1fr 4rem;
  align-items: center;
  margin-top: 2rem;
}

.nav {
  height: 4rem;
  width: 4rem;
  transition: opacity 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav:disabled {
  opacity: 0.35;
}

.nav .icon {
  width: 0.5rem;
}

.viewport {
  overflow: hidden;
  width: 100%;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.track {
  display: flex;
  will-change: transform;
  transition: transform 0.6s var(--default-ease);
}

.slide {
  flex: 0 0 100%;
  text-align: center;
}

.slide-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.slide-title {
  font-family: var(--f-peta-med);
  font-size: 0.8525rem;
  text-transform: uppercase;
}
.slide-img {
  width: 3rem;
}
.globe {
  display: flex;
  justify-content: center;
  height: 18.75rem;
  overflow: hidden;
  margin-top: 1rem;
}
.globe-wrap {
  width: 41rem;
  flex: 0 0 41rem;
}
.globe-wrap img {
  width: 100%;
}
</style>
