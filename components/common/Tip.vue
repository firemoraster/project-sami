<template>
  <span class="tip b3" data-tip>
    {{ text }}

    <img class="coin" src="/images/coin.png" alt="">
  </span>
</template>

<script setup lang="ts">

const text = ref<string>("")

const isLeft = ref<boolean | undefined>(false)

const cursorX = ref(0)
const cursorY = ref(0)

function handleCursorMove(e: MouseEvent) {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  updateTipPosition()
}

function handleScroll() {
  updateTipPosition()
}

function updateTipPosition() {
  const tip = document.querySelector("[data-tip]")

  const elementUnderCursor = document.elementFromPoint(
    cursorX.value,
    cursorY.value
  )

  const element = elementUnderCursor?.closest("[data-area-for-tip]")
  if (element) {
    text.value = element.getAttribute("data-area-for-tip")!

    isLeft.value = elementUnderCursor?.hasAttribute("data-tip-left")
    isLeft.value = elementUnderCursor?.hasAttribute("data-tip-left")

    if (elementUnderCursor?.hasAttribute("data-tip-coin")) {
      gsap.set(".tip .coin", { opacity: 1 })
    }

    gsap.to(tip, { opacity: 1, duration: 0.2 })
  } else {
    gsap.set(".tip .coin", { opacity: 0 })
    gsap.to(tip, { opacity: 0, duration: 0.2 })
    return
  }

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
  background: var(--c-yellow);
  position: fixed;
  top: -1.5rem;
  left: 0px;
  z-index: var(--z-tip);
  opacity: 0;

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
  top: .3125rem;
}
</style>
