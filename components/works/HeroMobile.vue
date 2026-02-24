<template>
  <section class="hero">
    <div class="title h1">{{ heroData.title }}</div>

    <div class="content">
      <div class="left">
        <div class="items">
          <div
            v-for="({ name, list }, i) in projectsData"
            :key="i"
            class="item"
          >
            <p class="item-name p2">{{ name }}</p>

            <div
              v-for="({ title }, s) in list"
              :key="s"
              class="subitem"
              :data-key="`${i}-${s}`"
              :class="{ active: activeKey === `${i}-${s}` }"
            >
              <p class="p3">{{ title }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="sticky">
          <div class="stack">
            <div
              v-for="({ list }, i) in projectsData"
              :key="i"
              class="info-wrap"
            >
              <div
                v-for="(it, s) in list"
                :key="`${i}-${s}`"
                class="info"
                :class="{ active: activeKey === `${i}-${s}` }"
              >
                <div class="info-item">
                  <div class="mask">
                    <div class="mask-line info-number">{{ it.number1 }}</div>
                  </div>
                  <div class="mask">
                    <div class="mask-line info-text">{{ it.text1 }}</div>
                  </div>
                </div>

                <div class="info-item">
                  <div class="mask">
                    <div class="mask-line info-number">{{ it.number2 }}</div>
                  </div>
                  <div class="mask">
                    <div class="mask-line info-text">{{ it.text2 }}</div>
                  </div>
                </div>
              </div>
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
const projectsData = data.value.projects.data

const activeKey = ref<string | null>(null)

let triggers: ScrollTrigger[] = []

onMounted(async () => {
  await nextTick()
  animOnScroll()
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
  triggers = []
  ScrollTrigger.refresh()
})

const animOnScroll = () => {
  const heroEl = document.querySelector<HTMLElement>(".hero")
  if (!heroEl) return

  const subitems = Array.from(heroEl.querySelectorAll<HTMLElement>(".subitem"))
  if (!subitems.length) return

  // 1) Вихід із секції — прибираємо active
  triggers.push(
    ScrollTrigger.create({
      trigger: heroEl,
      start: "top bottom",
      end: "bottom top",
      onLeave: () => (activeKey.value = null),
      onLeaveBack: () => (activeKey.value = null),
    })
  )

  subitems.forEach((el) => {
    const key = el.dataset.key
    if (!key) return

    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => (activeKey.value = key),
        onEnterBack: () => (activeKey.value = key),
      })
    )
  })
}
</script>

<style scoped lang="scss">
.hero {
  padding-top: 7.75rem;
  background: var(--c-black);
  color: var(--c-white);
  padding-bottom: 7.5rem;
}
.title {
  margin-bottom: 2.9375rem;
  text-align: center;
}
.item {
  margin-bottom: 1.875rem;
}
.item-name {
  color: var(--c-red);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.content {
  display: grid;
  grid-template-columns: 40% 60%;
  padding: 0 1rem;
}
.subitem {
  cursor: pointer;
  padding: 0.25rem 0;
  transition: all 0.4s var(--default-ease);
}
.subitem.active {
  background: #fff;
  color: #000;
}
@include hover {
  .subitem:hover {
    background: var(--c-white);
    color: var(--c-black);
  }
}
.sticky {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 2rem;
}
.left {
  padding-top: 2rem;
}

.stack {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.info {
  text-align: right;
}
.mask {
  overflow: hidden;
}
.mask-line {
  transform: translateY(110%);
  transition: transform 1s var(--default-ease);
  will-change: transform;
}

.info.active .mask-line {
  transform: translateY(0);
}

.info-number {
  color: var(--c-red);
  font-family: var(--f-roboto);
  font-size: 3.5rem;
  font-weight: 300;
  font-variation-settings:
    "wght" 300,
    "wdth" 50,
    "grad" 0;
  line-height: 90%;
  letter-spacing: -0.2rem;
  text-transform: capitalize;
}
.info-text {
  font-family: var(--f-peta-med);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 100%;
  text-transform: uppercase;
}

.info-wrap {
  grid-column: 1;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
.info {
  grid-column: 1;
  grid-row: 1;
}
.info-item {
  margin-bottom: 1rem;
}
</style>
