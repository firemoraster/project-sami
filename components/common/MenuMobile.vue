<template>
  <menu class="menu-mob" :class="{ _opened: isMenuOpen }">
    <div class="background" />
    <div class="menu-wrap">
      <div class="close-wrap">
        <CommonButtonClose @click="isMenuOpen = false" />
      </div>

      <div class="links">
        <a
          v-for="(item, i) in nav"
          :key="i"
          class="link h2"
          :class="{ _active: activeSection === item.link }"
          @click="scrollToSection(`.${item.trigger ? item.trigger : item.link}`)"
        >
          {{ item.text }}
        </a>
      </div>

      <div class="foot">
        <div class="lang">
          <a
            :href="switchLocalePath('en')"
            class="lang-item h2"
            :class="{ _active: locale === 'en' }"
            >En</a
          >
          <span class="h2">/</span>
          <a
            :href="switchLocalePath('ua')"
            class="lang-item h2"
            :class="{ _active: locale === 'ua' }"
            >Ua</a
          >
        </div>

        <div class="info">
          <a class="email-btn" :href="`mailto:${headerData.email}`">
            <CommonButtonInner :bottom="true">
              {{ headerData.email }}
            </CommonButtonInner>
          </a>

          <a class="soc-btn" :href="headerData.instagram" target="_blank">
            <CommonButtonInner :bottom="true">
              <IconInstagram class="soc-icon" />
            </CommonButtonInner>
          </a>

          <a class="soc-btn" :href="headerData.telegram" target="_blank">
            <CommonButtonInner :bottom="true">
              <IconTelegram class="soc-icon" />
            </CommonButtonInner>
          </a>

          <a class="soc-btn" :href="headerData.linkedin" target="_blank">
            <CommonButtonInner :bottom="true">
              <IconLinkedin class="soc-icon" />
            </CommonButtonInner>
          </a>

          <a class="soc-btn" :href="headerData.youtube" target="_blank">
            <CommonButtonInner :bottom="true">
              <IconYoutube class="soc-icon" />
            </CommonButtonInner>
          </a>
        </div>
      </div>
    </div>
  </menu>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const headerData = data.value.footer

const switchLocalePath = useSwitchLocalePath()

const { locale } = useI18n()

const { t } = useI18n();

const nav = [
  {
    text: t("header.intro"),
    link: "intro",
  },
  {
    text: t("header.about"),
    link: "about",
  },
  {
    text: t("header.services"),
    link: "services",
  },
  {
    text: t("header.works"),
    link: "works",
  },
  {
    text: t("header.feedback"),
    link: "feedback",
  },
  {
    text: t("header.contact"),
    link: "contact",
    trigger: "contact-trigger",
  }
]

const isMenuOpen = useState<boolean>("is-menu-open")

const activeSection = ref<string>("")

onMounted(async () => {
  await nextTick()

  setActiveLink()
})

const scrollToSection = (link: string) => {
  isMenuOpen.value = false

  setTimeout(() => {
    useScrollTo(link)
  }, 100)
}

const setActiveLink = () => {
  nav.forEach((section) => {
    ScrollTrigger.create({
      trigger: `.${section.link}`,
      start: "top center",
      end: "bottom center",
      onEnter: () => (activeSection.value = section.link),
      onEnterBack: () => (activeSection.value = section.link),
    })
  })
}

watch(
  () => isMenuOpen.value,
  (isOpen) => {
    useLockScroll(isOpen)

    if (isOpen) {
      gsap.to(".menu-mob .link", {
        y: 0,
        duration: 0.35,
        stagger: 0.07,
        willChange: "transform",
        opacity: 1,
      })
      gsap.to(".menu-mob .foot", {
        opacity: 1,
        delay: 0.1,
      })
    } else {
      gsap.set(".menu-mob .link", {
        y: "100%",
        delay: 0.3,
        willChange: "transform",
        opacity: 0,
      })
      gsap.set(".menu-mob .foot", {
        opacity: 0,
      })
    }
  }
)

onBeforeUnmount(() => {
  useLockScroll(false)

  isMenuOpen.value = false
})
</script>

<style lang="scss" scoped>
.menu-mob {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: var(--z-popup);
  height: 100lvh;
  display: none;
}
.menu-mob._opened {
  display: block;
}
.background {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(28.5px);
}
.menu-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
}
.close-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
}
.links {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--c-grey);
  gap: 0.5rem;
  position: absolute;
  top: 50%;
  transform: translateY(-65%);
  width: 100%;
  left: 0;
}
.link._active {
  color: var(--c-yellow);
}
.foot {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.lang {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--c-grey);
  padding: 0 1rem;
}
.lang-item._active {
  color: var(--c-yellow);
}
.info {
  display: grid;
  gap: var(--2);
  text-align: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 1.5rem 1rem;
}
.soc-btn:deep(.btn-inner) {
  height: 1.5rem;
}
.soc-icon {
  width: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.email-btn:deep(.btn-inner) {
  padding: 0.275rem 1rem 0.35rem;
}
.email-btn {
  grid-column: 1 / 5;
}
.link {
  display: block;
  transform: translateY(100%);
  opacity: 0;
}
</style>
