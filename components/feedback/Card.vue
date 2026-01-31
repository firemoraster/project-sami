<template>
  <div class="item" :data-area-for-tip="$t('drag_read')">
    <p class="title b3">{{ $t("feedback") }}</p>
    <p class="count b3">{{ String(index + 1).padStart(2, "0") }}</p>

    <div class="photo">
      <img
        class="inner-img"
        :src="reviewsInfo[index].photo"
        alt="review photo"
      />
    </div>

    <p class="name p1">{{ reviewsInfo[index].name }}</p>
    <p class="spec p4">{{ reviewsInfo[index].position }}</p>

    <div class="socials">
      <a
        v-for="(social, i) in reviewsInfo[index].socials"
        :key="i"
        :href="social.link"
        target="_blank"
        @mouseenter="playHoverSound"
        @click="playClickSound"
      >
        <img
          v-if="socialIcons[social.name.toLowerCase()]"
          :src="socialIcons[social.name.toLowerCase()]"
          alt="social icon"
        />
      </a>
    </div>

    <div class="description">
      <p class="p1">“</p>
      <p class="p3">{{ reviewsInfo[index].description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const reviewsData = data.value.feedback.reviews

const props = defineProps<{ type: string; index: number }>()

const { playHoverSound, playClickSound } = useSound()

const reviewsInfo = computed(() => {
  if (props.type === "influencers") {
    return reviewsData.influencers
  }
  if (props.type === "brands") {
    return reviewsData.brands
  }
  return []
})

const socialIcons: Record<string, string> = {
  tiktok: "/images/soc-tiktok.svg",
  instagram: "/images/soc-ig.svg",
  telegram: "/images/soc-tg.svg",
}
</script>

<style scoped lang="scss">
.item {
  width: 29.3125rem;
  height: auto;
  background: var(--c-white);
  cursor: grab;
  user-select: none;
  position: absolute;
  top: 100%;
  left: 0;
  box-shadow: 0px 0.1875rem 0.25rem 0px rgba(0, 0, 0, 0.14);
  padding: var(--16) var(--16) var(--24);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @include mobile {
    position: relative;
    width: 100%;
    top: 0;
  }
}
.count {
  position: absolute;
  top: var(--16);
  right: var(--16);
}
.title {
  position: absolute;
  top: var(--16);
  left: var(--16);
}
.photo {
  width: 5rem;
  aspect-ratio: 1;
  position: relative;
}
.name {
  margin-top: var(--8);
}
.description {
  margin-top: auto;
  padding-left: 0.8125rem;
  padding-right: 0.8125rem;
}
.link {
  margin-top: var(--32);
  padding-bottom: var(--2);
}
.socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--8);
  margin-top: var(--32);
}
.socials img {
  width: 2.875rem;
}
</style>
