<template>
  <section class="info">
    <div class="sticky">
      <div class="gradient" />

      <h2 v-if="locale === 'en'" class="title h2">
        <span class="title-col">
          <span class="title-mask">{{ infoData.title[0] }}</span>
        </span>
        <span class="title-col">
          <span class="title-mask">{{ infoData.title[1] }}</span>
        </span>
      </h2>

      <h2 v-if="locale === 'ua'" class="title h2">
        <span class="title-col">
          <span class="title-mask">{{ infoData.title[0] }}</span>
        </span>
        <span class="title-col">
          <span class="title-mask">{{ infoData.title[1] }} </span>
        </span>
      </h2>

      <div class="height-anim" />

      <div class="btn-wrap">
        <button @click="isContactPopupOpen = true">
          <CommonButtonDefault :text="$t('ready_to_create')" />
        </button>
        <div class="b2 btn-wrap-text" v-html="infoData.description" />
      </div>
    </div>

    <div class="title-trigger" />
    <div class="logo-trigger" />

    <div class="contact-trigger" />
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const { locale } = useI18n()

const data = useState<MainPage>("all-data")
const infoData = data.value.contact.info

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")

onMounted(async () => {
  await nextTick()

  moveGradientOnScroll()
  animateText()
  showFooterAndScaleLogo()
})
const moveGradientOnScroll = () => {
  const gradient = document.querySelector(".contact .info .gradient")
  const tl = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      scrub: true,
      trigger: ".contact .info",
      start: "top top",
      end: "bottom bottom"
    }
  })
  gradient && tl.fromTo(gradient, {
    y: window.innerHeight,
  }, {
    y: -(gradient.clientHeight - window.innerHeight)
  })

  tl.to(".height-anim", {
    flex: 0,
  }, "<")
}

const showFooterAndScaleLogo = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      end: "top center",
      scrub: true,
      trigger: ".contact .info .title-trigger",
    }
  })
  tl.to("footer.footer .foot", {
    height: "auto",
  })

  tl.to("footer.footer .name", {
    scaleX: 2.5,
    scaleY: 3,
    yPercent: -58
  }, "<")
}

const animateText = () => {

  gsap.fromTo(
    ".contact .info .title-mask",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.3,
      delay: 0.125,
      duration: 0.8,
      clearProps: "all",
      scrollTrigger: {
        trigger: ".contact .info .title-trigger",
        start: "top bottom",
      },
    }
  )
}
</script>

<style scoped lang="scss">
.info {
  height: 300vh;
  position: relative;

  @include mobile {
    display: none;
  }
}
.sticky {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-top: var(--48);
  padding-bottom: 40vh;
  display: flex;
  flex-direction: column;
}
.gradient {
  height: 200vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    var(--c-grey) 0%,
    var(--c-blue) 43%,
    var(--c-grey) 67%,
    var(--c-blue) 100%,
  );
}
.title {
  display: flex;
  justify-content: space-between;
  position: relative;
  color: var(--c-grey);
  padding-left: var(--8);
  padding-right: var(--8);
}
.title-col:nth-child(2) {
  justify-content: center;
}
.title-col:nth-child(3) {
  justify-content: flex-end;
}
.btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--24);
  position: relative;
  padding-top: var(--40);
}
.btn-wrap-text {
  width: 30rem;
}
.btn-wrap-text:deep(p) {
  margin-bottom: 1rem;
}
.height-anim {
  flex: 1 1 auto;
}
.title-col {
  display: flex;
  gap: var(--24);
  overflow: hidden;
  margin-bottom: -2rem;
}
.title-mask {
  padding-bottom: 2rem;
}
.title-trigger {
  position: absolute;
  bottom: 20%;
  left: 0;
  width: 100%;
  pointer-events: none;
}
.logo-trigger {
  position: absolute;
  bottom: 6.25rem;
  left: 0;
  width: 100%;
  pointer-events: none;
}
.contact-trigger {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
