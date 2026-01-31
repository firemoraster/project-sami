<template>
  <section class="hero-mob test2">
    <div class="first-screen">
      <div class="gradient" />
      <div class="content">
        <div class="left">
          <svg
            class="name"
            viewBox="0 0 78 716"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2537 714.819C7.53794 714.819 -1.3468e-06 685.189 -4.02375e-06 623.947C-6.73504e-06 561.92 8.49426 526.561 26.4391 526.561L26.4391 585.23C20.5975 585.23 17.3067 598.662 17.3067 623.752C17.3067 643.507 19.2175 656.74 22.5083 656.74C26.4391 656.74 27.9245 646.272 29.4117 613.877C32.0679 554.22 39.4986 524.191 54.5762 524.191C70.292 524.191 77.9354 554.413 77.9354 616.444C77.9354 680.05 69.4429 716 51.4981 716L51.4981 657.53C57.4451 657.53 60.6287 643.507 60.6287 617.824C60.6287 596.095 58.5051 582.269 55.0034 582.269C50.9672 582.269 49.5873 592.538 48.1001 624.74C45.4456 685.382 38.3314 714.819 23.2537 714.819Z"
              fill="#FF001B"
            />
            <path
              d="M47.0411 414.014C47.0411 442.396 49.5544 459.378 54.1626 459.378C57.7912 459.378 59.3267 448.987 59.3267 427.951C59.3267 396.019 55.8375 379.798 49.5544 379.798L45.0892 379.798C46.344 388.667 47.0411 399.819 47.0411 414.014ZM27.6395 379.798C23.1725 379.798 21.0794 391.71 21.0794 415.784C21.0794 443.411 23.8714 458.11 29.4538 458.11L29.4538 519.432C9.63215 519.432 0.00108104 488.014 0.00107796 417.558C0.00107485 346.341 9.91278 316.194 27.6395 316.194L76.1311 316.194L76.1311 379.798L68.5395 379.798C74.2631 395.002 77.3341 419.333 77.3341 453.295C77.3341 504.235 70.2144 524.245 56.1163 524.245C40.3433 524.245 32.9449 498.913 32.9449 435.3C32.9448 400.83 31.2699 379.798 28.8961 379.798L27.6395 379.798Z"
              fill="#FF001B"
            />
            <path
              d="M26.3339 119.545L68.6979 164.981L68.6979 207.452L26.3339 252.689L76.1321 252.689L76.1321 307.998L1.80397 307.998L1.80396 229.183L42.4715 186.116L1.80396 143.25L1.80395 64.4313L76.1321 64.4313L76.1321 119.545L26.3339 119.545Z"
              fill="#FF001B"
            />
            <path
              d="M1.80428 -7.88689e-08L1.80428 56.6929L76.1325 56.6929L76.1325 -3.32786e-06L1.80428 -7.88689e-08Z"
              fill="#FF001B"
            />
          </svg>
        </div>
        <div class="right">
          <p class="b1 title">{{ heroData.subtitle.text1 }}</p>
          <p class="b1 title">{{ heroData.subtitle.text2 }}</p>
          <p class="b1 title">
            {{ heroData.subtitle.text3 }} {{ heroData.subtitle.text4 }}
          </p>


          <div class="video">
            <!-- @click="isVideoPopupOpen = true" -->
            <!-- <button class="video-btn">
              <svg
                viewBox="0 0 12 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8L6.99382e-07 -5.24537e-07L0 16L12 8Z"
                  fill="#FF001B"
                />
              </svg>
            </button> -->

            <div class="video-poster">
              <img class="inner-img" :src="heroData.photo" alt="hero photo" />
            </div>
          </div>

          <div class="logo">
            <IconLogo />
          </div>
        </div>
      </div>
    </div>

    <div class="description">
      <p class="b2">
        {{ heroData.description.text2 }} {{ heroData.description.text3 }}
        {{ heroData.description.text4 }} {{ heroData.description.text5 }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const heroData = data.value.intro.hero

const isVideoPopupOpen = useState<boolean>("is-video-popup-open")

onMounted(async () => {
  await nextTick()

  setHeight()
})

const setHeight = () => {
  const nameElement = document.querySelector(
    "section.intro .hero-mob .name"
  ) as SVGSVGElement

  const firstScreen = document.querySelector("section.intro .hero-mob .first-screen")

  const initialHeight = nameElement.getBBox().height
  const maxScale = window.innerHeight / initialHeight

  gsap.set(firstScreen, {
    height: window.innerHeight,
  })

  gsap.set(nameElement, {
    scaleY: maxScale - 0.12
  })
}
</script>

<style scoped lang="scss">
.hero-mob {
  display: none;

  @include mobile {
    display: block;
  }
}
.first-screen {
  background: var(--c-black);
  padding: var(--48) var(--16);
  position: relative;
  height: 100vh;
}
.gradient {
  display: none;
}
.name {
  width: 4.875rem;
  transform-origin: top;
}
.content {
  height: 100%;
  position: relative;
}
.title {
  margin-bottom: var(--24);
  color: var(--c-red);
}
.left,
.right {
  position: absolute;
  z-index: 2;
  top: 0;
  height: 100%;
  width: calc(50% - 0.25rem);
}
.left {
  left: 0;
}
.right {
  right: 0;
}
.video {
  position: relative;
  height: 5.8125rem;
}
.right {
  display: flex;
  flex-direction: column;
}
.logo {
  margin-top: auto;
}
.video-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-grey);
  box-shadow:
    0.125rem 0.125rem 0.5563rem 0 rgba(255, 255, 255, 0.33) inset,
    -0.0625rem -0.125rem 0.1875rem 0 rgba(0, 0, 0, 0.21) inset;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 3rem;
  height: 3rem;
}
.video-btn svg {
  width: 0.75rem;
}
.video-poster {
  position: absolute;
  inset: 0;
}
.video-poster:after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
}
.description {
  margin-top: var(--60);
  padding-left: var(--16);
  padding-right: var(--16);
  text-align: center;
}
.description p {
  margin: 0 auto;
  width: 11.5625rem;
}
</style>
