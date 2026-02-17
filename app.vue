<template>
  <div class="layout">
    <ContactPopup v-if="isContactPopupOpen" />
    <TheCookies v-if="preloaderDone" />

    <ClientOnly>
      <CommonHeader v-if="isDesktop" />
      <CommonHeaderMobile v-if="isMobile" />
      <CommonMenuMobile v-if="isMobile" />
      <CommonFooter />

      <CommonVideoPopup v-if="isMobile && isVideoPopupOpen" />
      <TheTitle v-if="isDesktop" />
      <TheLogo v-if="isDesktop" />
      <CommonTip v-if="isDesktop" />
    </ClientOnly>

    <div class="wrapper">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const { isDesktop, isMobile } = useViewport()

const preloaderDone = useState<boolean>("preloader-done")
const isContactPopupOpen = useState<boolean>(
  "is-contact-popup-open",
  () => false
)
const isVideoPopupOpen = useState<boolean>("is-video-popup-open", () => false)

watch(
  () => preloaderDone.value,
  (value) => {
    if (value) {
      ScrollTrigger.refresh()
    }
  }
)

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if ("contact" in route.query) {
    isContactPopupOpen.value = true
  }
})

watch(isContactPopupOpen, (val) => {
  if (val) {
    if (!("contact" in route.query)) {
      router.replace({
        query: { ...route.query, contact: null },
      })
    }
  } else {
    if ("contact" in route.query) {
      const newQuery = { ...route.query }
      delete newQuery.contact
      router.replace({ query: newQuery })
    }
  }
})
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
}
</style>
