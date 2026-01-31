<template>
  <section class="info-mob">
    <p class="title h1">{{ servicesData.title }}</p>

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

        <div class="learn-more b2 hover-line-hide" @click="openPopup(i)">
          <span>{{ $t("learn_more") }}</span>
          <span>
            <svg
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_543_10556)">
                <path
                  d="M4.37159 12.9119V5.29587L0.689586 8.97787V7.28387L5.00159 2.97187L9.31359 7.28387V8.97787L5.63159 5.29587V12.9119H4.37159Z"
                  fill="#010101"
                />
              </g>
              <defs>
                <clipPath id="clip0_543_10556">
                  <rect width="10" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </div>

        <ClientOnly>
          <teleport to="body">
            <ServicesPopup
              :index="i"
              :active-popup-index="currentPopupIndex"
              @close-modal="closePopup"
            />
          </teleport>
        </ClientOnly>
      </div>
    </div>

    <div class="btn-wrap">
      <button @click="isContactPopupOpen = true">
        <CommonButtonDefault :text="$t('lets_talk') + ' ✌'" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const servicesData = data.value.services

const { locale } = useI18n()

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")

const currentPopupIndex = ref(0)


const openPopup = (i: number) => {
  useLockScroll(true)

  currentPopupIndex.value = i

  const popups = document.querySelectorAll(".services-popup")
  const content = popups[i].querySelector(".popup-content")

  const tl = gsap.timeline()
  tl.set(popups[i], {
    display: "block",
  })
  tl.fromTo(popups[i], {
    yPercent: 105,
  }, {
    yPercent: 0
  })
  tl.fromTo(content, {
    opacity: 0,
  }, {
    opacity: 1
  }, "<50%")
}

const closePopup = (i: number) => {
  useLockScroll(false)

  currentPopupIndex.value = i

  const popups = document.querySelectorAll(".services-popup")
  const content = popups[i].querySelector(".popup-content")

  const tl = gsap.timeline()
  tl.to(content, {
    opacity: 0,
  })

  tl.to(popups[i], {
    yPercent: 105,
  }, "<50%")
  tl.set(popups[i], {
    display: "none",
  })
}
</script>

<style scoped lang="scss">
.info-mob {
  background: var(--c-blue);
  display: none;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @include mobile {
    display: block;
  }
}
.items {
  padding-left: var(--16);
  padding-right: var(--16);
  margin-top: 4.5rem;
}
.title {
  color: var(--c-white);
  text-align: center;
}
.item {
  padding: 14.4375rem 0.5rem 1.625rem;
  background: var(--c-grey);
  position: relative;
  text-align: center;
}
.item:not(:last-child) {
  margin-bottom: var(--16);
}
.count {
  position: absolute;
  left: 0.5rem;
  top: 0.125rem;
}
.photo {
  position: absolute;
  width: 9.9375rem;
  height: 9.9375rem;
  top: 0.5rem;
  right: 0.5rem;
}
.description {
  width: 16.875rem;
  margin: var(--24) auto 0;
}
.btn-wrap {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}
.learn-more {
  display: inline-flex;
  gap: 0.125rem;
  padding-bottom: 0.0625rem;
  margin-top: 3rem;
}
.learn-more svg {
  width: 0.625rem;
}
</style>
