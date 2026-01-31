<template>
  <div ref="containerRef" class="image-wrapper">
    <canvas v-if="showCanvas" ref="canvasRef" class="canvas" />
    <img class="image" draggable="false" :src="data" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: "default image alt",
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const showCanvas = ref(true)

const scale = 0.1

const drawPixelatedImage = () => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const img = new Image()
  img.src = props.data
  img.crossOrigin = "anonymous"

  img.onload = () => {
    if (!containerRef.value) return
    const { width, height } = containerRef.value.getBoundingClientRect()

    canvas.width = width
    canvas.height = height

    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")


    tempCanvas.width = width * (scale / (width / 100))
    tempCanvas.height = height * (scale / (width / 100))

    tempCtx?.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height)

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(
      tempCanvas,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height,
      0,
      0,
      width,
      height
    )
  }
}

const hideCanvasOnScroll = () => {
  ScrollTrigger.create({
    trigger: containerRef.value,
    start: "center bottom",
    once: true,
    onEnter() {
      setTimeout(() => {
        showCanvas.value = false
      }, 500)
    }
  })
}

onMounted(async () => {
  await nextTick()

  drawPixelatedImage()
  hideCanvasOnScroll()
})
</script>

<style scoped lang="scss">
.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
