<template>
  <section class="team">
    <p class="subtitle b2">{{ teamData.title }}</p>

    <ClientOnly>
      <teleport to="body .layout">
        <div class="team-heads">
          <img
            v-for="(item, i) in teamData.person"
            :key="i"
            :src="item.face"
            class="head-photo"
            alt="head"
          />
        </div>
      </teleport>
    </ClientOnly>

    <div class="col col-1">
      <div class="sticky">
        <h4 class="pagination h4">
          <span class="pagination-items">
            <span v-for="(_, i) in teamData.person" :key="i" class="pagination-number">
              {{ i + 1 }}
            </span>
          </span>
          <span> - {{ teamData.person.length }}</span>
        </h4>
        <h4 class="title h4">{{ $t("the") }}</h4>
      </div>
    </div>
    <div class="col col-2">
      <div class="spec-list">
        <h4 v-for="(item, i) in teamData.person" :key="i" class="spec-item h4">
          {{ item.position }}
        </h4>
      </div>
    </div>


    <div class="col col-3">
      <div class="sticky">
        <div v-for="(item, i) in teamData.person" :key="i" class="info-item h4">
          <h4 class="h4 info-name">
            {{ item.name }}
          </h4>
          <p class="p3 info-descr">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <div class="btn-wrap">
      <button @click="isContactPopupOpen = true">
        <CommonButtonDefault :text="$t('coffee_chat')" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const teamData = data.value.about.team

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")

onMounted(async () => {
  await nextTick()

  setPaginationHeight()
  animItems()
  initListeners()
  splitText()
})

const animItems = () => {
  const items = document.querySelectorAll(".about .team .spec-item")
  const info = document.querySelectorAll(".about .team .info-item")
  const photo = document.querySelectorAll(".team-heads .head-photo")
  const pagination = document.querySelectorAll(
    ".about .team .pagination-number"
  )

  function paginationAnim(index: number) {
    gsap.to(pagination, {
      yPercent: -index + "00",
    })
  }

  function showItem(el: Element, i: number) {
    gsap.to(el, {
      opacity: 1,
      filter: "blur(0px)",
    })
    gsap.set([info[i], photo[i]], {
      opacity: 1,
    })

    gsap.fromTo(info[i].querySelectorAll(".word-anim"), {
      yPercent: 105,
    }, {
      yPercent: 0,
    })
  }
  function hideItem(el: Element, i: number) {
    gsap.to(el, {
      opacity: 0.4,
      filter: "blur(6px)",
    })
    gsap.set([info[i], photo[i]], {
      opacity: 0,
    })

    gsap.fromTo(info[i].querySelectorAll(".word-anim"), {
      yPercent: 0,
    }, {
      yPercent: -105,
    })
  }

  items.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top center",
      end: "bottom center",
      onEnter() {
        paginationAnim(i)
        showItem(el, i)
      },
      onLeave() {
        paginationAnim(i)
        hideItem(el, i)
      },
      onLeaveBack() {
        paginationAnim(i)
        hideItem(el, i)
      },
      onEnterBack() {
        paginationAnim(i)
        showItem(el, i)
      },
    })
  })
}

const cursorX = ref(0)
const cursorY = ref(0)

function handleCursorMove(e: MouseEvent) {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  updateTipPosition()
}

const initListeners = () => {
  window.addEventListener("pointermove", handleCursorMove, { passive: true })
  window.addEventListener("scroll", updateTipPosition, { passive: true })
}

function updateTipPosition() {
  const heads = document.querySelector(".team-heads")

  const elementUnderCursor = document.elementFromPoint(
    cursorX.value,
    cursorY.value
  )

  const element = elementUnderCursor?.closest(".about .team")
  if (element) {
    gsap.set(heads, { opacity: 1 })
  } else {
    gsap.set(heads, { opacity: 0 })
    return
  }

  gsap.set(heads, {
    x: cursorX.value - 10,
    y: cursorY.value,
  })
}

const setPaginationHeight = () => {
  const items = document.querySelectorAll(".about .team .pagination-number")
  gsap.set(".about .team .pagination-items", {
    height: items[0].clientHeight,
  })
}

const splitText = () => {
  useSplitText(".about .team .info-descr, .about .team .info-name")
}

onUnmounted(() => {
  window.removeEventListener("pointermove", handleCursorMove)
  window.removeEventListener("scroll", updateTipPosition)
})
</script>

<style scoped lang="scss">
.team {
  background: var(--c-black);
  position: relative;
  display: grid;
  grid-template-columns: 50% 25% 25%;
  color: var(--c-white);

  @include mobile {
    display: none;
  }
}
.sticky {
  position: sticky;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: var(--8);
  padding-left: var(--8);
}
.col-2 {
  padding-top: calc(50vh - 2.05rem);
  padding-bottom: calc(50vh - 2.05rem);
}

.subtitle {
  width: 12.375rem;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: var(--60);
}
.btn-wrap {
  display: flex;
  justify-content: center;
  color: var(--c-black);
  padding-bottom: var(--94);
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 0;
}
.spec-item {
  padding: var(--8) 0;
  opacity: 0.4;
  filter: blur(6px);
}
.pagination-items {
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;
}
.col-3 {
  text-align: right;
  padding-right: var(--8);
  padding-left: var(--8);
}
.info-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: calc(50vh - 1.5rem);
  right: 0;
  opacity: 0;
}
.info-descr {
  width: 10.875rem;
  margin-top: var(--16);
}
.head-photo {
  width: 4.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
}
.team-heads {
  position: fixed;
  z-index: 3;
  pointer-events: none;
  top: 0;
  left: 0;
}
</style>
