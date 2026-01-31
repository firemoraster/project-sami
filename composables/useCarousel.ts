import gsap from "gsap"
export function useCarousel(options: {
  container: Ref<HTMLElement | null | undefined>
  margin?: number
  autoscroll?: boolean
  autoscrollSpeed?: number
  sensitivity?: number
  wheelSensitivity?: number
  showFromLeft?: boolean
  listeners?: {
    wheel?: boolean
    touch?: boolean
    drag?: boolean
  }
  animation2?: boolean
}) {
  const {
    container,
    margin = 16,
    autoscroll = false,
    autoscrollSpeed = 0.5,
    sensitivity = 2,
    wheelSensitivity = 0.9,
    listeners: { wheel = false, touch = true, drag = true } = {},
  } = options

  const slider = computed(() => {
    return container.value
  })
  const slides = computed(() => {
    return slider.value?.querySelectorAll(".carousel-item")
  })

  let animationFrameId: number
  let dispose: (scroll: number) => void
  let scrollSpeed = 0
  let oldScrollY = 0
  let y = 0
  let time = 0
  let wrapWidth = 0
  let distance = 0
  let scrollY = 0
  let itemsDistance: number[] = []
  let touchStart: number = 0
  let isDragging: boolean = false

  onMounted( async () => {
    await nextTick()

    if (slides.value?.length) {
      initCarousel()
      setupListeners()
    }
  })
  onUnmounted(() => {
    slides.value?.length && removeCarousel()
  })

  function initCarousel() {
    if (!slides.value?.length) return

    slides.value?.forEach((item) => {
      itemsDistance.push((distance += item.clientWidth))
    })
    wrapWidth = itemsDistance[itemsDistance.length - 1]

    dispose = (scroll) => {
      if (!slides.value?.length) return
      gsap.set(slides.value, {
        x: (i) => {
          return i
            ? itemsDistance[i - 1] + scroll + margin * i
            : scroll + margin * i
        },
        modifiers: {
          x: (x, target) => {
            const s = gsap.utils.wrap(
              -target.clientWidth,
              wrapWidth -
                target.clientWidth +
                (slides.value?.length ?? 0) * margin,
              parseInt(x)
            )

            return `${s}px`
          },
        },
      })
    }
    dispose(0)

    render()
  }

  const lerp = (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t

  function render() {
    animationFrameId = requestAnimationFrame(render)
    y = lerp(y, scrollY, 0.1)
    if (autoscroll) time -= autoscrollSpeed
    dispose(y + time)

    scrollSpeed = y - oldScrollY
    oldScrollY = y

    if (!slides.value?.length || !slider.value) return

    gsap.to(slides.value, {
      scale: 1 + Math.abs(Math.min(100, Math.max(-100, scrollSpeed)) * 0.001),
      duration: 0.1,
    })
    gsap.to(slider.value?.querySelectorAll("img"), {
      x: -scrollSpeed,
      duration: 0.1,
    })
  }

  const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    if (!slider.value || !slides.value?.length) return
    touchStart = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
    isDragging = true
    slider.value.classList.add("is-dragging")
  }

  const handleTouchMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return

    const touchX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX
    scrollY += (touchX - touchStart) * sensitivity
    touchStart = touchX
  }

  const handleTouchEnd = () => {
    if (!slider.value || !slides.value?.length) return
    isDragging = false
    slider.value.classList.remove("is-dragging")
  }

  const handleMouseWheel = (e: WheelEvent) => {
    scrollY -= e.deltaY * wheelSensitivity
  }

  function setupListeners() {
    if (!slider.value) return

    wheel && slider.value.addEventListener("wheel", handleMouseWheel)

    touch && slider.value.addEventListener("touchstart", handleTouchStart)
    touch && slider.value.addEventListener("touchmove", handleTouchMove)
    touch && slider.value.addEventListener("touchend", handleTouchEnd)

    drag && slider.value.addEventListener("mousedown", handleTouchStart)
    drag && slider.value.addEventListener("mousemove", handleTouchMove)
    drag && slider.value.addEventListener("mouseleave", handleTouchEnd)
    drag && slider.value.addEventListener("mouseup", handleTouchEnd)

    slider.value.addEventListener("selectstart", () => false)
  }

  function removeListeners() {
    if (!slider.value) return

    wheel && slider.value.removeEventListener("wheel", handleMouseWheel)

    touch && slider.value.removeEventListener("touchstart", handleTouchStart)
    touch && slider.value.removeEventListener("touchmove", handleTouchMove)
    touch && slider.value.removeEventListener("touchend", handleTouchEnd)

    drag && slider.value.removeEventListener("mousedown", handleTouchStart)
    drag && slider.value.removeEventListener("mousemove", handleTouchMove)
    drag && slider.value.removeEventListener("mouseleave", handleTouchEnd)
    drag && slider.value.removeEventListener("mouseup", handleTouchEnd)

    slider.value.removeEventListener("selectstart", () => false)
  }

  function reInitCarousel() {
    if (slides.value?.length) {
      scrollSpeed = 0
      oldScrollY = 0
      y = 0
      time = 0
      wrapWidth = 0
      distance = 0
      itemsDistance = []
      scrollY = 0
      cancelAnimationFrame(animationFrameId)
      removeListeners()
      initCarousel()
      setupListeners()
    }
  }

  function removeCarousel() {
    cancelAnimationFrame(animationFrameId)
    removeListeners()
  }

  return { reInitCarousel, removeCarousel }
}
