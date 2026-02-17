<template>
  <section class="info">
    <div class="wrap">
      <h2 v-if="locale === 'en'" class="title h2">
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[0] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[1] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[2] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[3] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[4] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[5] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[6] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[7] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[8] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[9] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[10] }}</span>
          </span>
        </span>
      </h2>

      <h2 v-if="locale === 'ua'" class="title h2">
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[0] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[1] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[2] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[3] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[4] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[5] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[6] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[7] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[8] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[9] }}</span>
          </span>
        </span>
      </h2>

      <div class="photo-1">
        <CommonPicture :data="infoData.photos[0]" />
      </div>

      <div class="photo-2">
        <CommonPicture :data="infoData.photos[1]" />
      </div>

      <div class="logo">
        <IconLogo />
      </div>
    </div>

    <div class="description">
      <p class="b2">{{ infoData.description.title }}</p>
      <p class="p3">{{ infoData.description.text }}</p>
    </div>

    <div class="cube-wrap">
      <div class="cube-text p3">
        {{ infoData.description.text }}
      </div>
      <div class="cube">
        <p class="b2">{{ infoData.leftTitle }}</p>
        <div class="cube-container">
          <IntroCube />
        </div>
        <p class="b2">{{ infoData.rightTitle }}</p>
      </div>
    </div>

    <div class="vision">
      <div class="title-2 h3">
        {{ infoData.description2 }}
      </div>

      <div class="logo-2">
        <IconLogo />
      </div>

      <div class="description-2">
        <p class="p3">
          {{ infoData.description3 }}
        </p>
      </div>

      <div class="photo-3">
        <CommonPicture :data="infoData?.photo" />
      </div>

      <div
        class="scratch"
        :data-area-for-tip="$t('hold_scratch')"
        data-tip-coin
      >
        <div ref="container" class="scratch-container">
          <canvas ref="canvas" class="scratch-canvas" />
        </div>

        <p class="scratch-text b3">
          {{ infoData?.scratchText }}
        </p>
      </div>

      <div class="btn-wrap">
        <button @click="isContactPopupOpen = true">
          <CommonButtonDefault :text="$t('get_in_touch') + '✌'" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const infoData = data.value.intro.info

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")

const canvas = ref<HTMLCanvasElement | null>(null)
const container = ref<HTMLElement | null>(null)

const { locale } = useI18n()

onMounted(async () => {
  await nextTick()

  animateText()
  parallaxImagesOnScroll()
  initErase()
})

const animateText = () => {
  animTitle({
    trigger: ".intro .info .title",
    elements: ".intro .info .title-mask",
  })
}

const parallaxImagesOnScroll = () => {
  parallaxImage({
    percents: [-50, -20, -150, -100],
    elements:
      ".intro .info .photo-1, .intro .info .photo-2, .intro .info .logo, .intro .info .logo-2",
  })
}

const initErase = () => {
  if (!canvas.value || !container.value) return

  const ctx = canvas.value.getContext("2d")
  if (!ctx) return

  const image = new Image()
  image.src =
    locale.value === "en"
      ? "/images/scratch-img.png"
      : "/images/scratch-img2.png"

  const resizeCanvas = () => {
    if (!container.value || !canvas.value) return

    const containerRect = container.value.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    const width = containerRect.width
    const height = containerRect.height

    canvas.value.width = width * dpr
    canvas.value.height = height * dpr
    canvas.value.style.width = `${width}px`
    canvas.value.style.height = `${height}px`

    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, width, height)

    ctx.drawImage(image, 0, 0, width, height)
  }

  image.onload = () => {
    resizeCanvas()
  }

  window.addEventListener("resize", resizeCanvas)

  let isDrawing = false
  const eraserRadius = 8

  const getMousePosition = (e: MouseEvent) => {
    const rect = canvas.value!.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startErasing = (e: MouseEvent) => {
    const { x, y } = getMousePosition(e)

    isDrawing = true
    ctx.globalCompositeOperation = "destination-out"
    ctx.lineWidth = eraserRadius * 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.beginPath()
    ctx.moveTo(x, y)

    // Додаємо слухач на рівні документа для продовження стирання
    document.addEventListener("mousemove", erase)
    document.addEventListener("mouseup", stopErasing)
  }

  const stopErasing = () => {
    isDrawing = false
    ctx.beginPath()

    // Видаляємо слухачі після відпускання миші
    document.removeEventListener("mousemove", erase)
    document.removeEventListener("mouseup", stopErasing)
  }

  const erase = (e: MouseEvent) => {
    if (!isDrawing || !canvas.value) return

    const { x, y } = getMousePosition(e)

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  canvas.value.addEventListener("mousedown", startErasing)
}
</script>

<style scoped lang="scss">
.info {
  padding: 2.25rem var(--8) 0;
  @include mobile {
    display: none;
  }
}
.wrap {
  position: relative;
}
.photo-1 {
  position: absolute;
  width: 8.875rem;
  left: 50%;
  transform: translateX(-50%);
  top: 9.1875rem;
}
.photo-2 {
  position: absolute;
  width: 14.375rem;
  right: 8rem;
  top: 26.5rem;
}
.title {
  margin-bottom: var(--128);
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
.description {
  margin-left: 50%;
  width: 17.1875rem;
  display: none;
}
.description p:first-child {
  margin-bottom: var(--16);
}
.cube {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: calc(50% - 50vw); /* 🔥 розтягує на всю ширину */
}
.cube-wrap {
  background: var(--c-white);
  color: var(--c-black);
}
.cube-text {
  margin-left: 50%;
  width: 17.1875rem;
  padding-top: 6.875rem;
}

.logo {
  width: 8.8125rem;
  position: absolute;
  left: 30rem;
  top: 26.25rem;
}
.vision {
  position: relative;
  padding-bottom: 55vh;

  background: var(--c-white);
}
.title-2 {
  width: 56.4375rem;
  margin-left: auto;
  margin-right: 3.25rem;
  letter-spacing: -0.0656rem;
  mix-blend-mode: difference;
  color: var(--c-grey);
  position: relative;
  z-index: 2;
}
.logo-2 {
  position: absolute;
  width: 8.8125rem;
  pointer-events: none;
  top: 8.8125rem;
  left: 21.875rem;
  z-index: 2;
}
.description-2 {
  width: 18.6875rem;
  margin-left: auto;
  margin-right: 7.1875rem;
  margin-top: 10.0625rem;
}
.photo-3 {
  width: 44.75rem;
  margin-left: 14.5625rem;
  margin-top: -28.5rem;
  isolation: isolate;
}
.btn-wrap {
  margin-top: 8rem;
  display: flex;
  justify-content: center;
}
.scratch {
  height: 9.1875rem;
  width: 17.0625rem;
  position: relative;
  margin-left: 7rem;
  margin-top: -6rem;
  background-image: url("/images/scratch-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: none;
}
.scratch-canvas {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
}
.scratch-container {
  width: 15.8125rem;
  height: 7.9375rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  margin-top: -0.125rem;
}
.scratch-text {
  line-height: 113%;
  width: 12.6875rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-12deg);
  pointer-events: none;
}
.info {
  width: 100%;
  background: #000 !important;
  margin-top: -2px; /* 🔥 перекриє чорну лінію */
  padding-top: calc(2.25rem + 2px); /* щоб контент не з’їхав */
  padding: 2.25rem 0 0; /* ✅ без var(--8) */
}
</style>
