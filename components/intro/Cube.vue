<template>
  <canvas ref="canvasRef" class="canvas" :data-area-for-tip="tipText" />
</template>

<script setup lang="ts">
import * as THREE from "three"
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js"
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const cubeData = computed(() => data.value?.intro?.info?.cube || [])

const { t } = useI18n()

const canvasRef = ref<HTMLCanvasElement | null>(null)

const tipText = ref(t("hold_turn"))

onMounted(() => {
  if (!canvasRef.value) return
  
  // Check if cube data is available (need 6 textures for cube sides)
  if (!cubeData.value || cubeData.value.length < 6) {
    console.warn("Cube: Missing cube textures data")
    return
  }

  const tip = document.querySelector("[data-tip]")

  // Use window dimensions only on client side
  const viewportWidth = window.innerWidth || 800
  const isDesktopView = viewportWidth >= 1024
  
  const sizes = {
    width: isDesktopView ? viewportWidth / 2.5 : viewportWidth,
    height: isDesktopView ? viewportWidth / 2.5 : viewportWidth,
  }
  
  // Ensure minimum size to prevent 0-dimension canvas
  if (sizes.width <= 0 || sizes.height <= 0) {
    console.warn("Cube: Invalid canvas dimensions")
    return
  }

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const textureLoader = new THREE.TextureLoader()
  textureLoader.crossOrigin = "anonymous"
  
  const loadTexture = (url: string) => {
    const texture = textureLoader.load(
      url,
      undefined,
      undefined,
      (error) => {
        console.warn("Cube: Failed to load texture", url, error)
      }
    )
    texture.colorSpace = THREE.SRGBColorSpace
    return new THREE.MeshBasicMaterial({ map: texture })
  }

  const materials = [
    loadTexture(cubeData.value[0]),
    loadTexture(cubeData.value[1]),
    loadTexture(cubeData.value[2]),
    loadTexture(cubeData.value[3]),
    loadTexture(cubeData.value[4]),
    loadTexture(cubeData.value[5]),
  ]

  const geometry = new THREE.BoxGeometry(2, 2, 2)
  const cube = new THREE.Mesh(geometry, materials)
  scene.add(cube)

  camera.position.z = 3

  const controls = new TrackballControls(camera, renderer.domElement)
  controls.rotateSpeed = 1.0
  controls.noZoom = true
  controls.noPan = true
  controls.staticMoving = false
  controls.dynamicDampingFactor = 0.1

  const autoRotateSpeed = 0.003
  let isDragging = false

  renderer.domElement.addEventListener("mousedown", () => {
    tipText.value = t("how_cool")
    tip?.classList.add("_red")
    canvasRef.value?.classList.add("_drag")

    isDragging = true
  })
  renderer.domElement.addEventListener("mouseup", () => {
    tipText.value = t("hold_turn")
    tip?.classList.remove("_red")
    canvasRef.value?.classList.remove("_drag")

    isDragging = false
  })

  let animationFrameId: number | null = null

  const playAnimation = () => {
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isDragging) {
        cube.rotation.y += autoRotateSpeed
        cube.rotation.x += autoRotateSpeed
      }

      controls.update()
      renderer.render(scene, camera)
    }

    animate()
  }

  const stopAnimation = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  ScrollTrigger.create({
    trigger: canvasRef.value,
    start: "top bottom",
    end: "bottom top",
    onEnter: playAnimation,
    onLeave: stopAnimation,
    onEnterBack: playAnimation,
    onLeaveBack: stopAnimation,
  })
})
</script>

<style scoped lang="scss">
.canvas {
  display: block;
  cursor: grab;
}
.canvas._drag {
  cursor: grabbing;
}
</style>
