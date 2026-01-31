<template>
  <section class="facts">
    <div class="logo">
      <IconLogo />
    </div>

    <div class="items">
      <div v-for="(fact, i) in factsData" :key="i" class="item">
        <div class="number">
          <p class="h1">{{ fact.number }}</p>
        </div>
        <div class="info">
          <p class="p1">{{ fact.text }}</p>
        </div>
      </div>
    </div>

    <div class="navigation" :data-area-for-tip="tipText">
      <div
        data-tip-left
        @click="prevFact"
        @mouseenter="tipText = $t('prev_fact')"
      />
      <div @click="nextFact" @mouseenter="tipText = $t('next_fact')" />
    </div>

    <div class="pagination b2">
			<span class="pagination-items">
				<span v-for="(_, i) in factsData" :key="i" class="pagination-number">
					{{ i + 1 }}
				</span>
			</span>
			<span> - {{ factsData.length }}</span>

    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const factsData = data.value.projects.facts

const tipText = ref("")
const currentIndex = ref(0)
const prevIndex = ref(0)

let isAnimPlay = false


onMounted(async () => {
  await nextTick()

  parallaxImagesOnScroll()
  splitText()
	setPaginationHeight()
  showFact(0, 0)
})

const parallaxImagesOnScroll = () => {
  parallaxImage({
    percents: [-100],
    elements: ".works .facts .logo",
  })
}

const showFact = (newIndex: number, oldIndex: number) => {
  if (isAnimPlay) return

  isAnimPlay = true

  const facts = document.querySelectorAll(".works .facts .item")

  const tl = gsap.timeline({
    onComplete() {
      isAnimPlay = false
    }
  })

  const prevFact = facts[oldIndex]
  const prevNumber = prevFact.querySelector(".number")
  const prevText = prevFact.querySelectorAll(".word-anim")

  const currentFact = facts[newIndex]
  const currentNumber = currentFact.querySelector(".number")
  const currentText = currentFact.querySelectorAll(".word-anim")

	const pagination = document.querySelectorAll(".works .facts .pagination-number")

  tl.set(currentFact, {
    opacity: 1
  })

  if (newIndex === oldIndex) return

  tl.set(currentNumber, {
    opacity: 1,
  })

	tl.to(pagination, {
		yPercent: -newIndex + "00",
		duration: 0.75,
	}, "<")

  tl.fromTo(prevNumber, {
    scaleY: 1,
  }, {
    scaleY: 0.01,
    transformOrigin: "top",
    duration: 0.75,
  }, "<")



  tl.fromTo(currentNumber, {
    scaleY: 0.01,
  }, {
    scaleY: 1,
    transformOrigin: "bottom",
    duration: 0.75,
  }, "<")

  tl.fromTo(currentText, {
    yPercent: 105,
  }, {
    yPercent: 0,
    stagger: 0.05,
  }, "<")

  tl.fromTo(prevText, {
    yPercent: 0,
  }, {
    yPercent: -105,
    stagger: 0.02,
  }, "<")

  tl.fromTo(prevNumber, {
    opacity: 1,
  }, {
    opacity: 0,
    duration: 0.2,
  }, "<80%")

  tl.set(prevFact, {
    opacity: 0,
  })
}

const nextFact = () => {
  if (isAnimPlay) return

  prevIndex.value = currentIndex.value;
  currentIndex.value = (currentIndex.value + 1) % factsData.length;
  showFact(currentIndex.value, prevIndex.value)
}

const prevFact = () => {
  if (isAnimPlay) return

  prevIndex.value = currentIndex.value;
  currentIndex.value = (currentIndex.value - 1 + factsData.length) % factsData.length;
  showFact(currentIndex.value, prevIndex.value)
}

const splitText = () => {
  useSplitText(".works .facts .info")
}

const setPaginationHeight = () => {
	const items = document.querySelectorAll(".works .facts .pagination-number")
	gsap.set(".works .facts .pagination-items", {
		height: items[0].clientHeight
	})
}
</script>

<style scoped lang="scss">
.facts {
  position: relative;
  margin-top: var(--152);
  height: 20.625rem;

  @include mobile {
    display: none;
  }
}
.items {
  height: 100%;
  position: relative;
}
.item {
  opacity: 0;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-left: var(--8);
}
.logo {
  position: absolute;
  top: 0;
  left: 25.125rem;
  width: 8.8125rem;
  z-index: 2;
  pointer-events: none;
}
.info p {
  width: 17rem;
  line-height: 1.3;
}
.pagination {
  position: absolute;
  top: 0;
  right: var(--8);
}
.navigation {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  z-index: 3;
}
.number {
  white-space: nowrap;
}
.pagination-items {
	display: inline-flex;
	flex-direction: column;
	overflow: hidden;
}
</style>
