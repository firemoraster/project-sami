<template>
  <section class="details-mob">
    <div class="first-screen">
      <div class="title h1">{{ detailsData.title }}</div>

      <div class="photo">
        <img class="inner-img" :src="detailsData.photos[0]" alt="about photo" />
      </div>

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
          </span>
          <span class="title-2-row">
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
          <span class="title-2-row">
            <span class="title-2-word">
              <span class="title-2-mask">{{ detailsData.title2[9] }}</span>
            </span>
          </span>
          <span class="title-2-row">
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
          </span>
          <span class="title-2-row">
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
          </span>
          <span class="title-2-row">
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
          </span>
          <span class="title-2-row">
            <span class="title-2-word">
              <span class="title-2-mask">{{ detailsData.title2[8] }}</span>
            </span>
          </span>
        </h2>
      </div>
    </div>

    <div class="second-screen">
      <div class="sticky">
        <div class="blur" />

        <div class="logo-2" />

        <div class="photo-2">
          <img
            class="inner-img"
            :src="detailsData.photos[detailsData.photos.length - 1]"
            alt="details photo"
          />
        </div>

        <div class="content">
          <h3 class="h3 content-title">{{ detailsData.coreTitle }}</h3>
          <h3 class="h3 content-descr">{{ detailsData.coreValue }}</h3>

          <div class="content-info">
            <p class="b2">{{ detailsData.mission.title }}</p>
            <p class="p3">{{ detailsData.mission.text }}</p>
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

  animContentOnScroll()
})

const animContentOnScroll = () => {
  const iconContainer = document.querySelector(".details-mob .logo-2")

  let totalFrames: number
  let logoAnim: any
  let lastFrame = -1

  if (iconContainer) {
    logoAnim = lottie.loadAnimation({
      container: iconContainer,
      renderer: "canvas",
      loop: true,
      autoplay: false,
      path: "/lottie/logo.json",
    })
    logoAnim.setSpeed(0.5)
    logoAnim.addEventListener("DOMLoaded", () => {
      totalFrames = logoAnim.totalFrames - 1
    })
  }

  const tl = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      trigger: ".details-mob .second-screen",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  })

  // Blur з'являється
  tl.to(".details-mob .blur", {
    opacity: 1,
    duration: 0.3,
  })

  // Логотип з'являється з scale: 0 одночасно з blur
  tl.from(
    iconContainer,
    {
      scale: 0,
      duration: 0.3,
    },
    "<"
  )

  // Логотип крутиться під час появи
  tl.to(
    {},
    {
      duration: 0.3,
      repeat: 2,
      onUpdate() {
        if (totalFrames) {
          const frame = Math.round(totalFrames * this.progress())
          if (frame !== lastFrame) {
            lastFrame = frame
            logoAnim.goToAndStop(frame, true)
          }
        }
      },
    },
    "<"
  )

  // Контент підіймається
  tl.to(".about .details-mob .content", {
    y: 0,
    yPercent: 0,
    duration: 1,
  })

  // Blur стає темнішим
  tl.to(
    ".details-mob .blur",
    {
      backgroundColor: "rgba(0,0,0,0.61)",
    },
    "<"
  )

  // Логотип продовжує крутитися паралельно з контентом
  tl.to(
    {},
    {
      duration: 1,
      onUpdate() {
        if (totalFrames) {
          const frame = Math.round(totalFrames * this.progress())
          if (frame !== lastFrame) {
            lastFrame = frame
            logoAnim.goToAndStop(frame, true)
          }
        }
      },
    },
    "<"
  )
}
</script>

<style scoped lang="scss">
.details-mob {
  display: none;
  @include mobile {
    display: block;
  }
}
.first-screen {
  padding: 8rem var(--16);
  background: var(--c-dark-green);
  color: var(--c-white);
}
.title {
  text-align: center;
}
.photo {
  width: 6.375rem;
  height: 8.5rem;
  margin: -1.5rem auto 0;
  position: relative;
}
.description {
  margin-top: 4.5rem;
  text-align: center;
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
  margin-top: 4.5rem;
  position: relative;
}
.logo {
  width: 5.1875rem;
  position: absolute;
  right: 1.625rem;
  bottom: 8.3125rem;
}
.second-screen {
  height: 250lvh;
  position: relative;
}
.photo-2 {
  position: absolute;
  inset: 0;
}
.blur {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(28.5px);
  opacity: 0;
}
.logo-2 {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 7rem;
  z-index: 10;
  @include mobile {
    width: 20rem;
  }
}
.content {
  text-align: center;
  padding: 0 1rem 5.6875rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  color: var(--c-white);
  transform: translateY(100%);
}
.sticky {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100lvh;
}
.content-info p:last-child {
  width: 19.6875rem;
  margin: 1rem auto 0;
}
.content-title {
  margin-bottom: 1.5rem;
}
.content-descr {
  margin-bottom: 16rem;
}
</style>
