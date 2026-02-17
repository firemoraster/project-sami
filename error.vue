<template>
  <main class="error-page">
    <div class="title h1">
      <span>4</span>
      <span>0</span>
      <span>4</span>
    </div>

    <div class="content">
      <div class="title-2">
        <p class="h3">{{ data?.data?.attributes?.title1 }}</p>
        <p class="h3">{{ data?.data?.attributes?.title2 }}</p>
      </div>
      <p class="description b2">
        <span>{{ data?.data?.attributes?.description }}</span>
      </p>

      <a href="/" class="btn">
        <CommonButtonDefault text="Go Home 🏠" />
      </a>
    </div>

    <div class="basket">
      <img src="/images/basket.png" alt="" />
    </div>
  </main>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { data } = await useFetch("/api/error", {
  getCachedData(key) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
  },
})

onMounted(async () => {
  await nextTick()

  animContent()
})
const animContent = () => {
  useSplitText(".title-2")

  const tl = gsap.timeline()

  tl.set(".title-2", {
    opacity: 1,
  })

  tl.to(".basket", {
    opacity: 1,
  })

  tl.fromTo(
    ".word-anim",
    {
      yPercent: 105,
    },
    {
      yPercent: 0,
      stagger: 0.05,
    }
  )

  tl.to(
    ".description",
    {
      opacity: 1,
      y: 0,
    },
    "<50%"
  )

  tl.to(
    ".btn",
    {
      opacity: 1,
      y: 0,
    },
    "<50%"
  )
}
</script>

<style scoped lang="scss">
.error-page {
  height: 100vh;
  height: 100dvh;
  background: var(--c-black);
  position: relative;
  padding-top: var(--152);
  overflow: hidden;

  @include mobile {
    padding-top: 30dvh;
  }
}
.title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #ff0000;
  overflow: hidden;

  @include mobile {
    padding-left: 1rem;
    padding-right: 1rem;
    top: 19dvh;
  }
}
.content {
  width: 50rem;
  margin: 0 auto;
  text-align: center;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;

  @include mobile {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
.title-2 {
  color: var(--c-white);
  opacity: 0;
}
.title-2 .h3 {
  @include mobile {
    font-size: 2rem;
  }
}
.description {
  width: 15rem;
  margin: var(--16) auto 0;
  color: var(--c-white);
  opacity: 0;
  transform: translateY(2rem);
}
.description span {
  @include mobile {
    opacity: 0.4;
  }
}
.btn {
  margin-top: var(--48);
  opacity: 0;
  transform: translateY(2rem);

  @include mobile {
    width: 100%;
  }
}
.btn:deep(.btn-default) {
  width: 21.9375rem;

  @include mobile {
    width: 100%;
  }
}
.basket {
  position: absolute;
  left: 50%;
  bottom: -12.5rem;
  transform: translateX(-50%);
  opacity: 0;

  @include mobile {
    bottom: -10rem;
  }
}
.basket img {
  width: 17.125rem;

  @include mobile {
    width: 14rem;
  }
}
.title-2:deep(.word-anim) {
  padding-bottom: 0.3rem;
}
.title-2:deep(.word-wrap) {
  margin-bottom: -0.3rem;
}
</style>
