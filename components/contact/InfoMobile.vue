<template>
  <section class="info-mob">
    <div class="gradient" />

    <h2 class="title h2">
      <span class="title-row">
        <span class="title-word">
          <span class="title-mask"
            >{{ infoData.title[0] }}</span
          >
        </span>
        <span class="title-word">
          <span class="title-mask"
            >{{ infoData.title[1] }}</span
          >
        </span>
      </span>
    </h2>

    <div class="btn-wrap">
      <button @click="isContactPopupOpen = true">
        <CommonButtonDefault :text="$t('ready_to_create')" />
      </button>
      <div class="b2 btn-wrap-text" v-html="infoData.description" />
    </div>

    <div class="footer-trigger" />

    <div class="contact-trigger" />
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const infoData = data.value.contact.info

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")

onMounted(async () => {
  await nextTick()

  showFooter()
})

const showFooter = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      scrub: true,
      start: "top center",
      end: "top top",
      trigger: ".contact .info-mob .footer-trigger",
    },
  })
  tl.to("footer.footer .info-wrap", {
    height: "auto",
  })
  tl.to("footer.footer .foot", {
    height: "auto",
  })
  tl.to(
    "footer.footer .footer-name",
    {
      opacity: 1,
    },
    "<"
  )
}
</script>

<style scoped lang="scss">
.info-mob {
  display: none;

  @include mobile {
    position: relative;
    display: block;
    padding: 16rem 1rem 25rem;
    background: var(--c-black);
  }
}
.title {
  color: var(--c-white);
  position: relative;
  z-index: 2;
  margin-bottom: 2rem;
  font-size: 3.8rem;
}
.title-row {
  display: flex;
  justify-content: space-between;
}
.title-word {
  overflow: hidden;
}
.title-word {
  margin-bottom: -2rem;
}
.title-mask {
  display: block;
  padding-bottom: 2rem;
  padding-top: 0.125rem;
}
.gradient {
  display: none;
}

.btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--24);
  position: relative;
}
.btn-wrap-text:deep(p) {
  margin-bottom: 1rem;
}
.footer-trigger {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  height: 110lvh;
}

.contact-trigger {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
