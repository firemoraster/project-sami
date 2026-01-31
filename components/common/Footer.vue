<template>
  <footer class="footer">
    <div class="head">
      <div class="lang">
        <a class="lang-btn" :href="switchLocalePath('en')">
          <CommonButtonInner :active="locale === 'en'" :bottom="true">
            EN
          </CommonButtonInner>
        </a>
        <a class="lang-btn" :href="switchLocalePath('ua')">
          <CommonButtonInner :active="locale === 'ua'" :bottom="true">
            UA
          </CommonButtonInner>
        </a>
      </div>

      <div class="info-wrap">
        <div class="info">
          <button
            class="form-btn b2"
            @click="openPopup"
            @mouseenter="playHoverSound"
          >
            {{ $t("footer.form_button") }}
          </button>

          <a class="email-btn" :href="`mailto:${footerData.email}`">
            <CommonButtonInner :bottom="true">
              {{ footerData.email }}
            </CommonButtonInner>
          </a>

          <a class="soc-btn" :href="footerData.instagram" target="_blank">
            <CommonButtonInner :bottom="true">
              <IconInstagram class="soc-icon" />
            </CommonButtonInner>
          </a>

          <a class="soc-btn" :href="footerData.telegram" target="_blank">
            <CommonButtonInner :bottom="true">
              <IconTelegram class="soc-icon" />
            </CommonButtonInner>
          </a>

          <a class="soc-btn" :href="footerData.linkedin" target="_blank">
            <CommonButtonInner :bottom="true">
              <IconLinkedin class="soc-icon" />
            </CommonButtonInner>
          </a>

          <a class="soc-btn" :href="footerData.youtube" target="_blank">
            <CommonButtonInner :bottom="true">
              <IconYoutube class="soc-icon" />
            </CommonButtonInner>
          </a>
        </div>
      </div>

      <div class="budget">
        <button class="budget-btn" @mouseenter="playHoverSound">i</button>
        <span class="budget-title b2">{{ $t("footer.budget_title") }}:</span>

        <div class="budget-total b2">
          <span
            class="progress"
            :style="`clip-path: polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%); background: ${progress === 100 ? '#9EDE12' : '#efe81b'}`"
          >
            <span class="currency">$</span>
            <span class="price">{{ totalValue }}</span>
          </span>
          <span class="currency">$</span>
          <span class="price">{{ totalValue }}</span>
        </div>

        <div class="budget-popup">
          <p class="popup-emoji">{{ footerData.budget.tip1.emoji }}</p>
          <p class="b3">{{ footerData.budget.tip1.text }}</p>
        </div>

        <div
          v-if="showNotification1"
          class="budget-notification-1 notification-template"
          @click="closeNotification(1)"
        >
          <CommonButtonCloseSmall class="notification-close" />

          <p>{{ footerData.budget.tip2.emoji }}</p>
          <p class="b3">{{ footerData.budget.tip2.text }}</p>
        </div>

        <div
          v-if="showNotification2"
          class="budget-notification-2 notification-template"
          @click="closeNotification(2)"
        >
          <CommonButtonCloseSmall class="notification-close" />

          <p>{{ footerData.budget.tip3.emoji }}</p>
          <p class="b3">{{ footerData.budget.tip3.text }}</p>
        </div>

        <div
          v-if="showNotification3"
          class="budget-notification-3 notification-template"
          @click="closeNotification(3)"
        >
          <CommonButtonCloseSmall class="notification-close" />

          <p>
            {{ footerData.budget.tip4.emoji }}<br />
            <span class="b3">{{ $t("footer.boom") }}</span>
          </p>
          <p class="b3">{{ footerData.budget.tip4.text }}</p>
        </div>
      </div>

      <div class="name">
        <IconName />
      </div>
    </div>

    <div class="foot">
      <div class="foot-wrap">
        <div class="left">
          <div class="copyright b2">
            ©{{ new Date().getFullYear() }}. {{ $t("footer.copyright") }}
          </div>

          <div class="docs">
            <a
              class="hover-line-show b2"
              :href="footerData.terms"
              target="_blank"
            >
              {{ $t("footer.terms") }} </a
            >,
            <a
              class="hover-line-show b2"
              :href="footerData.privacy"
              target="_blank"
            >
              {{ $t("footer.policy") }}
            </a>
          </div>
        </div>

        <div class="right">
          <p class="b2 right-text-1">{{ $t("footer.dev_title") }}</p>
          <span class="b2 right-text-2">/</span>
          <div class="developed">
            <span class="b2 developed-by">{{ $t("footer.dev_by") }}: </span>
            <a
              href="https://thefirstthelast.agency/?utm_source=SAMI&utm_medium=article&utm_campaign=promo"
              target="_blank"
              class="hover-line-show"
            >
              <span class="b2">THEFIRSTTHELAST </span>
              <svg
                viewBox="0 0 19 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.618 8.84567C17.1614 8.06071 17.9334 7.06774 17.9334 6.1122C17.9334 5.29918 17.3798 4.46147 16.2473 3.73722C15.1516 3.03657 13.5916 2.49919 11.7647 2.25613L11.7647 3.25254L10.4926 3.25254L10.4926 0.191641L11.7647 0.191641L11.7647 1.21386L11.7658 1.20526C13.7667 1.45396 15.5416 2.0402 16.8323 2.86563C18.1128 3.68449 19.001 4.80037 19.001 6.1122C19.001 7.65251 17.7839 8.91911 16.1113 9.76976C14.4128 10.6336 12.1033 11.1523 9.58162 11.1523C7.0599 11.1523 4.75044 10.6336 3.05191 9.76975C1.37937 8.91911 0.162266 7.65251 0.162266 6.1122C0.162266 4.80037 1.0504 3.68449 2.3309 2.86562C3.6015 2.05309 5.34117 1.47233 7.3038 1.21716L7.3038 0.191641L8.57595 0.191641L8.57595 3.25254L7.3038 3.25254L7.3038 2.26903C5.51773 2.51786 3.99262 3.04872 2.91597 3.73722C1.78342 4.46147 1.22984 5.29918 1.22984 6.1122C1.22984 7.06774 2.00184 8.06071 3.54524 8.84567C5.06266 9.61742 7.19598 10.1103 9.58162 10.1103C11.9673 10.1103 14.1006 9.61742 15.618 8.84567Z"
                  fill="#010101"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="logo" />

    <div class="footer-name">
      <svg viewBox="0 0 343 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.565953 11.1552C0.565953 3.61609 14.7602 0 44.0978 0C73.8119 0 90.751 4.07485 90.751 12.6833H62.6455C62.6455 9.88099 56.2109 8.30232 44.1913 8.30232C34.7279 8.30232 28.3884 9.21899 28.3884 10.7977C28.3884 12.6833 33.4031 13.3959 48.9221 14.1093C77.5009 15.3836 91.8863 18.9482 91.8863 26.1812C91.8863 33.7203 77.4083 37.387 47.6925 37.387C17.222 37.387 0 33.313 0 24.7046H28.0102C28.0102 27.5575 34.7279 29.0847 47.0313 29.0847C57.4405 29.0847 64.0639 28.066 64.0639 26.3861C64.0639 24.4499 59.1444 23.7879 43.7179 23.0745C14.6675 21.8011 0.565953 18.3883 0.565953 11.1552Z"
          fill="#FF001B"
        />
        <path
          d="M144.667 22.5665C131.07 22.5665 122.935 23.7721 122.935 25.9828C122.935 27.7235 127.913 28.4601 137.99 28.4601C153.287 28.4601 161.058 26.7862 161.058 23.7721V21.6301C156.809 22.2321 151.467 22.5665 144.667 22.5665ZM161.058 13.2592C161.058 11.1163 155.351 10.1122 143.819 10.1122C130.584 10.1122 123.542 11.4516 123.542 14.1295H94.1659C94.1659 4.62072 109.217 0.000523377 142.969 0.000523377C177.085 0.000523377 191.527 4.75535 191.527 13.2592V36.5215H161.058V32.8797C153.774 35.6254 142.118 37.0986 125.849 37.0986C101.446 37.0986 91.8601 33.6831 91.8601 26.92C91.8601 19.3534 103.995 15.8042 134.469 15.8042C150.982 15.8042 161.058 15.0008 161.058 13.862V13.2592Z"
          fill="#FF001B"
        />
        <path
          d="M285.732 12.6329L263.966 32.9556H243.62L221.949 12.6329V36.522H195.453V0.865403H233.21L253.841 20.3744L274.376 0.865403H312.134V36.522H285.732V12.6329Z"
          fill="#FF001B"
        />
        <path d="M343 0.86556H315.841V36.5221H343V0.86556Z" fill="#FF001B" />
      </svg>
    </div>
  </footer>
</template>

<script setup lang="ts">
import lottie from "lottie-web"
import type { MainPage } from "@/types/formatted/main-page"

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")

const data = useState<MainPage>("all-data")
const footerData = data.value.footer

const switchLocalePath = useSwitchLocalePath()

const { isDesktop } = useViewport()

const { locale } = useI18n()

const { playHoverSound, playClickSound } = useSound()

const logoLottie = ref()

onMounted(async () => {
  await nextTick()

  if (isDesktop.value) {
    animLogo()
    showLogoOnScroll()
  }

  setStorage()

  initBudgetInterval()
})

onUnmounted(() => {
  clearInterval(interval)
})

// BUDGET

const elapsedMs = ref(Number(localStorage.getItem("elapsedMs")) || 1)

let pricePerMs: number = 0
let maxBudget: number = 0

const priceValue = computed(() => {
  return elapsedMs.value * pricePerMs
})
const priceFormatted = computed(() => priceValue.value.toFixed(4))
const progress = computed(() => {
  return Math.min((priceValue.value / maxBudget) * 100, 100)
})

const totalValue = computed(() => {
  return +priceFormatted.value >= maxBudget ? maxBudget + ".0000" : priceFormatted
})

const showNotification1 = ref(false)
const showNotification2 = ref(false)
const showNotification3 = ref(false)

let interval: ReturnType<typeof setInterval>

const setStorage = () => {
  function reInitStorage() {
    localStorage.removeItem("elapsedMs")
    localStorage.removeItem("notified50")
    localStorage.removeItem("notified75")
    localStorage.removeItem("notified100")
    localStorage.setItem("pricePerMs", footerData.budget.perMilliseconds)
    localStorage.setItem("maxBudget", footerData.budget.maxBudget)

    elapsedMs.value = Number(localStorage.getItem("elapsedMs"))
  }
  if (localStorage.getItem("pricePerMs")) {
    if (
      Number(localStorage.getItem("pricePerMs")) !==
      +footerData.budget.perMilliseconds
    ) {
      reInitStorage()
    }

    pricePerMs = Number(localStorage.getItem("pricePerMs"))
  } else {
    localStorage.setItem("pricePerMs", footerData.budget.perMilliseconds)

    pricePerMs = +footerData.budget.perMilliseconds
  }

  if (localStorage.getItem("maxBudget")) {
    maxBudget = Number(localStorage.getItem("maxBudget"))

    if (
      Number(localStorage.getItem("maxBudget")) !== +footerData.budget.maxBudget
    ) {
      reInitStorage()
    }
  } else {
    localStorage.setItem("maxBudget", footerData.budget.maxBudget)

    maxBudget = +footerData.budget.maxBudget
  }
}
const initBudgetInterval = () => {
  if (localStorage.getItem("notified50")) showNotification1.value = false
  if (localStorage.getItem("notified75")) showNotification2.value = false
  if (localStorage.getItem("notified100")) showNotification3.value = false

  interval = setInterval(() => {
    if (priceValue.value >= maxBudget) {
      clearInterval(interval)
      if (!localStorage.getItem("notified100")) {
        triggerNotification(3, "100")
      }
    } else {
      elapsedMs.value += 1
      localStorage.setItem("elapsedMs", String(elapsedMs.value))

      if (progress.value >= 50 && !localStorage.getItem("notified50")) {
        triggerNotification(1, "50")
      }
      if (progress.value >= 75 && !localStorage.getItem("notified75")) {
        triggerNotification(2, "75")
      }
    }
  }, 1)
}

const triggerNotification = (level: number, percent: string) => {
  if (level === 1) showNotification1.value = true
  if (level === 2) showNotification2.value = true
  if (level === 3) showNotification3.value = true

  localStorage.setItem(`notified${percent}`, "true")

  notificationSound()

  setTimeout(() => closeNotification(level), 12000)
}

const closeNotification = (level: number) => {
  if (level === 1) showNotification1.value = false
  if (level === 2) showNotification2.value = false
  if (level === 3) showNotification3.value = false
}

const notificationSound = () => {
  const notificationAudio = new Audio("/sounds/notification.mp3")
  notificationAudio.currentTime = 0
  notificationAudio.play()
}

// LOGO ANIM

const showLogoOnScroll = () => {
  ScrollTrigger.create({
    trigger: ".contact .info .logo-trigger",
    onEnter() {
      gsap.to("footer.footer .logo", {
        opacity: 1,
        duration: 0.25,
      })
      logoLottie.value.play()
    },
    onLeaveBack() {
      gsap.to("footer.footer .logo", {
        opacity: 0,
        duration: 0.25,
      })
      logoLottie.value.pause()
    },
  })
}

const animLogo = () => {
  const iconContainer = document.querySelector("footer.footer .logo")

  if (iconContainer) {
    logoLottie.value = lottie.loadAnimation({
      container: iconContainer,
      renderer: "canvas",
      loop: true,
      autoplay: false,
      path: "/lottie/logo.json",
    })
    logoLottie.value.setSpeed(0.5)
    logoLottie.value.pause()
  }
}

const openPopup = () => {
  playClickSound()
  isContactPopupOpen.value = true
}
</script>

<style lang="scss" scoped>
.footer {
  padding-bottom: var(--2);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: var(--z-header);

  @include mobile {
    background: var(--c-black);
    padding-bottom: 0;
  }
}
.head {
  display: flex;

  @include mobile {
    flex-direction: column;
  }
}
.foot {
  overflow: hidden;
  height: 0;

  @include mobile {
    color: var(--c-white);
    opacity: 0.3;
  }
}
.foot-wrap {
  padding: var(--8);
  display: flex;
  justify-content: space-between;

  @include mobile {
    align-items: flex-end;
    padding: 0 1rem 1rem;
  }
}
.left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 29.0625rem;

  @include mobile {
    flex: 1 1 auto;
    flex-direction: column;
    align-items: flex-start;
  }
}
.right-text-1,
.right-text-2 {
  @include mobile {
    display: none;
  }
}
.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 29.07rem;

  @include mobile {
    flex: 1 1 auto;
    justify-content: flex-end;
  }
}
.lang {
  display: flex;
  text-align: center;

  @include mobile {
    display: none;
  }
}
.lang-btn {
  width: 3.5rem;
}
.info-wrap {
  margin-left: var(--8);
  @include mobile {
    margin-left: 0;
    order: 2;
    height: 0;
    overflow: hidden;
  }
}
.info {
  display: flex;
  gap: var(--2);
  text-align: center;

  @include mobile {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 1.5rem 1rem;
  }
}
.form-btn {
  padding: var(--2) var(--8) var(--4);
  background: var(--c-black);
  width: 4.8125rem;
  color: var(--c-white);

  @include mobile {
    display: none;
  }
}
.email-btn {
  min-width: 9.3125rem;

  @include mobile {
    min-width: auto;
    grid-column: 1 / 5;
  }
}
.email-btn:deep(.btn-inner) {
  font-size: .625rem;
  padding-top: .25rem;
  @include mobile {
    padding: 0.275rem 1rem 0.35rem;
  }
}
.soc-btn {
  width: 30px;

  @include mobile {
    width: auto;
  }
}
.soc-btn:deep(.btn-inner) {
  @include mobile {
    height: 1.5rem;
  }
}
.soc-icon {
  width: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.budget {
  background: var(--c-black);
  height: 1.25rem;
  padding: var(--2);
  display: flex;
  color: var(--c-white);
  margin-left: auto;
  position: relative;
  width: 29.6875rem;

  @include mobile {
    order: 1;
    height: auto;
    margin-left: 0;
    width: auto;
    padding: 0.125rem 1rem;
    align-items: center;
  }
}
.budget-btn {
  background: var(--c-white);
  box-shadow: -0.1rem -0.2rem 0.35rem 0rem rgba(0, 0, 0, 0.1) inset;
  width: 1rem;
  height: 100%;
  text-align: center;
  margin-right: var(--4);
  line-height: 0.8;
  color: var(--c-black);

  @include mobile {
    flex: 0 0 1rem;
    height: 1rem;
  }
}
.budget-title {
  @include mobile {
    white-space: nowrap;
    padding-right: .5rem;
  }
}
.budget-total {
  display: flex;
  flex: 1 1 auto;
  background: var(--c-dark-grey);
  justify-content: space-between;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  position: relative;
  margin-left: 1rem;

  @include mobile {
    margin-left: auto;
    width: 10.45rem;
    flex: 0 1 10.45rem;
    height: 1.75rem;
    align-items: center;
  }
}
.progress {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--c-yellow);
  display: flex;
  justify-content: space-between;
  color: var(--c-black);
  overflow: hidden;

  @include mobile {
    align-items: center;
  }
}
.progress .currency {
  margin-left: 0.625rem;
}
.progress .price {
  margin-right: 0.625rem;
}
.budget-popup {
  position: absolute;
  bottom: 100%;
  margin-bottom: 1rem;
  left: 0.6rem;
  transform: translateX(-50%);
  text-align: center;
  padding: var(--8) var(--16) 1.25rem;
  background-image: url("/images/tip.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 11.6875rem;
  color: var(--c-black);
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s var(--default-ease);

  @include mobile {
    left: 50%;
    z-index: 10;
    margin-bottom: 0.5rem;
  }
}
.popup-emoji {
  font-size: 1.125rem;
  margin-bottom: var(--16);
}
.budget-btn:hover ~ .budget-popup {
  opacity: 1;
}

.developed {
  @include mobile {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
.developed svg {
  width: 1.1875rem;
  position: relative;
  top: 0.0625rem;

  @include mobile {
    top: 0.15rem;
  }
}
.developed svg path {
  @include mobile {
    fill: var(--c-white);
  }
}
.logo {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 25rem;
  opacity: 0;
  pointer-events: none;

  @include mobile {
    display: none;
  }
}
.right p,
.right span,
.right a,
.left a,
.left p,
.left span,
.left div {
  @include mobile {
    font-family: var(--f-peta-medium);
    font-size: 0.75rem;
    line-height: 100%;
    letter-spacing: -0.036rem;
  }
}
.developed-by {
  @include mobile {
    display: block;
    text-align: right;
    margin-bottom: -0.125rem;
  }
}
.footer-name {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 11.2rem;
  pointer-events: none;
  opacity: 0;
  display: none;
  @include mobile {
    display: block;
  }
}
.footer-name svg {
  width: 21.4375rem;
}
.notification-template {
  width: 11.6875rem;
  box-shadow:
    0.125rem 0.125rem 0.5563rem 0 rgba(255, 255, 255, 0.33) inset,
    -0.0625rem -0.125rem 0.1875rem 0 rgba(0, 0, 0, 0.12) inset,
    -0.0625rem -0.125rem 0.4063rem 0px rgba(0, 0, 0, 0.21) inset,
    0px 0.9375rem 0.825rem 0px rgba(0, 0, 0, 0.14);
  background: var(--c-white);
  position: absolute;
  bottom: 100%;
  right: var(--8);
  z-index: 10;
  margin-bottom: var(--24);
  padding: var(--8) var(--16) var(--12);
  text-align: center;
  flex-direction: column;
  gap: var(--24);
  color: var(--c-black);
  display: flex;

  @include mobile {
    width: 14.125rem;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 1rem;
    padding: var(--8) var(--32) var(--12);
  }
}
@include hover {
  .notification-template:hover .notification-close {
    opacity: 1;
  }
}
.notification-close {
  opacity: 0;
  @include mobile {
    opacity: 1;
  }
}
.name {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -0.125rem;
  width: 11.4375rem;
  pointer-events: none;
  opacity: 0;

  @include mobile {
    display: none;
  }
}
</style>
