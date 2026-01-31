<template>
  <div class="project-popup">
    <div class="blur" @click="closePopup" />
    <div class="close-wrap">
      <CommonButtonClose @click="closePopup" />
    </div>
    <div class="popup-content" data-lenis-prevent>
      <div class="logo">
        <IconLogo />
      </div>
      <div class="wrap head">
        <div class="left">
          <div class="main-photo">
            <img
              class="inner-img"
              :src="itemData?.mainPhoto"
              alt="project photo"
            />
          </div>
        </div>
        <div class="right">
          <div class="top-info">
            <div v-if="itemData?.brandPhoto" class="brand-img">
              <img
                class="inner-img"
                :src="itemData.brandPhoto"
                alt="brand photo"
              />
            </div>
            <div class="client">
              <p class="p4">{{ $t("project.client") }}</p>
              <p class="b2">{{ itemData?.client }}</p>
            </div>
            <div class="service">
              <p class="p4">{{ $t("project.service") }}</p>
              <p class="b2">{{ itemData?.type }}</p>
            </div>
            <div class="year">
              <p class="p4">{{ $t("project.year") }}</p>
              <p class="b2">{{ itemData?.year }}</p>
            </div>
          </div>
          <div class="bottom-info">
            <h4 class="h4">{{ itemData?.title }}</h4>
          </div>
        </div>
      </div>

      <div v-if="itemData?.summary?.length" class="wrap summary">
        <div class="left">
          <p class="b2">{{ $t("project.summary") }}</p>
        </div>
        <div class="right">
          <p v-for="(text, i) in itemData.summary" :key="i" class="p3">
            {{ text }}
          </p>
        </div>
      </div>

      <div v-if="itemData?.strategy?.length" class="wrap strategy">
        <div class="left">
          <p class="b2">{{ $t("project.strategy") }}</p>
        </div>
        <div class="right">
          <div
            v-for="(item, i) in itemData.strategy"
            :key="i"
            class="list"
            :class="{ _active: activeIndex === i }"
          >
            <div class="list-title" @click="toggleAccordion(i)">
              <p class="p1">{{ item.title }}</p>
              <span>
                <svg
                  viewBox="0 0 19 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.77 22.05L0.53 12.81V9.18L8.42 17.07V0.75H11.12V17.07L19.01 9.18V12.81L9.77 22.05Z"
                    fill="#010101"
                  />
                </svg>
              </span>
            </div>

            <div class="list-content">
              <div class="list-content-text">
                <div class="p3" v-html="item.description" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="itemData?.gallery?.length" ref="carouselRef" class="carousel">
        <div v-for="(img, i) in itemData?.gallery" :key="i" class="carousel-item">
          <img
            :src="img"
            class="inner-img"
            alt="carousel photo"
            draggable="false"
          />
        </div>
      </div>

      <div v-if="itemData?.results?.length" class="wrap results">
        <div class="left">
          <p class="b2">{{ $t("project.results") }}</p>
        </div>
        <div class="right">
          <div v-for="(item, i) in itemData.results" :key="i" class="result-item">
            <h2 class="result-title h2">{{ item.title }}</h2>
            <div class="result-text">
              <p class="b2">{{ item.subtitle }}</p>
              <p class="p4">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="itemData?.text" class="description p1">
        {{ itemData.text }}
      </div>

      <div v-if="itemData?.beforeAfter?.length" class="prepost swiper">
        <div class="swiper-wrapper">
          <div v-for="(item, i) in itemData.beforeAfter" :key="i" class="swiper-slide">
            <div class="prepost-wrap">
              <div class="prepost-before">
                <div class="prepost-before-text">
                  <p class="prepost-title b2">{{ item.beforeTitle }}</p>
                  <p class="prepost-text p4">{{ item.beforeDescription }}</p>
                </div>

                <div class="prepost-photo">
                  <img
                    class="inner-img"
                    :src="item.beforePhoto"
                    draggable="false"
                    alt="before photo"
                  />
                </div>
              </div>
              <div class="prepost-after">
                <div class="prepost-after-text">
                  <p class="prepost-title b2">{{ item.afterTitle }}</p>
                  <p class="prepost-text p4">{{ item.afterDescription }}</p>
                </div>

                <div class="prepost-photo">
                  <img
                    class="inner-img"
                    :src="item.afterPhoto"
                    alt="after photo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="swiper-nav">
          <div class="swiper-prev" @mouseenter="playHoverSound" @click="playClickSound">
            <svg
              viewBox="0 0 8 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-3.49691e-07 8.5L8 0.5L8 16.5L-3.49691e-07 8.5Z"
                fill="#010101"
              />
            </svg>
          </div>
          <div class="default-pagination b3" />
          <div class="swiper-next" @mouseenter="playHoverSound" @click="playClickSound">
            <svg
              viewBox="0 0 8 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 8.5L6.99382e-07 0.5L0 16.5L8 8.5Z" fill="#010101" />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="itemData?.review" class="review">
        <p class="p3">“</p>
        <div class="p3" v-html="itemData?.review.text" />
        <div class="review-info">
          <div class="review-photo">
            <img
              class="inner-img"
              :src="itemData.review.photo"
              alt="review photo"
            />
          </div>
          <div class="review-text">
            <p class="p1">{{ itemData.review.name }}</p>
            <p class="p4">{{ itemData.review.position }}</p>
          </div>
        </div>
      </div>

      <div class="btn-wrap">
        <button @click="isContactPopupOpen = true">
          <CommonButtonDefault :text="$t('lets_talk') + ' ☕️'" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from "swiper"
import { Navigation, Autoplay, Pagination } from "swiper/modules"
import "swiper/css/navigation"
import "swiper/css/pagination"
import type { MainPage } from "@/types/formatted/main-page"

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")
const clickedProjectId = useState<number>("clicked-project-id")

const data = useState<MainPage>("all-data")
const itemData = data.value.projects.items.find(
  item => item.id === clickedProjectId.value
)

const { playHoverSound, playClickSound } = useSound()

onMounted(async () => {
  await nextTick()

  initSwiper()
})

const carouselRef = ref()
const isPopupOpen = useState<boolean>("is-popup-open")
const activeIndex = ref<number | null>(null)

useCarousel({
  container: carouselRef,
  autoscroll: true,
  margin: 8,
})

const closePopup = () => {
  const tl = gsap.timeline({
    onComplete() {
      useLockScroll(false)

      isPopupOpen.value = false
    },
  })

  tl.to(".project-popup .popup-content", {
    yPercent: 101,
    duration: 0.75,
  })

  tl.to(
    ".project-popup .close-wrap",
    {
      yPercent: -101,
    },
    "<"
  )

  tl.to(
    ".project-popup .blur",
    {
      opacity: 0,
    },
    "<50%"
  )
}

const toggleAccordion = (index: number) => {
  const contents = document.querySelectorAll(".project-popup .list-content")

  if (activeIndex.value === index) {
    gsap.to(contents[index], {
      height: 0,
    })
    activeIndex.value = null
  } else {
    if (activeIndex.value !== null) {
      gsap.to(contents[activeIndex.value], {
        height: 0,
      })
    }

    gsap.to(contents[index], {
      height: "auto",
    })
    activeIndex.value = index
  }
}

const initSwiper = () => {
  new Swiper(".prepost.swiper", {
    slidesPerView: 1,
    speed: 800,
    loop: true,
    modules: [Navigation, Autoplay, Pagination],
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
    pagination: {
      el: ".prepost.swiper .default-pagination",
      type: "fraction",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  })
}
</script>

<style scoped lang="scss">
.project-popup {
  position: fixed;
  inset: 0;
  z-index: var(--z-popup);
}
.blur {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(28.5px);
  opacity: 0;
}
.popup-content {
  width: 59.875rem;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  background: var(--c-grey);
  transform: translateY(101%);
  overflow: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    display: block;
    width: var(--4);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--c-red);
  }

  @include mobile {
    width: 100%;
  }
}
.close-wrap {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-101%);

  @include mobile {
    left: auto;
    right: 0;
    z-index: 5;
    width: 50%;
  }
}
.wrap {
  display: grid;
  grid-template-columns: 0.6fr 1fr;

  @include mobile {
    display: flex;
    flex-direction: column;
  }
}
.left {
  padding-left: var(--60);

  @include mobile {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.right {
  padding-right: var(--60);

  @include mobile {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.head .right {
  padding-top: var(--32);
  display: flex;
  flex-direction: column;

  @include mobile {
    order: 1;
    padding-top: 4.375rem;
  }
}
.head .left {
  padding-left: 0;

  @include mobile {
    order: 2;
    padding-left: 1rem;
  }
}
.main-photo {
  width: 18.3125rem;
  position: relative;
  aspect-ratio: 1;

  @include mobile {
    width: 100%;
    margin-top: 1rem;
  }
}
.top-info {
  display: flex;
  gap: var(--8);
}
.brand-img {
  position: relative;
  width: 3.125rem;
  aspect-ratio: 1;

  @include mobile {
    order: 2;
    margin-left: 2.55rem;
    flex: 0 0 3.125rem;
  }
}
.client {
  flex: 0 0 7.0625rem;

  @include mobile {
    order: 3;
  }
}
.service {
  flex: 0 0 7.6875rem;

  @include mobile {
    order: 1;
  }
}
.year {
  margin-left: auto;
  text-align: right;

  @include mobile {
    position: absolute;
    top: .5625rem;
    left: 1rem;
  }
}
.client p:first-child,
.service p:first-child,
.year p:first-child {
  opacity: 0.45;
  margin-bottom: var(--8);
}
.year p:first-child {
  @include mobile {
    display: none;
  }
}
.bottom-info {
  margin-top: auto;

  @include mobile {
    margin-top: 5.6875rem;
  }
}
.logo {
  width: 8.8125rem;
  position: absolute;
  left: 12.125rem;
  top: 17rem;
  z-index: 2;

  @include mobile {
    display: none;
  }
}
.summary {
  margin-top: var(--152);

  @include mobile {
    margin-top: 2rem;
  }
}
.summary .left {
  @include mobile {
    margin-bottom: 1rem;
  }
}
.summary .left p {
  @include mobile {
    opacity: 0.2;
  }
}
.summary .right p:not(:last-child) {
  margin-bottom: var(--24);
}
.strategy {
  margin-top: var(--94);
}
.strategy .left {
  @include mobile {
    opacity: 0.2;
  }
}
.strategy .right {
  margin-top: calc(-1 * var(--16));

  @include mobile {
    margin-top: 0;
  }
}
.list {
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.2);
}
.list-title {
  padding: var(--16) 0;
  cursor: pointer;
  display: flex;
  gap: var(--16);
  justify-content: space-between;
  align-items: flex-start;
}
.list._active svg {
  transform: rotate(180deg);
}
.list-title svg {
  width: 1.375rem;
  transition: all 0.3s ease;
  transform-origin: center;
  @include mobile {
    width: 1.0625rem;
    position: relative;
    top: .3rem;
  }
}
.list-content {
  height: 0;
  overflow: hidden;
}
.list-content-text {
  padding-top: var(--16);
  padding-bottom: var(--16);
}
.carousel {
  overflow: hidden;
  cursor: grab;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 32.25rem;
  min-height: 32.25rem;
  margin-top: var(--94);

  @include mobile {
    height: 31.625rem;
    min-height: 31.625rem;
  }
}
.carousel.is-dragging {
  cursor: grabbing;
}
.carousel-item {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 18.125rem;
  height: 100%;
  overflow: hidden;
}
.results {
  margin-top: var(--128);
}
.results .left {
  @include mobile {
    opacity: 0.2;
    margin-bottom: 4.5rem;
    text-align: center;
  }
}
.result-item {
  display: flex;
  justify-content: space-between;

  @include mobile {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
.result-item:not(:last-child) {
  margin-bottom: var(--16);
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.2);
  padding-bottom: var(--16);

  @include mobile {
    padding-bottom: 2.5rem;
    margin-bottom: 2.5rem;
  }
}
.result-text {
  flex: 0 0 10.8125rem;
  @include mobile {
    flex: 1;
    margin-top: 1.5rem;
  }
}
.result-text p:first-child {
  margin-bottom: var(--12);
}
.result-text p:last-child {
  line-height: 130%;
  @include mobile {
    width: 15.125rem;
    margin: 0 auto;
  }
}
.result-title {
  color: var(--c-red);
}
.description {
  text-align: justify;
  margin-top: var(--128);
  padding-left: var(--60);
  padding-right: var(--60);

  @include mobile {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.prepost {
  padding-left: var(--24);
  padding-right: var(--24);
  margin-top: var(--128);
  width: 100%;

  @include mobile {
    padding-left: 0;
    padding-right: 0;
  }
}
.prepost::before,
.prepost:after {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  @include mobile {
    display: none;
  }
}
.prepost:after {
  width: 52.3125rem;
  height: 0.0625rem;
}
.prepost::before {
  width: 0.0625rem;
  height: 100%;
}
.prepost-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  position: relative;

  @include mobile {
    display: block;
    background: var(--c-white);
  }
}
.prepost-title {
  margin-bottom: var(--12);
}
.prepost-photo {
  aspect-ratio: 1;
  width: 100%;
  position: relative;
}
.prepost-text {
  width: 10.8125rem;
  margin: 0 auto;
  height: 6.3125rem;
  line-height: 130%;

  @include mobile {
    height: auto;
    width: auto;
  }
}
.prepost-before,
.prepost-after {
  padding-left: 2.25rem;
  padding-right: 2.4375rem;
  padding-top: var(--24);

  @include mobile {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
  }
}
.prepost-after:after {
  @include mobile {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 2rem);
    background: var(--c-black);
    opacity: 0.1;
    height: .0625rem;
  }
}
.swiper-slide {
  @include mobile {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.prepost-before-text,
.prepost-after-text {
  @include mobile {
    order: 2;
    padding-left: 0.5rem;
    text-align: left;
  }
}
.swiper-prev,
.swiper-next {
  position: absolute;
  top: 0;
  width: var(--24);
  background: #cecece;
  height: 100%;
  cursor: pointer;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  @include mobile {
    position: static;

    width: 3rem;
    height: 3rem;
    flex: 0 0 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #DCDCDC;
    box-shadow: 0.125rem 0.125rem 0.5563rem 0 rgba(255, 255, 255, 0.33) inset, -0.0625rem -0.125rem 0.1875rem 0 rgba(0, 0, 0, 0.21) inset;
  }
}
.swiper-prev {
  left: 0;
  padding-right: var(--2);
}
.swiper-next {
  right: 0;
  padding-left: var(--2);
}
.swiper-nav {
  @include mobile {
    margin-top: 3rem;
    display: flex;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: center;
  }
}
.swiper-prev svg,
.swiper-next svg {
  width: 0.5rem;
}
.review {
  margin: var(--152) auto 0;
  text-align: center;
  width: 25.6875rem;

  @include mobile {
    width: 100%;
    padding-left: 1.875rem;
    padding-right: 1.875rem;
  }
}
.review-info {
  margin-top: var(--48);
  display: flex;
  text-align: left;
  align-items: flex-end;
  gap: var(--8);
  justify-content: center;

  @include mobile {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
.review-photo {
  position: relative;
  flex: 0 0 6.6875rem;
  aspect-ratio: 1;
}
.btn-wrap {
  padding-top: var(--152);
  padding-bottom: var(--152);
  background: linear-gradient(transparent, var(--c-blue));
  display: flex;
  justify-content: center;
  margin-top: auto;

  @include mobile {
    padding-bottom: 4.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
.btn-wrap:deep(.btn-default), .btn-wrap button {
  @include mobile {
    width: 100%;
  }
}
.default-pagination {
  display: none;

  @include mobile {
    display: block;
    text-align: center;
  }
}
</style>
