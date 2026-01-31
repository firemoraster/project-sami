<template>
  <section class="items">
    <div class="container">
      <div
        v-for="(item, i) in visibleItems"
        :key="i"
        class="item"
        :data-area-for-tip="$t('learn_more')"
        @click="openPopup(item.id)"
      >
        <div class="photo">
          <CommonPicture :data="item.mainPhoto" />
        </div>

        <p class="b2">{{ item.title }}</p>
        <p class="b2 description">{{ item.client }} ({{ item.year }})</p>
      </div>
    </div>

    <div class="filter">
      <button>
        <CommonButtonDefault
          :text="getAllTypes[1]"
          :small="true"
          :active="activeFilter === getAllTypes[1].toLowerCase()"
          @click="filterItems(getAllTypes[1].toLowerCase())"
        />
      </button>
      <button>
        <CommonButtonDefault
          :text="$t('all_projects')"
          :small="true"
          :active="activeFilter === 'all'"
          @click="filterItems('all')"
        />
      </button>
      <button>
        <CommonButtonDefault
          :text="getAllTypes[0]"
          :small="true"
          :active="activeFilter === getAllTypes[0].toLowerCase()"
          @click="filterItems(getAllTypes[0].toLowerCase())"
        />
      </button>
    </div>

    <div
      v-if="visibleItems.length < filteredItems.length"
      class="load-more-wrap"
    >
      <button class="load-more hover-line-hide b2" @click="loadMore">
        load more
      </button>
    </div>

    <teleport to="body">
      <WorksPopup v-if="isPopupOpen" />
    </teleport>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const itemsData = data.value.projects.items

const { isDesktop } = useViewport()

const isPopupOpen = useState<boolean>("is-popup-open", () => false)
const clickedProjectId = useState<number>("clicked-project-id", () => 0)

const activeFilter = ref("all")

const itemsToShow = ref(5)

let st: ScrollTrigger

const filteredItems = computed(() => {
  if (activeFilter.value === "all") return itemsData
  return itemsData.filter(
    (item) => item.type.toLowerCase() === activeFilter.value
  )
})

const visibleItems = computed(() => {
  if (isDesktop.value) {
    return filteredItems.value
  } else {
    return filteredItems.value.slice(0, itemsToShow.value)
  }
})

const getAllTypes = computed(() => {
  const uniqueTypes = new Set(itemsData.map(item => item.type));
  return Array.from(uniqueTypes);
});

onMounted(async () => {
  await nextTick()

  showHideFilterOnScroll()
})

const loadMore = async () => {
  if (itemsToShow.value < filteredItems.value.length) {
    itemsToShow.value += 5

    await nextTick()

    st.kill()
    showHideFilterOnScroll()

    ScrollTrigger.refresh()
  }
}

const filterItems = async (filter: string) => {
  activeFilter.value = filter
  itemsToShow.value = 5

  await nextTick()

  st.kill()
  showHideFilterOnScroll()

  ScrollTrigger.refresh()
}

const showHideFilterOnScroll = () => {
  const start =
    filteredItems.value.length > 3 ? window.innerHeight / 1.4 : "200px"

  st = ScrollTrigger.create({
    trigger: ".works section.items",
    start: `${start} bottom`,
    end: "bottom bottom",
    onEnter() {
      gsap.to(".works section.items .filter", {
        y: 0,
        yPercent: 0,
      })
    },
    onLeaveBack() {
      gsap.to(".works section.items .filter", {
        yPercent: 101,
      })
    },
    onLeave() {
      gsap.to(".works section.items .filter", {
        yPercent: 101,
      })
    },
    onEnterBack() {
      gsap.to(".works section.items .filter", {
        y: 0,
        yPercent: 0,
      })
    },
  })
}

const openPopup = async (index: number) => {
  clickedProjectId.value = index
  isPopupOpen.value = true

  await nextTick()

  useLockScroll(true)

  const tl = gsap.timeline()

  tl.to(".project-popup .blur", {
    opacity: 1,
  })
  tl.to(
    ".project-popup .popup-content",
    {
      y: 0,
      yPercent: 0,
      duration: 0.75,
    },
    "<50%"
  )
  tl.to(
    ".project-popup .close-wrap",
    {
      y: 0,
      yPercent: 0,
    },
    "<"
  )
}
</script>

<style scoped lang="scss">
.items {
  padding: 0 var(--8);

  @include mobile {
    display: none;
  }
}
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--8);
  row-gap: var(--32);

  @include mobile {
    grid-template-columns: 1fr;
    column-gap: 0;
    padding: 0 1rem;
  }
}
.item {
  cursor: pointer;
  text-align: center;
}
.photo {
  aspect-ratio: 1;
  margin-bottom: var(--4);
}
.description {
  opacity: 0.3;
}
.filter {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--8);
  padding: var(--8);
  height: 8.125rem;
  border-radius: 2.25rem 2.25rem 0px 0px;
  background-color: var(--c-grey);
  width: 29.3125rem;
  position: sticky;
  left: 50%;
  transform: translateX(-50%) translateY(101%);
  bottom: 0;
  align-items: flex-start;
  margin-top: var(--32);

  @include mobile {
    width: 100%;
    padding: 1rem 1rem 3rem;
    height: auto;
    border-radius: 0;
    left: 0;
    transform: translateY(101%);
    margin-top: 6.25rem;
    z-index: 2;
  }
}
.filter:deep(.btn-default) {
  width: 100%;
  @include mobile {
    padding-left: 0.9rem;
    padding-right: 0.9rem;
  }
}
.load-more-wrap {
  display: none;
  @include mobile {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 8rem;
    left: 0;
    width: 100%;
  }
}
</style>
