<template>
  <section class="hero">
    <div class="title">{{ heroData.title }}</div>

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
              :class="{ active: activeKey === `${i}-${s}` }"
              @mouseenter="activeKey = `${i}-${s}`"
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

const activeKey = ref("0-0")

onMounted(async () => {
  await nextTick()

  animateSectionTransition()
})
const animateSectionTransition = () => {
  sectionTransition({
    title: ".works .hero .title",
    container: ".monopoly-sect",
    trigger: ".works .hero",
  })
}
</script>

<style scoped lang="scss">
.hero {
  padding-top: var(--24);
  background: var(--c-black);
  color: var(--c-white);
  padding-bottom: 7.5rem;
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

  margin-bottom: 7.25rem;
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
  grid-template-columns: 25.375rem 1fr;
  padding: 0 1rem 0 0.5rem;
}
.subitem {
  cursor: pointer;
  padding: 0.25rem 0;
  transition: all 0.4s var(--default-ease);
}
.subitem.active {
  background: var(--c-white);
  color: var(--c-black);
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
  font-size: 20.25rem;
  font-weight: 300;
  font-variation-settings:
    "wght" 300,
    "wdth" 50,
    "grad" 0;
  line-height: 90%;
  letter-spacing: -0.486rem;
  text-transform: capitalize;
}
.info-text {
  font-family: var(--f-peta-med);
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.0522rem;
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
</style>
