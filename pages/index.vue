<template>
  <main class="main-page">
    <ThePreloader v-if="!preloaderDone" />

    <section class="intro">
      <IntroHero v-if="isDesktop" />
      <IntroHeroMobile v-if="isMobile" />

      <IntroInfo v-if="isDesktop" />
      <IntroInfoMobile v-if="isMobile" />
    </section>
    <section class="about">
      <AboutDetails v-if="isDesktop" />
      <AboutDetailsMobile v-if="isMobile" />

      <AboutTeam v-if="isDesktop" />
      <AboutTeamMobile v-if="isMobile" />
    </section>
    <section class="services">
      <ServicesInfo v-if="isDesktop" />
      <ServicesInfoMobile v-if="isMobile" />
    </section>

    <section class="works">
      <WorksHero v-if="isDesktop" />
      <WorksHeroMobile v-if="isMobile" />
    </section>

    <section class="feedback">
      <div class="feedback-wrap">
        <FeedbackHero />
        <FeedbackReviews v-if="isDesktop" />
        <FeedbackReviewsMobile v-if="isMobile" />
      </div>
      <div class="pocket pocket-1" />
      <div class="pocket pocket-2" />
    </section>

    <section class="contact">
      <ContactInfo v-if="isDesktop" />
      <ContactInfoMobile v-if="isMobile" />
    </section>
  </main>
</template>

<script setup lang="ts">
const { isDesktop, isMobile } = useViewport()
const preloaderDone = useState<boolean>("preloader-done")

const nuxtApp = useNuxtApp()
const { locale } = useI18n()

const { data } = await useFetch("/api/main", {
  params: { locale },
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})

if (!data.value) {
  throw createError({
    fatal: true,
    message: "Failed to fetch data",
    statusCode: 500,
  })
}

useState("all-data", () => (data.value ? data.value : null))

useSeoMeta(data.value.seo)
</script>

<style scoped lang="scss">
.works {
  background: linear-gradient(var(--c-grey), var(--c-white));
}

.feedback-wrap {
  overflow: hidden;
}
.feedback {
  padding-bottom: 19.25rem;
  background: var(--c-grey);
  position: relative;
  background: var(--c-black);
  @include mobile {
    padding-bottom: 0;
    z-index: 3;
  }
}
.pocket {
  position: absolute;
  width: 44.25rem;
  background: #a0c9e9;
  height: 19.25rem;
  bottom: 0;
}
.pocket-1 {
  left: 0.5rem;
}
.pocket-2 {
  right: 0.5rem;
}
</style>
