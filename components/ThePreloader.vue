<template>
  <div class="preloader">
    <div class="gradient" />
    <div class="progress b2">
      <p>{{ $t("loading") }}</p>
      <p>{{ progressValue }}%</p>
    </div>
    <div class="wrap">
      <div class="logo-mob">
        <IconLogo />
      </div>
      <div class="fact">
        <div class="title-wrap">
          <p class="title h1">{{ preloaderData.info1.number }}</p>
        </div>
        <div class="description-wrap">
          <p class="description b1">{{ preloaderData.info1.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const preloaderData = data.value.preloader

const { isDesktop } = useViewport()

onMounted(async () => {
  await nextTick()

  if (isDesktop.value) {
    animContent()
  } else {
    animContentMobile()
  }
})

const preloaderDone = useState<boolean>("preloader-done", () => false)
const progressValue = ref(0)

function getOffsets(el: HTMLElement, container: HTMLElement) {
  const preloaderRect = container.getBoundingClientRect()
  const factRect = el.getBoundingClientRect()
  return {
    offsetX: preloaderRect.width - factRect.width,
    offsetY: preloaderRect.height - factRect.height,
  }
}

function removeDuplicates(str: string) {
  return [...new Set(str)].join("")
}

const scrubOptions = {
  chars: removeDuplicates(
    preloaderData.info1.number +
      preloaderData.info2.number +
      preloaderData.info3.number +
      (preloaderData.info4?.number || "")
  ),
  tweenLength: false,
  revealDelay: 1,
  speed: 5,
}

function animContent() {
  const preloader = document.querySelector(".preloader") as HTMLElement
  const wrap = document.querySelector(".preloader .wrap") as HTMLElement
  const fact = document.querySelector(".preloader .fact") as HTMLElement
  const title = document.querySelector(".preloader .fact .title") as HTMLElement
  const description = document.querySelector(
    ".preloader .fact .description"
  ) as HTMLElement
  const progress = document.querySelector(".preloader .progress") as HTMLElement
  const logo = document.querySelector(".fixed-logo") as HTMLElement
  const fixedTitle = document.querySelector(".fixed-title") as HTMLElement
  const fixedLogo = document.querySelector(".fixed-logo") as HTMLElement
  const fixedTitleName = document.querySelector(
    ".fixed-title .name-wrap"
  ) as HTMLElement
  const fixedTitleText = document.querySelectorAll(
    ".fixed-title .text span"
  ) as NodeListOf<Element>
  const gradient = document.querySelector(".preloader .gradient") as HTMLElement
  const header = document.querySelector("header.header") as HTMLElement
  const footer = document.querySelector("footer.footer") as HTMLElement

  const tl = gsap.timeline({
    onComplete() {
      preloaderDone.value = true
      useLockScroll(false)
    },
  })

  const { offsetX, offsetY } = getOffsets(fact, wrap)

  // =======================
  // FRAME 1: Top Right -> Top Left
  // =======================
  tl.set(fact, { x: offsetX })
  tl.to(title, { y: 0, delay: 1 })
  tl.to(description, { y: 0 }, "<50%")
  tl.to(logo, { opacity: 1, duration: 0.25 }, "<")

  // MOVE TO FRAME 2 (Top Left)
  tl.to(fact, { duration: 1.5, delay: 0.5, x: 0 })
  tl.to(
    logo,
    { duration: 1.5, x: () => getOffsets(logo, preloader).offsetX },
    "<"
  )

  // Anim Text 2
  tl.to(progress, { opacity: 0, duration: 0.25 }, "<")
  tl.to(
    title,
    {
      duration: 1,
      ease: "none",
      scrambleText: { ...scrubOptions, text: preloaderData.info2.number },
    },
    "<"
  )

  tl.to(description, { yPercent: 105, duration: 0.25 }, "<")
  tl.to(
    description,
    {
      onStart() {
        // Стандартна позиція: зліва внизу
        gsap.set(".description-wrap", {
          left: 0,
          right: "auto",
          top: "100%",
          bottom: "auto",
          xPercent: 0,
          textAlign: "left",
          marginTop: "0",
        })
        description.textContent = preloaderData.info2.text
      },
      yPercent: 0,
      duration: 0.25,
    },
    "-=1"
  )

  tl.set(progress, { left: "auto", right: 0, textAlign: "right" }, "-=1")
  tl.to(progress, { opacity: 1, duration: 0.25 }, "-=1")

  // =======================
  // FRAME 2 -> FRAME 3: Top Left -> Bottom Left
  // =======================
  tl.to(fact, { y: offsetY, delay: 0.5, duration: 1.5 })
  tl.to(
    logo,
    { duration: 1.5, y: () => -getOffsets(logo, preloader).offsetY },
    "<"
  )

  // Anim Text 3
  tl.to(progress, { opacity: 0, duration: 0.25 }, "<")
  tl.to(
    title,
    {
      duration: 1,
      ease: "none",
      scrambleText: { ...scrubOptions, text: preloaderData.info3.number },
    },
    "<"
  )

  tl.to(description, { yPercent: 105, duration: 0.25 }, "<")

  // ВИПРАВЛЕНО ЗАТРИМКУ: Використовуємо "<0.2", щоб текст почав з'являтися майже одразу з цифрою
  tl.to(
    description,
    {
      onStart() {
        // Позиція: збоку справа від цифри
        gsap.set(".description-wrap", {
          top: "4rem",
          bottom: "auto",
          left: "auto",
          xPercent: 100,
          right: "-2rem",
          marginTop: "0",
        })
        description.textContent = preloaderData.info3.text
      },
      yPercent: 0,
      duration: 0.25,
    },
    "<0.2"
  )

  tl.set(progress, { right: "auto", left: 0, textAlign: "left" }, "<") // Синхронізація прогресу
  tl.to(progress, { opacity: 1, duration: 0.25 }, "<")

  // =======================
  // FRAME 3 -> FRAME 4: Bottom Left -> Bottom Right
  // =======================
  tl.to(fact, {
    duration: 1.5,
    delay: 0.5,
    x: () => getOffsets(fact, wrap).offsetX,
    y: () => getOffsets(fact, wrap).offsetY,
  })

  // FIX: Повертаємо лого на початкову позицію (верхній лівий кут)
  tl.to(
    logo,
    {
      duration: 1.5,
      x: 0, // Початкова позиція по X
      y: 0, // Початкова позиція по Y
    },
    "<"
  )

  // Anim Text 4
  tl.to(progress, { opacity: 0, duration: 0.25 }, "<")
  tl.to(
    title,
    {
      duration: 1,
      ease: "none",
      scrambleText: { ...scrubOptions, text: preloaderData.info4.number },
    },
    "<"
  )

  // Додаємо стилізацію для опису перед анімацією
  tl.set(
    description,
    {
      whiteSpace: "normal", // Дозволяємо перенос
      wordWrap: "break-word", // Перенос слів
      maxWidth: "90%", // Обмеження ширини
      textAlign: "left", // Або "right" в залежності від макету
    },
    "<"
  )

  tl.to(description, { yPercent: 105, duration: 0.25 }, "<")

  tl.to(
    description,
    {
      onStart() {
        // FIX: текст НАД цифрою, стабільно + адаптивний + відступ від краю
        gsap.set(".description-wrap", {
          top: "auto",
          bottom: "calc(100% + 0.75rem)", // FIX
          right: "1rem", // Додаємо відступ від правого краю
          left: "auto",
          xPercent: 0,
          textAlign: "right",
          margin: 0,
          whiteSpace: "normal",
          wordWrap: "break-word",
          maxWidth: "calc(80vw - 1rem)", // Враховуємо відступ
          width: "auto",
          lineHeight: "1.2",
          fontSize: "clamp(14px, 4vw, 18px)",
        })
        description.textContent = preloaderData.info4.text
      },
      yPercent: 0,
      duration: 0.25,
    },
    "<0.2"
  )

  // FIX: прогрес реально вгорі зліва
  tl.set(
    progress,
    {
      right: "auto", // Знімаємо праву позицію
      left: 0, // Прикріплюємо ліворуч
      top: 0, // Прикріплюємо вгору
      bottom: "auto", // Знімаємо нижню позицію
      textAlign: "left", // Текст вирівнюємо ліворуч
    },
    "<"
  )

  tl.to(progress, { opacity: 1, duration: 0.25 }, "<")

  // =======================
  // EXIT
  // =======================
  tl.to(progress, { opacity: 0, duration: 0.25 }, "exit")

  tl.to(fact, {
    duration: 1.5,
    opacity: 0,
    delay: 0.5,
  })

  tl.to(
    logo,
    {
      duration: 1.5,
      x: () => getOffsets(logo, preloader).offsetX / 2,
      y: () => getOffsets(logo, preloader).offsetY, // FIX: стабільний низ
    },
    "<"
  )

  tl.to(
    logo.querySelector("svg"),
    {
      duration: 1.5,
      transformOrigin: "bottom",
      scale: 2,
    },
    "<"
  )

  tl.to(fixedTitleName, { duration: 1.5, scaleY: 1 }, "<")
  tl.to(gradient, { duration: 1.5, opacity: 1 }, "<")
  tl.to(preloader, { opacity: 0 })
  tl.to(fixedTitleText, { y: 0 }, "<")
  tl.from(header, { yPercent: -150 }, "<")
  tl.from(footer, { yPercent: 150 }, "<")
  tl.set([fixedTitle, fixedLogo], { zIndex: 1 })

  // percent count
  const progressTween = tl.to(
    progressValue,
    {
      duration: 7.6,
      value: 100,
      snap: "value",
      ease: "none",
    },
    0
  )
  progressTween.duration(tl.labels.exit)

  tl.timeScale(1.4)
}

function animContentMobile() {
  const preloader = document.querySelector(".preloader") as HTMLElement
  const title = document.querySelector(".preloader .fact .title") as HTMLElement
  const description = document.querySelector(
    ".preloader .fact .description"
  ) as HTMLElement
  const logo = document.querySelector(".preloader .logo-mob") as HTMLElement
  const gradient = document.querySelector(".preloader .gradient") as HTMLElement
  const headerBtn = document.querySelectorAll(
    "header.header-mob .header-btn"
  ) as NodeListOf<Element>
  const footer = document.querySelector("footer.footer") as HTMLElement

  const tl = gsap.timeline({
    onComplete() {
      preloaderDone.value = true
      useLockScroll(false)
    },
  })

  tl.to(title, { y: 0, delay: 1 })
  tl.to(description, { y: 0 }, "<50%")
  tl.to(logo, { opacity: 1, duration: 0.25 }, "<")

  const infos = [preloaderData.info2, preloaderData.info3, preloaderData.info4]
  infos.forEach((info, index) => {
    if (!info) return
    tl.to(title, {
      duration: 1,
      delay: 0.5,
      ease: "none",
      scrambleText: { ...scrubOptions, text: info.number },
    })
    tl.to(description, { yPercent: 105, duration: 0.25 }, "<50%")
    tl.to(description, {
      onStart() {
        description.textContent = info.text
      },
      yPercent: 0,
      duration: 0.25,
    })
  })

  // Додаємо мітку після всіх інфо-блоків
  tl.addLabel("exit")

  tl.to(gradient, { duration: 1.5, opacity: 1 })
  tl.to(preloader, { opacity: 0 })
  tl.from(headerBtn, { yPercent: -150 }, "<")
  tl.from(footer, { yPercent: 150 }, "<")

  // Синхронізуємо прогрес з анімацією прелоадера
  const exitTime = tl.labels.exit
  tl.to(
    progressValue,
    {
      duration: exitTime,
      value: 100,
      snap: "value",
      ease: "none",
    },
    0
  )
}
</script>

<style scoped lang="scss">
.preloader {
  position: fixed;
  inset: 0;
  padding-left: var(--12);
  padding-right: var(--12);
  overflow: hidden;
  z-index: var(--z-preloader);
  background: #000;
}
.gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(#000, var(--c-blue));
  opacity: 0;
}
.wrap {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 2;

  @include mobile {
    position: absolute;
    bottom: 0;
    left: 0;
    height: auto;
    padding: 0 3.875rem 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
}
.fact {
  color: var(--c-red);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start; // FIX: не ламає bottom-right
  @include mobile {
    position: static;
    align-items: center;
  }
}

.description-wrap {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0;
  color: #fff;
  width: 60%;

  @include mobile {
    position: static;
    text-align: center;
    margin-top: 0;
    width: 100%;
  }
}

.title-wrap,
.description-wrap {
  overflow: hidden;
}

.title {
  line-height: 1;
  transform: translateY(105%);
  color: var(--c-red);

  @include mobile {
    text-align: center;
    white-space: nowrap;
  }
}

.description {
  transform: translateY(105%);
  color: #fff !important;
}

.progress {
  position: absolute;
  padding: var(--32);
  left: 0;
  top: 0;
  color: #fff;

  @include mobile {
    left: 50%;
    top: 25vh;
    transform: translateX(-50%);
    text-align: center;
  }
}
.logo-mob {
  display: none;
  @include mobile {
    display: block;
    width: 5.875rem;
    opacity: 0;
  }
}
</style>
