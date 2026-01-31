<template>
  <section class="hero-mob">
    <p class="title h1">{{ heroData.title }}</p>

    <div class="brands-list">
      <div v-for="(group, groupIndex) in groupedBrands" :key="groupIndex" class="brand-group">
        <p class="group-title b2">{{ group.industry }}</p>
        <div class="group-items">
          <p 
            v-for="(item, i) in group.items" 
            :key="i" 
            class="brand-item p2"
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const heroData = data.value.projects.hero

// Групуємо бренди по industry
const groupedBrands = computed(() => {
  const groups: { industry: string; items: typeof heroData.brands }[] = []
  
  heroData.brands.forEach((brand) => {
    const existingGroup = groups.find(g => g.industry === brand.industry)
    if (existingGroup) {
      existingGroup.items.push(brand)
    } else {
      groups.push({
        industry: brand.industry,
        items: [brand]
      })
    }
  })
  
  return groups
})
</script>

<style scoped lang="scss">
.hero-mob {
  padding: 2rem var(--16) 4rem;
  background: var(--c-black);
  color: var(--c-white);
  display: none;

  @include mobile {
    display: block;
  }
}
.title {
  margin-bottom: 1.5rem;
  text-align: center;
}
.brands-list {
  padding: 0;
}
.brand-group {
  margin-bottom: 1.5rem;
}
.group-title {
  color: var(--c-red);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}
.brand-item {
  padding: 0.375rem 0;
  font-size: 0.875rem;
}
</style>
