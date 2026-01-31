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

      <WorksFacts v-if="isDesktop" />
      <WorksFactsMobile v-if="isMobile" />

      <WorksItems />
    </section>

    <section class="feedback" v-if="isMobile">
      <FeedbackHero />
      <FeedbackReviewsMobile />
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
  padding-bottom: 18rem;
  background: var(--c-grey);
  position: relative;
  @include mobile {
    padding-bottom: 0;
    z-index: 3;
  }
}
.contact {
  margin-top: -18rem;
  @include mobile {
    margin-top: 0;
  }
}
</style>
