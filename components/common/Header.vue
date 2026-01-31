<template>
  <header class="header">
    <a
      v-for="(item, i) in nav"
      :key="i"
      class="link"
      :class="{ _active: activeSection === item.link }"
      @click="useScrollTo(`.${item.trigger ? item.trigger : item.link}`)"
    >
      <CommonButtonInner class="link-template" :active="activeSection === item.link">
        <span>#{{ i + 1 }}</span>
        <span>{{ item.text }}</span>
      </CommonButtonInner>
    </a>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n();

const nav = [
  {
    text: t("header.intro"),
    link: "intro",
  },
  {
    text: t("header.about"),
    link: "about",
  },
  {
    text: t("header.services"),
    link: "services",
  },
  {
    text: t("header.works"),
    link: "works",
  },
  
  {
    text: t("header.contact"),
    link: "contact",
    trigger: "contact-trigger",
  }
]

const activeSection = ref<string>("")

onMounted(async () => {
  await nextTick()

  nav.forEach((section) => {
    ScrollTrigger.create({
      trigger: `.${section.link}`,
      start: "top center",
      end: "bottom center",
      onEnter: () => (activeSection.value = section.link),
      onEnterBack: () => (activeSection.value = section.link),
    })
  })
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-around;
  gap: var(--8);
  padding-top: var(--2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: var(--z-header);
}
.link-template {
  display: flex;
  justify-content: space-between;
}
.link {
  flex: 1;
  transition: all 0.3s var(--default-ease);
}
.link._active {
  flex: 2.75;
}
</style>
