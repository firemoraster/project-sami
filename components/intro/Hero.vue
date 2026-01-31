<template>
  <section class="hero test1">
    <div class="sticky" :data-area-for-tip="$t('press_hold')">
      <canvas ref="canvas" class="eraser-canvas" />

      <div class="bg-gradient" />

      <div class="photo">
        <img class="inner-img" :src="heroData.photo" alt="hero photo" draggable="false" />
      </div>
    </div>
    <div class="sticky-2">
      <p class="description p1">
        <span class="col-1">{{ heroData.description.text1 }}</span>
        <span class="col-2">{{ heroData.description.text2 }}</span>
        <span class="col-3">{{ heroData.description.text3 }}</span>
        <span class="col-4">{{ heroData.description.text4 }}</span>
        <span class="col-5">{{ heroData.description.text5 }}</span>
      </p>

      <p class="description-2 b3">{{ heroData.text }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const heroData = data.value.intro.hero

const canvas = ref<HTMLCanvasElement | null>(null)

let hasScrolled = false

onMounted(async () => {
  await nextTick()

  initErase()
  hideElementsOnScroll()
  animateBgGradientOnScroll()
})

const initErase = () => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext("2d")
  if (!ctx) return

  const resizeCanvas = () => {
    canvas.value!.width = window.innerWidth
    canvas.value!.height = window.innerHeight

    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.value!.width, canvas.value!.height)
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  let isDrawing = false
  let lastX = 0
  let lastY = 0

  const eraserRadius = 60

  const startErasing = (e: MouseEvent) => {
    const rect = canvas.value!.getBoundingClientRect()
    lastX = e.clientX - rect.left
    lastY = e.clientY - rect.top
    isDrawing = true
    erase(e)
  }

  const stopErasing = () => {
    isDrawing = false
  }

  const erase = (e: MouseEvent) => {
    if (!isDrawing) return

    const rect = canvas.value!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.globalCompositeOperation = "destination-out"
    ctx.fillStyle = "rgba(0, 0, 0, 1)"

    const drawCircle = (cx: number, cy: number, fillBack?: boolean) => {
      const gradient = ctx.createRadialGradient(
        cx,
        cy,
        eraserRadius * 0.1,
        cx,
        cy,
        eraserRadius
      )

      if (fillBack) {
        ctx.globalCompositeOperation = "source-over";
        gradient.addColorStop(0, "rgba(160, 201, 233, 1)");
      } else {
        gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      }

      ctx.fillStyle = gradient

      ctx.beginPath()
      ctx.arc(cx, cy, eraserRadius, 0, Math.PI * 2)
      ctx.fill()
    }

    const dx = x - lastX
    const dy = y - lastY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const step = 10

    for (let i = 0; i < distance; i += step) {
      const cx = lastX + (dx * i) / distance
      const cy = lastY + (dy * i) / distance

      drawCircle(cx, cy)

      // setTimeout(() => {
      //   drawCircle(cx, cy, true)
      // }, 4000)
    }

    lastX = x
    lastY = y
  }

  canvas.value.addEventListener("mousedown", startErasing)
  canvas.value.addEventListener("mousemove", erase)
  canvas.value.addEventListener("mouseup", stopErasing)
  canvas.value.addEventListener("mouseleave", stopErasing)
}

const hideElementsOnScroll = () => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50 && !hasScrolled) {
      document.querySelector(".intro .hero")?.classList.add("hide-elements")
      hasScrolled = true
    } else if (window.scrollY <= 50 && hasScrolled) {
      hasScrolled = false
      document.querySelector(".intro .hero")?.classList.remove("hide-elements")
    }
  })
}

const animateBgGradientOnScroll = () => {
  gsap.to(".intro .hero .bg-gradient", {
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".intro .hero",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
};
</script>

<style scoped lang="scss">
.hero {
  height: 300vh;
 background: #000000; /* ✅ секція чорна */

  @include mobile {
    display: none;
  }
}
.hero.hide-elements .sticky {
  pointer-events: none;
}
.sticky {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding-left: var(--8);
  padding-right: var(--8);
  overflow: hidden;
}
.photo {
  position: absolute;
  inset: 0;
}
.eraser-canvas {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.bg-gradient {
  opacity: 0;
  position: absolute;
  inset: 0;
  background: #003F41; /* ✅ */
  z-index: 2;
  pointer-events: none;
}

.sticky-2 {
  position: sticky;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  mix-blend-mode: difference;
  color: var(--c-white);
  pointer-events: none;
  margin-top: -100vh;
}
.description {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding-left: var(--8);
  padding-right: var(--8);
  height: 100%;
  align-items: center;
}
.description span:nth-child(1) {
  margin-right: 23.8125rem;
}
.description span:nth-child(2) {
  margin-right: 1.75rem;
}
.description span:nth-child(3) {
  margin-right: 11.1875rem;
}
.description span:nth-child(5) {
  margin-left: auto;
}
.description-2 {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11.9375rem;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
