<template>
  <span ref="tipRef" class="tip b3" data-tip>
    {{ text }}

    <img ref="coinRef" class="coin" src="/images/coin.png" alt="" />
  </span>
</template>

<script setup lang="ts">
const text = ref("")

const isLeft = ref(false)

const cursorX = ref(0)
const cursorY = ref(0)

const tipRef = ref<HTMLElement | null>(null)
const coinRef = ref<HTMLElement | null>(null)

function handleCursorMove(e: MouseEvent) {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  updateTipPosition()
}

function handleScroll() {
  updateTipPosition()
}

function updateTipPosition() {
  const tip = tipRef.value
  const coin = coinRef.value
  if (!tip || !coin) return

  const elementUnderCursor = document.elementFromPoint(
    cursorX.value,
    cursorY.value
  )
  if (!elementUnderCursor) return

  const areaElement = elementUnderCursor.closest(
    "[data-area-for-tip]"
  ) as HTMLElement | null

  if (!areaElement) {
    gsap.set(coin, { opacity: 0 })
    gsap.to(tip, { autoAlpha: 0, duration: 0.2, overwrite: "auto" })
    return
  }

  text.value = areaElement.getAttribute("data-area-for-tip") || ""

  const leftElement = elementUnderCursor.closest("[data-tip-left]")
  const coinElement = elementUnderCursor.closest("[data-tip-coin]")

  isLeft.value = !!leftElement

  gsap.set(coin, { opacity: coinElement ? 1 : 0 })

  gsap.to(tip, {
    autoAlpha: 1,
    duration: 0.2,
    overwrite: "auto",
  })

  const x = isLeft.value ? cursorX.value - 10 : cursorX.value + 10
  const y = cursorY.value
  const xPercent = isLeft.value ? -100 : 0

  gsap.set(tip, { x, y, xPercent })
}

onMounted(() => {
  window.addEventListener("pointermove", handleCursorMove, { passive: true })
  window.addEventListener("scroll", handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener("pointermove", handleCursorMove)
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style lang="scss" scoped>
.tip {
  pointer-events: none;
  display: inline-flex;
  padding: var(--2) var(--8) var(--4);
  border-radius: 2.25rem;
  background: #efe81b;
  position: fixed;
  top: -1.5rem;
  left: 0;
  z-index: var(--z-tip);
  opacity: 0;
  visibility: hidden;

  @include mobile {
    display: none;
  }
}

.tip._red {
  background: var(--c-red);
  color: var(--c-white);
}

.coin {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: -2rem;
  top: 0.3125rem;
}
</style>
