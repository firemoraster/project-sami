<script lang="ts" setup>
interface Props {
  src: string
}

const props = defineProps<Props>()

const isPlaying = ref(false)

const videoElement = ref<HTMLVideoElement | null>(null)
const videoContainer = ref<HTMLDivElement | null>(null)
const volumeSlider = ref<HTMLInputElement | null>(null)
const timelineContainer = ref<HTMLDivElement | null>(null)

const isScrubbing = ref(false)
const wasPaused = ref<boolean | null>(null)
const totalTime = ref("00:00")
const currentTime = ref("00:00")

onMounted(() => {
  isPlaying.value = true

  document.addEventListener("mouseup", (e: MouseEvent) => {
    if (isScrubbing.value) toggleScrubbing(e)
  })
  document.addEventListener("mousemove", (e: MouseEvent) => {
    if (isScrubbing.value) handleTimelineUpdate(e)
  })
})

function togglePlay() {
  if (videoElement.value?.paused) {
    isPlaying.value = true
    videoElement.value.play()
  } else {
    isPlaying.value = false
    videoElement.value?.pause()
  }
}

function toggleMute() {
  if (videoElement.value) {
    videoElement.value.muted = !videoElement.value.muted
  }
}

function volumeSlide(e: Event) {
  const target = e.target as HTMLInputElement
  if (videoElement.value) {
    videoElement.value.volume = parseFloat(target.value)
    videoElement.value.muted = target.value === "0"
  }
}

function volumeChange() {
  if (volumeSlider.value && videoElement.value) {
    volumeSlider.value.value = videoElement.value.volume.toString()
    let volumeLevel: string
    if (videoElement.value.muted || videoElement.value.volume === 0) {
      volumeSlider.value.value = "0"
      volumeLevel = "muted"
    } else if (videoElement.value.volume >= 0.5) {
      volumeLevel = "high"
    } else {
      volumeLevel = "low"
    }

    if (videoContainer.value) {
      videoContainer.value.dataset.volumeLevel = volumeLevel
    }
  }
}

function loadedData() {
  if (videoElement.value && videoElement.value.duration) {
    totalTime.value = formatDuration(videoElement.value.duration)
  }
}

function timeUpdate() {
  if (videoElement.value) {
    currentTime.value = formatDuration(videoElement.value.currentTime)
    const percent = videoElement.value.currentTime / videoElement.value.duration
    if (timelineContainer.value) {
      timelineContainer.value.style.setProperty(
        "--progress-position",
        percent.toString()
      )
    }
  }
}

function formatDuration(time: number) {
  const seconds = Math.floor(time % 60)
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)

  if (hours === 0) {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  } else {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }
}

function handleTimelineUpdate(e: MouseEvent) {
  if (timelineContainer.value) {
    const rect = timelineContainer.value.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width

    timelineContainer.value.style.setProperty(
      "--preview-position",
      percent.toString()
    )

    if (isScrubbing.value) {
      e.preventDefault()
      timelineContainer.value.style.setProperty(
        "--progress-position",
        percent.toString()
      )
    }
  }
}

function toggleScrubbing(e: MouseEvent) {
  if (timelineContainer.value && videoElement.value) {
    const rect = timelineContainer.value.getBoundingClientRect()
    const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width

    isScrubbing.value = (e.buttons & 1) === 1
    if (isScrubbing.value) {
      wasPaused.value = videoElement.value.paused
      isPlaying.value = false
      videoElement.value.pause()
    } else {
      videoElement.value.currentTime = percent * videoElement.value.duration
      if (!wasPaused.value) {
        isPlaying.value = true
        videoElement.value.play()
      }
    }

    handleTimelineUpdate(e)
  }
}
</script>

<template>
  <div class="video__media">
    <div
      ref="videoContainer"
      class="video-container"
      :class="{ paused: isPlaying, scrubbing: isScrubbing }"
      data-volume-level="high"
    >
      <div class="video-play-area" @click="togglePlay">
        <div class="video-controls__play-pause">
          <svg
            class="video-controls__play"
            viewBox="0 0 46 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48.9259V4.96462C0 1.87735 3.34906 -0.0461172 6.01569 1.50962L43.161 23.1807C45.7879 24.7132 45.8113 28.5006 43.2035 30.0655L6.05819 52.3557C3.39209 53.9556 0 52.0351 0 48.9259Z"
              fill="white"
            />
          </svg>
          <svg
            class="video-controls__pause"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 5V19M16 5V19"
              stroke="white"
              stroke-width="3.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <div class="video-controls">
        <div class="duration-container p1">
          <div class="current-time">
            {{ currentTime }}
          </div>
          /
          <div class="total-time">
            {{ totalTime }}
          </div>
        </div>
        <div class="volume-container">
          <div class="mute-btn" @click="toggleMute">
            <svg
              class="volume-high-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.7479 4.99999C21.1652 6.97023 22 9.38762 22 12C22 14.6124 21.1652 17.0298 19.7479 19M15.7453 7.99999C16.5362 9.13382 17 10.5127 17 12C17 13.4872 16.5362 14.8662 15.7453 16M9.63432 4.36567L6.46863 7.53136C6.29568 7.70431 6.2092 7.79079 6.10828 7.85263C6.01881 7.90746 5.92127 7.94786 5.81923 7.97236C5.70414 7.99999 5.58185 7.99999 5.33726 7.99999H3.6C3.03995 7.99999 2.75992 7.99999 2.54601 8.10898C2.35785 8.20485 2.20487 8.35784 2.10899 8.546C2 8.75991 2 9.03994 2 9.59999V14.4C2 14.96 2 15.2401 2.10899 15.454C2.20487 15.6421 2.35785 15.7951 2.54601 15.891C2.75992 16 3.03995 16 3.6 16H5.33726C5.58185 16 5.70414 16 5.81923 16.0276C5.92127 16.0521 6.01881 16.0925 6.10828 16.1473C6.2092 16.2092 6.29568 16.2957 6.46863 16.4686L9.63431 19.6343C10.0627 20.0627 10.2769 20.2769 10.4608 20.2913C10.6203 20.3039 10.7763 20.2393 10.8802 20.1176C11 19.9773 11 19.6744 11 19.0686V4.93136C11 4.32554 11 4.02264 10.8802 3.88237C10.7763 3.76067 10.6203 3.69608 10.4608 3.70864C10.2769 3.72311 10.0627 3.9373 9.63432 4.36567Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              class="volume-low-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2451 7.99999C19.036 9.13382 19.4998 10.5127 19.4998 12C19.4998 13.4872 19.036 14.8662 18.2451 16M12.1343 4.36567L8.96863 7.53136C8.79568 7.70431 8.7092 7.79079 8.60828 7.85263C8.51881 7.90746 8.42127 7.94786 8.31923 7.97236C8.20414 7.99999 8.08185 7.99999 7.83726 7.99999H6.1C5.53995 7.99999 5.25992 7.99999 5.04601 8.10898C4.85785 8.20485 4.70487 8.35784 4.60899 8.546C4.5 8.75991 4.5 9.03994 4.5 9.59999V14.4C4.5 14.96 4.5 15.2401 4.60899 15.454C4.70487 15.6421 4.85785 15.7951 5.04601 15.891C5.25992 16 5.53995 16 6.1 16H7.83726C8.08185 16 8.20414 16 8.31923 16.0276C8.42127 16.0521 8.51881 16.0925 8.60828 16.1473C8.7092 16.2092 8.79568 16.2957 8.96863 16.4686L12.1343 19.6343C12.5627 20.0627 12.7769 20.2769 12.9608 20.2913C13.1203 20.3039 13.2763 20.2393 13.3802 20.1176C13.5 19.9773 13.5 19.6744 13.5 19.0686V4.93136C13.5 4.32554 13.5 4.02264 13.3802 3.88237C13.2763 3.76067 13.1203 3.69608 12.9608 3.70864C12.7769 3.72311 12.5627 3.9373 12.1343 4.36567Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              class="volume-muted-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 8.99999L16 15M16 8.99999L22 15M9.63432 4.36567L6.46863 7.53136C6.29568 7.70431 6.2092 7.79079 6.10828 7.85263C6.01881 7.90746 5.92127 7.94786 5.81923 7.97236C5.70414 7.99999 5.58185 7.99999 5.33726 7.99999H3.6C3.03995 7.99999 2.75992 7.99999 2.54601 8.10898C2.35785 8.20485 2.20487 8.35784 2.10899 8.546C2 8.75991 2 9.03994 2 9.59999V14.4C2 14.96 2 15.2401 2.10899 15.454C2.20487 15.6421 2.35785 15.7951 2.54601 15.891C2.75992 16 3.03995 16 3.6 16H5.33726C5.58185 16 5.70414 16 5.81923 16.0276C5.92127 16.0521 6.01881 16.0925 6.10828 16.1473C6.2092 16.2092 6.29568 16.2957 6.46863 16.4686L9.63431 19.6343C10.0627 20.0627 10.2769 20.2769 10.4608 20.2913C10.6203 20.3039 10.7763 20.2393 10.8802 20.1176C11 19.9773 11 19.6744 11 19.0686V4.93136C11 4.32554 11 4.02264 10.8802 3.88237C10.7763 3.76067 10.6203 3.69608 10.4608 3.70864C10.2769 3.72311 10.0627 3.9373 9.63432 4.36567Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="volume-slider__container">
            <input
              ref="volumeSlider"
              class="volume-slider"
              type="range"
              min="0"
              max="1"
              step="any"
              value="1"
              @input="volumeSlide"
            />
          </div>
        </div>
        <div
          ref="timelineContainer"
          class="timeline-container"
          @mousemove="handleTimelineUpdate"
          @mousedown="toggleScrubbing"
        >
          <div class="timeline-element">
            <div class="thumb-indicator" />
          </div>
        </div>
      </div>
      <video
        ref="videoElement"
        class="video-element"
        :src="props.src"
        preload="auto"
        playsinline
        :autoplay="true"
        loop
        @volumechange="volumeChange"
        @loadedmetadata="loadedData"
        @timeupdate="timeUpdate"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video__media {
  height: 100%;
  overflow: hidden;
  position: relative;
  color: var(--c-white);
}
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--c-black);
  @include mobile {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  @include mobile {
    height: auto;
    max-height: 100%;
    width: auto;
    max-width: 100%;
    object-fit: unset;
  }
}
.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  opacity: 0;
  height: 5rem;
  transition: all .3s ease;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1.5rem;
}

.video-container:not(.paused) .video-controls {
  opacity: 1;
}
@include hover {
  .video-container:hover .video-controls,
  .video-container:focus-within .video-controls {
    opacity: 1;
  }
}
.video-controls__play-pause {
  cursor: pointer;
  transition: all .3s ease;
}
.video-controls__play,
.video-controls__pause {
  width: 3.0625rem;
  height: auto;
  display: block;
}
.video-controls__pause {
  display: none;
}
.video-container.paused .video-controls__play {
  display: none;
}
.video-container:not(.paused) .video-controls__pause {
  display: none;
}
@include hover {
  .video-container.paused:hover .video-controls__pause {
    display: block;
  }
}

// volume
.mute-btn {
  cursor: pointer;
}
.volume-container {
  display: flex;
  align-items: center;
  position: relative;
  top: -0.125rem;
}
.volume-high-icon,
.volume-low-icon,
.volume-muted-icon {
  width: 1.5rem;
  height: auto;
  display: none;
}
.video-container[data-volume-level="high"] .volume-high-icon {
  display: block;
}
.video-container[data-volume-level="low"] .volume-low-icon {
  display: block;
}
.video-container[data-volume-level="muted"] .volume-muted-icon {
  display: block;
}

.volume-slider {
  width: 0;
  transform-origin: left;
  transform: scaleX(0);
  transition: all .3s ease;
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: rotate(-90deg) scaleX(0);
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  height: .1875rem;
  background: var(--c-white);
  outline: none;
}
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: .9375rem;
  height: .9375rem;
  background: var(--c-white);
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: .9375rem;
  height: .9375rem;
  background: var(--c-white);
  cursor: pointer;
  border-radius: 50%;
}
@include hover {
  .volume-container:hover .volume-slider,
  .volume-slider:focus-within {
    width: 6.25rem;
    transform: rotate(-90deg) scaleX(1);
  }
}

// duration
.duration-container {
  display: flex;
  align-items: center;
  gap: .3125rem;
}

// timeline
.timeline-container {
  flex: 0 0 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: .5rem;
  border-radius: .625rem;
}
.timeline-element {
  height: .25rem;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  transition: all .3s ease;
  border-radius: .625rem;
}
.timeline-element:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: calc(100% - var(--preview-position) * 100%);
  background: rgba(255, 255, 255, 0.3);
  border-radius: .625rem;
  display: none;
}
.timeline-element:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: calc(100% - var(--progress-position) * 100%);
  background: var(--c-white);
  border-radius: .625rem;
}
.thumb-indicator {
  --scale: 0;
  position: absolute;
  height: 200%;
  top: -50%;
  transform: translateX(-50%) scale(var(--scale));
  left: calc(var(--progress-position) * 100%);
  background: var(--c-white);
  border-radius: 50%;
  transition: transform 0.3s ease;
  aspect-ratio: 1 / 1;
}
.timeline-container.scrubbing .timeline-element:after {
  display: block;
}
@include hover {
  .timeline-container:hover .timeline-element:after {
    display: block;
  }
}
.timeline-container.scrubbing .timeline-element {
  height: 100%;
}
@include hover {
  .timeline-container:hover .timeline-element {
    height: 100%;
  }
}
.timeline-container.scrubbing .thumb-indicator {
  --scale: 1;
}
@include hover {
  .timeline-container:hover .thumb-indicator {
    display: block;
  }
}

// play area
.video-play-area {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .3s ease;
}

.video-container.paused .video-play-area {
  background: transparent;
}
.video-container:not(.paused) .video-play-area {
  background: rgba(black, 0.3);
}
@include hover {
  .video-container.paused:hover .video-play-area {
    background: rgba(black, 0.1);
  }
}
</style>
