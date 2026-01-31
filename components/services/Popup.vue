<template>
  <div class="popup services-popup">
    <div v-if="isDesktop" class="learn-more-wrap" @click="clickLearnMore" @mouseenter="playHoverSound">
      <div class="learn-more b2">
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
    </div>

    <div class="popup-content">
      <div class="close-wrap">
        <CommonButtonClose @click="emit('closeModal', index)" />
      </div>

      <div class="popup-title">
        <h4 class="h4">{{ $t("subservices") }}</h4>
        <sub class="b3">{{
          servicesData.type[index].subServices.length + 1
        }}</sub>
      </div>

      <p class="popup-descr p4">
        {{ servicesData.type[index].description2 }}
      </p>

      <p class="popup-info p4">
        - {{ $t("optional_service") }}
      </p>

      <div class="popup-items-wrap">
        <div class="popup-items" data-lenis-prevent>
          <div
            v-for="(subservice, idx) in servicesData.type[index].subServices"
            :key="idx"
            class="popup-item"
          >
            <div
              class="popup-item-title"
              @click="toggleAccordion(idx)"
              @mouseenter="playHoverSound"
            >
              <p class="p3">
                {{ subservice.name }}
                <span v-if="subservice.mark" />
              </p>
              <span>
                <svg
                  class="popup-item-decor"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 0V10"
                    stroke="black"
                    stroke-width="1.5"
                  />
                  <path
                    d="M10 5L-2.38419e-07 5"
                    stroke="black"
                    stroke-width="1.5"
                  />
                </svg>
              </span>
            </div>

            <div class="popup-item-content">
              <div class="p4" v-html="subservice.description" />
            </div>
          </div>
        </div>
      </div>

      <div class="popup-btn">
        <button @click="isContactPopupOpen = true">
          <CommonButtonDefault :text="$t('lets_talk') + ' ✌'" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const servicesData = data.value.services

const props = defineProps<{ index: number, activePopupIndex: number }>()

const emit = defineEmits(["openModal", "closeModal"])

const { playHoverSound, playClickSound } = useSound()

const { isDesktop } = useViewport()

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")

const activeIndex = ref<number | null>(null)

const clickLearnMore = () => {
  playClickSound()
  emit('openModal', props.index)
}

const toggleAccordion = (index: number) => {

  playClickSound()

  const currentPopup =
    document.querySelectorAll(".services-popup")[props.activePopupIndex]
  const contents = currentPopup.querySelectorAll(".popup-item-content")
  const decor = currentPopup.querySelectorAll(".popup-item-decor")
  const decorPath = decor[index].querySelectorAll("path")[0]

  if (activeIndex.value === index) {
    gsap.to(contents[index], {
      height: 0,
    })
    gsap.to(decorPath, {
      opacity: 1
    })
    activeIndex.value = null
  } else {
    if (activeIndex.value !== null) {
      gsap.to(contents[activeIndex.value], {
        height: 0,
      })
      gsap.to(decor[activeIndex.value].querySelectorAll("path")[0], {
        opacity: 1
      })
    }

    gsap.to(contents[index], {
      height: "auto",
    })
    gsap.to(decorPath, {
      opacity: 0
    })
    activeIndex.value = index
  }
}
</script>

<style scoped lang="scss">
.popup {
  position: absolute;
  bottom: 0;
  width: 24rem;
  background: var(--c-white);
  z-index: 3;
  overflow: hidden;

  @include mobile {
    position: fixed;
    display: none;
    width: 100%;
    z-index: var(--z-popup);
    height: 100%;
  }
}
.popup:first-child {
  left: 0;
}
.popup:last-child {
  right: 0;
}
.learn-more svg {
  width: 0.625rem;
}
.learn-more-wrap {
  padding: var(--8);
  height: 7.1875rem;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.3s var(--default-ease);
  z-index: 2;
  position: relative;

  @include mobile {
    display: none;
  }
}
.learn-more {
  display: inline-flex;
  gap: var(--2);
  position: relative;
}
.learn-more:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.0625rem;
  background: var(--c-black);
  width: 100%;
  transition: all 0.3s var(--default-ease);
  transform-origin: left;
}
.popup:first-child .learn-more-wrap {
  justify-content: flex-end;
}
.popup:last-child .learn-more-wrap span:first-child {
  order: 2;
}
.popup:last-child .learn-more:after {
  transform-origin: right;
}

@include hover {
  .learn-more-wrap:hover .learn-more:after {
    transform: scaleX(0);
  }
  .learn-more-wrap:hover {
    height: 8.4375rem;
  }
}
.close-wrap {
  position: absolute;
  top: 0;
  right: 0;

  @include mobile {
    width: 50%;
  }
}
.popup-content {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  padding: 5.0625rem var(--24) var(--48);
  display: flex;
  flex-direction: column;

  @include mobile {
    pointer-events: auto;
    opacity: 1;
    padding: 5.375rem 1rem 2.5rem;
  }
}
.popup-title {
  display: flex;
}
.popup-descr {
  margin-top: var(--16);
  width: 17.25rem;
  line-height: 130%;
}
.popup-info {
  margin-top: var(--12);
  position: relative;
  padding-left: 0.6875rem;
}
.popup-info:after {
  content: "";
  position: absolute;
  top: 0.125rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background: var(--c-blue);
  left: 0;
}
.popup-items {
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
  padding-top: var(--128);
  padding-bottom: var(--128);
}
.popup-items-wrap {
  position: relative;
  flex: 1;
  display: flex;
  overflow: hidden;
  margin-bottom: var(--4);
}
.popup-items-wrap:after,
.popup-items-wrap:before {
  content: "";
  position: absolute;
  height: 50%;
  width: 100%;
  left: 0;
  z-index: 2;
  pointer-events: none;
}
.popup-items-wrap:after {
  top: 0;
  background: linear-gradient(var(--c-white), transparent);
}
.popup-items-wrap:before {
  bottom: 0;
  background: linear-gradient(transparent, var(--c-white));
}
.popup-btn:deep(.btn-default),
.popup-btn button {
  width: 100%;
}
.popup-blur {
  position: fixed;
  width: 100%;
  height: auto;
  top: 20%;
  left: 0;
}
.popup-item {
  border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.15);
}
.popup-item:first-child .popup-item-title {
  padding-top: 0;
}
.popup-item-title {
  padding: var(--16) 0 var(--8);
  cursor: pointer;
  display: flex;
  gap: var(--16);
  justify-content: space-between;
  align-items: flex-start;
}
.popup-item-title svg {
  transition: all 0.3s ease;
  transform-origin: center;
}
@include hover {
  .popup-item-title:hover svg {
    transform: rotate(180deg);
  }
}
.popup-item-title svg {
  width: 0.625rem;
}
.popup-item-content {
  height: 0;
  overflow: hidden;
}

.popup-item-content div {
  padding-top: var(--8);
  padding-bottom: var(--8);
  line-height: 130%;
}
.popup-item-content div:deep(ul),
.popup-item-content div:deep(p) {
  margin-bottom: var(--16);
}
.popup-item-content div:deep(li:not(:last-child)) {
  margin-bottom: var(--8);
}
.popup-item-content div:deep(li) {
  padding-left: var(--12);
  position: relative;
}
.popup-item-content div:deep(li:after) {
  content: "";
  width: .25rem;
  height: .25rem;
  background: var(--c-black);
  border-radius: 100%;
  position: absolute;
  top: .375rem;
  left: 0;
}
.popup-item-title p {
  position: relative;
}
.popup-item-title p span {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background: var(--c-blue);
  position: relative;
  top: -0.625rem;
}
</style>
