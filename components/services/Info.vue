<template>
  <section class="info">
    <div class="sticky">
      <p class="title">{{ servicesData.title }}</p>

      <div class="blur" @click="closePopup(currentPopupIndex)" />

      <div class="popups" />

      <div class="gradients">
        <div class="gradient" />
        <div class="gradient" />
      </div>

      <div class="gradients2">
        <img src="/images/service-polygon.png" alt="decor" />
        <img src="/images/service-polygon.png" alt="decor" />
      </div>

      <div class="items">
        <div v-for="(item, i) in servicesData.type" :key="i" class="item">
          <p class="count p1">
            {{ locale === "en" ? "S" : "С" }} {{ i + 1 }}
          </p>

          <div class="photo">
            <img class="inner-img" :src="item.photo" alt="service photo" />
          </div>

          <h3 class="h3 name">{{ item.name }}</h3>
          <p class="p3 description">{{ item.description }}</p>

          <ClientOnly>
            <teleport to=".services .info .popups">
              <ServicesPopup
                :index="i"
                :active-popup-index="currentPopupIndex"
                @open-modal="openPopup"
                @close-modal="closePopup"
              />
            </teleport>
          </ClientOnly>
        </div>
      </div>
    </div>
    <div class="container-scroll-to" />
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const { locale } = useI18n()

const data = useState<MainPage>("all-data")
const servicesData = data.value.services

onMounted(async () => {
  await nextTick()

  animateSectionTransition()
  animContent()
})
const animateSectionTransition = () => {
  sectionTransition({
    title: ".services .info .title",
    container: ".about .team",
    trigger: ".services .info",
  })
}

const animContent = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: ".services .info",
      scrub: true,
      start: "top top",
      end: "bottom bottom",
    },
  })

  tl.from(".services .gradients, .services .gradients2", {
    yPercent: 50,
    duration: 1,
  })

  tl.to(
    ".services .title",
    {
      yPercent: -120,
      duration: 0.8,
    },
    "<"
  )

  tl.from(
    ".services .items",
    {
      yPercent: 100,
      duration: 1,
    },
    "<50%"
  )

  tl.from(
    ".services .popup",
    {
      yPercent: 100,
      duration: 0.2,
    },
    "<80%"
  )

  tl.to(
    ".services .gradients2 img",
    {
      yPercent: -50,
      duration: 0.75,
    },
    "<50%"
  )
  tl.to(
    ".services .gradients2",
    {
      opacity: 0,
      duration: 0.75,
    },
    "<"
  )

  tl.to(
    {},
    {
      delay: 0.1,
    }
  )
}

const currentPopupIndex = ref(0)

const openPopup = (i: number) => {
  useScrollTo(".services .info .container-scroll-to", { duration: 0.3 })

  setTimeout(() => {
    useLockScroll(true)
  }, 350)

  currentPopupIndex.value = i

  const popups = document.querySelectorAll(".services .popup")
  popups.forEach((el, idx) => {
    if (i !== idx) {
      gsap.set(popups[idx], {
        zIndex: 2,
      })
    } else {
      gsap.set(popups[idx], {
        zIndex: 3,
      })
    }
  })

  const learnMore = popups[i].querySelector(".learn-more-wrap")
  const content = popups[i].querySelector(".popup-content")

  const tl = gsap.timeline()
  tl.set(".services .blur", {
    pointerEvents: "auto",
  })
  tl.to(".header", {
    yPercent: -105,
    duration: 0.3,
  })
  tl.to(
    ".footer, .fixed-title",
    {
      yPercent: 105,
      duration: 0.3,
    },
    "<"
  )
  tl.to(
    ".fixed-title",
    {
      opacity: 0,
      duration: 0.3,
    },
    "<"
  )
  tl.to(
    popups[i],
    {
      height: "100%",
    },
    "<"
  )
  tl.to(
    learnMore,
    {
      opacity: 0,
      pointerEvents: "none",
    },
    "<"
  )
  tl.to(
    ".services .blur",
    {
      opacity: 1,
    },
    "<"
  )
  tl.to(
    content,
    {
      opacity: 1,
      pointerEvents: "auto",
    },
    "<50%"
  )
}

const closePopup = (i: number) => {
  useLockScroll(false)

  currentPopupIndex.value = i

  const popups = document.querySelectorAll(".services .popup")

  const learnMore = popups[i].querySelector(".learn-more-wrap")
  const content = popups[i].querySelector(".popup-content")

  const tl = gsap.timeline()
  tl.set(".services .blur", {
    pointerEvents: "none",
  })

  tl.to(content, {
    opacity: 0,
    duration: 0.3,
    pointerEvents: "none",
  })

  tl.to(
    ".header",
    {
      yPercent: 0,
      duration: 0.3,
    },
    "<"
  )
  tl.to(
    ".footer, .fixed-title",
    {
      yPercent: 0,
      duration: 0.3,
    },
    "<"
  )

  tl.to(
    ".fixed-title",
    {
      opacity: 1,
      duration: 0.3,
    },
    "<"
  )

  tl.to(
    popups[i],
    {
      height: "auto",
    },
    "<"
  )

  tl.to(
    learnMore,
    {
      opacity: 1,
      pointerEvents: "auto",
    },
    "<"
  )

  tl.to(
    ".services .blur",
    {
      opacity: 0,
    },
    "<"
  )
}
</script>

<style scoped lang="scss">
.info {
  height: 200vh;
  background: var(--c-blue);

  @include mobile {
    display: none;
  }
}
.sticky {
  height: 100vh;
  overflow: hidden;
  position: sticky;
  padding: var(--24) var(--8) 0;
  top: 0;
  left: 0;
  width: 100%;
}
.title {
  color: var(--c-white);
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
  font-size: 19.875rem;
  letter-spacing: -0.4771rem;
}
.items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: absolute;
  inset: 0;
}
.item {
  padding-top: var(--72);
  padding-bottom: 10.1875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}
.count {
  position: absolute;
  left: var(--32);
  top: var(--72);
}
.photo {
  position: relative;
  width: 14.5625rem;
  height: 14.5625rem;
  margin-bottom: 3rem;
  @include mobile {
    margin-bottom: 4rem;
  }
}
.name {
  width: 23rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.description {
  width: 21.25rem;
  margin-top: var(--24);
}
.gradients {
  pointer-events: none;
  position: absolute;
  inset: 0;
  margin-top: 0.125rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.gradient:nth-child(1) {
  background: linear-gradient(
      270deg,
      #82b3d9 0%,
      #bed8ed 8.35%,
      #cfe1ef 17.4%,
      #f4f4f4 28.4%,
      #f0f2f4 44.4%,
      #e9eef3 65.4%,
      #b6d5ee 100%
    ),
    linear-gradient(
      270deg,
      #8fbee3 0%,
      #bed8ed 4.4%,
      #cfe1ef 9.4%,
      #f4f4f4 19.9%,
      #f0f2f4 37.9%,
      #fff 54.9%,
      #e9eef3 78.4%,
      #a0c9e9 100%
    );
}
.gradient:nth-child(2) {
  background: linear-gradient(
      90deg,
      #82b3d9 0%,
      #bed8ed 8.35%,
      #cfe1ef 17.4%,
      #f4f4f4 28.4%,
      #f0f2f4 44.4%,
      #e9eef3 65.4%,
      #b6d5ee 100%
    ),
    linear-gradient(
      90deg,
      #8fbee3 0%,
      #bed8ed 4.4%,
      #cfe1ef 9.4%,
      #f4f4f4 19.9%,
      #f0f2f4 37.9%,
      #fff 54.9%,
      #e9eef3 78.4%,
      #a0c9e9 100%
    );
}
.gradient {
  overflow: hidden;
}
.gradient img {
  width: 100%;
  position: relative;
  scale: 1.1;
}
.gradient:first-child img {
  transform: scaleX(-1);
}
.gradients2 {
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.gradients2 img {
  width: 100%;
}
.gradients2 img:first-child {
  transform: scaleX(-1);
}
.blur {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(13px);
  z-index: 3;
  opacity: 0;
}
.container-scroll-to {
  pointer-events: none;
  height: 100vh;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
