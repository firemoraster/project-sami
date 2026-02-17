<template>
  <section class="details">
    <div class="title">{{ detailsData.title }}</div>

    <div class="description">
      <p class="b2">{{ detailsData.description.title }}</p>
      <p class="p3">{{ detailsData.description.text }}</p>
    </div>

    <div class="wrap">
      <div class="logo">
        <IconLogo />
      </div>
      <h2 v-if="locale === 'en'" class="title-2 h2">
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[0] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[1] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[2] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[3] }}</span>
          </span>
        </span>
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[4] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[5] }}</span>
          </span>
        </span>
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[6] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[7] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[8] }}</span>
          </span>
        </span>
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[9] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[10] }}</span>
          </span>
        </span>
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[11] }}</span>
          </span>
        </span>
      </h2>

      <h2 v-if="locale === 'ua'" class="title-2 h2">
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[0] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[1] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[2] }}</span>
          </span>
        </span>
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[3] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[4] }}</span>
          </span>
        </span>
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[5] }}</span>
          </span>
        </span>
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[6] }}</span>
          </span>
        </span>
        <span class="title-2-row">
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[7] }}</span>
          </span>
          <span class="title-2-word">
            <span class="title-2-mask">{{ detailsData.title2[8] }}</span>
          </span>
        </span>

      </h2>
    </div>

    <div class="wrap-2">
      <div class="triggers">
        <div
          v-for="(_, i) in detailsData.photos"
          :key="i"
          class="trigger-img"
        />
      </div>
      <div class="sticky">
        <div class="photos-wrap">
          <div class="blur" />
          <div class="photos">
            <img
              v-for="(img, i) in detailsData.photos"
              :key="i"
              :src="img"
              class="inner-img"
              alt="details-photo"
            />
          </div>
        </div>

        <div class="logo-2" />

        <div class="content">
          <div class="left">
            <h3 class="h3">{{ detailsData.coreTitle }}</h3>
          </div>
          <div class="right">
            <h3 class="h3">{{ detailsData.coreValue }}</h3>

            <div class="description-2">
              <p class="b2">{{ detailsData.mission.title }}</p>
              <p class="p3">{{ detailsData.mission.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import lottie from "lottie-web"
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const detailsData = data.value.about.details

const { locale } = useI18n()

onMounted(async () => {
  await nextTick()

  animateSectionTransition()
  animateText()
  parallaxImagesOnScroll()
  animContent()
})

const animateText = () => {
  animTitle({
    trigger: ".about .details .title-2",
    elements: ".about .details .title-2-mask",
  })
}

const animateSectionTransition = () => {
  sectionTransition({
    title: ".about .details .title",
    container: ".intro .info .vision",
    trigger: ".about .details",
  })
}

const parallaxImagesOnScroll = () => {
  parallaxImage({
    percents: [-100],
    elements: ".about .details .logo",
  })
}

const animContent = () => {
  gsap.from(".about .details .photos", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".about .details .sticky",
      start: "-30% bottom",
      end: "bottom bottom",
      scrub: true,
    },
  })

  const triggers = document.querySelectorAll(".about .details .trigger-img")
  const images = document.querySelectorAll(".about .details .photos img")

  triggers.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top center",
      end: "bottom center",
      onEnter() {
        gsap.set(images[i], {
          zIndex: 2,
        })
      },
      onLeave() {
        gsap.set(images[i], {
          zIndex: 0,
        })
      },
      onEnterBack() {
        gsap.set(images[i], {
          zIndex: 2,
        })
      },
      onLeaveBack() {
        if (i) {
          gsap.set(images[i], {
            zIndex: 0,
          })
        }
      },
    })
  })

  const tl = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: ".about .details .wrap-2",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  })

  tl.fromTo(
    ".about .details .photos",
    {
      clipPath: "polygon(33% 0%, 67% 0%, 67% 100%, 33% 100%)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    }
  )
  tl.to(
    ".about .details .blur",
    {
      opacity: 1,
    },
    "<80%"
  )

  const iconContainer = document.querySelector(".about .details .logo-2")

  let totalFrames: number
  let logoAnim: any

  if (iconContainer) {
    logoAnim = lottie.loadAnimation({
      container: iconContainer,
      renderer: "canvas",
      loop: true,
      autoplay: false,
      path: "/lottie/logo.json",
    })
    logoAnim.addEventListener("DOMLoaded", () => {
      totalFrames = logoAnim.totalFrames - 1
    })
  }

  tl.from(
    iconContainer,
    {
      scale: 0,
    },
    "<"
  )

  tl.to(
    {},
    {
      duration: 0.2,
      repeat: 2,
      onUpdate() {
        if (totalFrames) {
          const frame = totalFrames * this.progress()
          logoAnim.goToAndStop(frame, true)
        }
      },
    },
    "<"
  )

  tl.to(
    ".about .details .content", {
      y: 0,
      yPercent: 0,
      duration: 1,
  })

  tl.to(
    ".about .details .blur",
    {
      backgroundColor: "rgba(0,0,0,0.61)",
    },
    "<"
  )

  tl.to(
    {},
    {
      duration: 1,
      onUpdate() {
        if (totalFrames) {
          const frame = totalFrames * this.progress()
          logoAnim.goToAndStop(frame, true)
        }
      },
    },
    "<"
  )

  gsap.to(".about .details .sticky", {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".about .details",
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
    },
  })
}
</script>

<style scoped lang="scss">
.details {
  padding: var(--24) var(--8) 0;
  background: #003F41;
  color: var(--c-white);
  position: relative;

  @include mobile {
    display: none;
  }
}
.details:after {
  content: "";
  position: absolute;
  height: 50vh;
  width: 100%;
  left: 0;
  bottom: 100%;
  background: linear-gradient(var(--c-white), #003F41);
  margin-bottom: -8rem;
}
.title {
  font-family: var(--f-roboto);
  font-weight: 300;
  text-transform: capitalize;
  font-variation-settings:
    "wght" 300,
    "wdth" 150,
    "grad" 0;
  line-height: 82%;
  text-transform: capitalize;
  white-space: nowrap;
  font-size: 13.4761rem;
  letter-spacing: -0.3234rem;
  text-align: center;
  position: relative;
  z-index: 4;
}
.description {
  margin-left: 50%;
  width: 25.625rem;
  margin-top: 16rem;
}
.description p:nth-child(1) {
  margin-bottom: var(--16);
}
.title-2-row {
  display: flex;
  justify-content: space-between;
}
.title-2-word {
  overflow: hidden;
}
.title-2-word {
  margin-bottom: -2rem;
}
.title-2-mask {
  display: block;
  padding-bottom: 2rem;
  padding-top: 0.125rem;
}
.wrap {
  margin-top: var(--94);
  position: relative;
}
.logo {
  width: 8.8125rem;
  position: absolute;
  left: 24.75rem;
  top: -1.3rem;
}
.photos-wrap {
  position: relative;
  height: 100%;
  width: 100%;
}
.photos {
  position: relative;
  height: 100%;
  width: 100%;
}
.blur {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(28.5px);
  z-index: 3;
  opacity: 0;
}
.wrap-2 {
  height: 600vh;
  margin-left: calc(-1 * var(--8));
  margin-right: calc(-1 * var(--8));
  position: relative;
}
.sticky {
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
}
.triggers {
  height: 50vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.trigger-img {
  flex: 1;
}
.photos img:first-child {
  z-index: 2;
}
.logo-2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  z-index: 5;
}
.description-2 {
  width: 21.1875rem;
}
.description-2 p:first-child {
  margin-bottom: var(--16);
}
.content {
  padding-left: var(--8);
  padding-right: var(--8);
  display: grid;
  transform: translateY(100%);
  grid-template-columns: 1fr 1fr;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
  z-index: 4;
  padding-bottom: 5.6875rem;
  mix-blend-mode: difference;
}
.right .h3 {
  margin-bottom: var(--128);
}
</style>
