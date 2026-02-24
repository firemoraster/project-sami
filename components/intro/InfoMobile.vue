<template>
  <section class="info-mob">
    <div class="wrap">
      <h2 v-if="locale === 'en'" class="title h2">
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[0] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[1] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[2] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[3] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[4] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[5] }}</span>
          </span>
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[6] }}</span>
          </span>
        </span>

        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[7] }}</span>
          </span>
        </span>

        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[8] }}</span>
          </span>
        </span>

        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[9] }}</span>
          </span>

          <span class="title-word">
            <span class="title-mask">{{ infoData.title[10] }}</span>
          </span>
        </span>
      </h2>

      <h2 v-if="locale === 'ua'" class="title h2">
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[0] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[1] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[2] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[3] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[4] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[5] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[6] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[7] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[8] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[9] }}</span>
          </span>
        </span>
        <span class="title-row">
          <span class="title-word">
            <span class="title-mask">{{ infoData.title[10] }}</span>
          </span>
        </span>
      </h2>

      <div class="photo-1">
        <CommonPicture :data="infoData.photos[0]" />
      </div>

      <div class="photo-2">
        <CommonPicture :data="infoData.photos[1]" />
      </div>

      <div class="logo">
        <IconLogo />
      </div>
    </div>

    <div class="description">
      <p class="b2">{{ infoData.description.title }}</p>
      <p class="p3">{{ infoData.description.text }}</p>
    </div>

    <div class="cube">
      <IntroCube />
    </div>

    <div class="vision">
      <div class="title-2 h3">{{ infoData.description2 }}</div>

      <div class="logo-2">
        <IconLogo />
      </div>

      <div class="photo-3">
        <CommonPicture :data="infoData.photo" />
      </div>

      <div class="description-2">
        <p class="p3">{{ infoData.description3 }}</p>
      </div>

      <div class="btn-wrap">
        <button @click="isContactPopupOpen = true">
          <CommonButtonDefault :text="$t('get_in_touch') + '✌'" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const infoData = data.value.intro.info
const heroData = data.value.intro.hero

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")
const isVideoPopupOpen = useState<boolean>("is-video-popup-open")

const { locale } = useI18n()
</script>

<style scoped lang="scss">
.info-mob {
  padding: var(--256) var(--16) var(--152);
  overflow: hidden;
  display: none;
  background: var(--c-black);

  @include mobile {
    display: block;
  }
}

.photo-1 {
  position: absolute;
  width: 7rem;
  right: 0;
  top: 6rem;
}
.photo-2 {
  position: absolute;
  width: 8rem;
  left: 50%;
  transform: translateX(-50%);
  top: 29rem;
}
.wrap {
  position: relative;
}
.video-player {
  position: absolute;
  width: 15rem;
  right: 0;
  top: 9.25rem;
  max-width: 100%;
}
.video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 0.5rem;
  background: #000;
}
.video-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(255, 0, 27, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}
.video-play-btn:hover {
  background: rgba(255, 0, 27, 1);
  transform: translate(-50%, -50%) scale(1.1);
}
.video-play-btn svg {
  width: 1.2rem;
  height: auto;
  margin-left: 0.2rem;
}
.title {
  margin-bottom: 11.4375rem;
}
.title-row {
  display: flex;
  justify-content: space-between;
}
.title-word {
  overflow: hidden;
}
.title-word {
  margin-bottom: -2rem;
}
.title-mask {
  display: block;
  padding-bottom: 2rem;
  padding-top: 0.125rem;
}
.description {
  margin: 0 auto;
  width: 18.9375rem;
  text-align: center;
  background: var(--c-black);
}
.description p {
  color: var(--c-white);
}
.description p:first-child {
  margin-bottom: var(--16);
}
.description .p3 {
  color: var(--c-white);
}
.logo {
  width: 5.1875rem;
  position: absolute;
  left: 3.625rem;
  top: -2.0625rem;
}
.vision {
  margin-top: var(--60);
  position: relative;
}
.cube {
  margin-left: -1rem;
  margin-right: -1rem;
}
.title-2 {
  position: relative;
  z-index: 1;
  text-align: center;
  mix-blend-mode: difference;
  color: var(--c-grey);
}
.logo-2 {
  position: absolute;
  width: 5.1875rem;
  pointer-events: none;
  top: -3rem;
  right: 2.75rem;
  z-index: 2;
}
.description-2 {
  width: 19.9375rem;
  margin: 3.5rem auto 0;
  text-align: center;
}
.photo-3 {
  width: 14.125rem;
  margin-left: auto;
  margin-top: -3.8rem;
}
.btn-wrap {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>
