<template>
  <section class="board">
    <IconMonopolyDecor class="monopoly-decor" />

    <div class="board-wrap">
      <div class="board-inner">
        <IconMonopolyLogo class="monopoly-logo" />
        <!-- TOP -->
        <div class="side top">
          <div class="corner corner--start">
            <div class="corner-text p2">
              <div>free</div>
              <div>space</div>
            </div>
          </div>
          <div
            class="cell question-cell"
            @mouseenter="activeKey2 = 2"
            @mouseleave="activeKey2 = null"
          >
            <div class="question-text">?</div>
          </div>
          <!-- country 6 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 6"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[6].img" />
              <p class="country-name">{{ monopoly.blocks[6].title }}</p>
            </div>
          </div>

          <div class="cell logo-cell">
            <div class="logo-icon">
              <IconLogo />
            </div>
          </div>

          <!-- country 7 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 7"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[7].img" />
              <p class="country-name">{{ monopoly.blocks[7].title }}</p>
            </div>
          </div>

          <!-- country 8 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 8"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[8].img" />
              <p class="country-name">{{ monopoly.blocks[8].title }}</p>
            </div>
          </div>
          <div class="corner corner--end">
            <div class="corner-text p2">
              <div>free</div>
              <div>parking</div>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="side right">
          <div
            class="cell question-cell"
            @mouseenter="activeKey2 = 3"
            @mouseleave="activeKey2 = null"
          >
            <div class="question-text">?</div>
          </div>

          <!-- country 9 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 9"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[9].img" />
              <p class="country-name">{{ monopoly.blocks[9].title }}</p>
            </div>
          </div>

          <!-- country 10 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 10"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[10].img" />
              <p class="country-name">{{ monopoly.blocks[10].title }}</p>
            </div>
          </div>
          <div class="cell logo-cell">
            <div class="logo-icon">
              <IconLogo />
            </div>
          </div>

          <!-- country 11 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 11"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[11].img" />
              <p class="country-name">{{ monopoly.blocks[11].title }}</p>
            </div>
          </div>
        </div>

        <!-- BOTTOM -->
        <div class="side bottom">
          <div class="corner corner--start">
            <div class="corner-text p2">
              <div>break</div>
              <div>time</div>
            </div>
          </div>

          <div
            class="cell question-cell"
            @mouseenter="activeKey2 = 0"
            @mouseleave="activeKey2 = null"
          >
            <div class="question-text">?</div>
          </div>

          <!-- country 2 -->
          <div
            class="cell country-cell c1"
            @mouseenter="activeKey = 2"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[2].img" />
              <p class="country-name">{{ monopoly.blocks[2].title }}</p>
            </div>
          </div>
          <div class="cell logo-cell">
            <div class="logo-icon">
              <IconName />
            </div>
          </div>

          <!-- country 1 -->
          <div
            class="cell country-cell c2"
            @mouseenter="activeKey = 1"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[1].img" />
              <p class="country-name">{{ monopoly.blocks[1].title }}</p>
            </div>
          </div>

          <!-- country 0 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 0"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[0].img" />
              <p class="country-name">{{ monopoly.blocks[0].title }}</p>
            </div>
          </div>
          <div class="corner corner--end">
            <div class="corner-text">
              <div>GO</div>
            </div>
            <IconLongArrow class="corner-arrow" />
          </div>
        </div>

        <!-- LEFT -->
        <div class="side left">
          <!-- country 5 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 5"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[5].img" />
              <p class="country-name">{{ monopoly.blocks[5].title }}</p>
            </div>
          </div>

          <!-- country 4 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 4"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[4].img" />
              <p class="country-name">{{ monopoly.blocks[4].title }}</p>
            </div>
          </div>

          <div
            class="cell question-cell"
            @mouseenter="activeKey2 = 1"
            @mouseleave="activeKey2 = null"
          >
            <div class="question-text">?</div>
          </div>

          <!-- country 3 -->
          <div
            class="cell country-cell"
            @mouseenter="activeKey = 3"
            @mouseleave="activeKey = null"
          >
            <div class="country-content">
              <img class="country-flag" :src="monopoly.blocks[3].img" />
              <p class="country-name">{{ monopoly.blocks[3].title }}</p>
            </div>
          </div>

          <div class="cell logo-cell">
            <div class="logo-icon">
              <IconLogo />
            </div>
          </div>
        </div>
      </div>

      <div class="details">
        <div
          v-for="({ details }, i) in monopoly.blocks"
          :key="i"
          class="info"
          :class="{ active: activeKey === i }"
        >
          <div
            v-for="({ number, text }, d) in details"
            :key="d"
            class="info-item"
          >
            <div class="mask">
              <div class="mask-line info-number">{{ number }}</div>
            </div>
            <div class="mask">
              <div class="mask-line info-text">{{ text }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="facts">
        <div
          v-for="({ title, descr }, i) in monopoly.facts"
          :key="i"
          class="fact"
          :class="{ active: activeKey2 === i }"
        >
          <p class="fact-title b2">{{ title }}</p>
          <p class="fact-descr p4">{{ descr }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MainPage } from "@/types/formatted/main-page"

const data = useState<MainPage>("all-data")
const monopoly = data.value.monopoly

const activeKey = ref<number | null>(null)
const activeKey2 = ref<number | null>(null)
</script>

<style scoped lang="scss">
.board {
  background: #000;
  padding: 0.5rem 0.5rem 21rem;
  position: relative;
  @include mobile {
    display: none;
  }
}
.board-wrap {
  position: relative;
}

.details,
.facts {
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 0;
  padding-right: 0.5rem;
  transform: translateY(-50%);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  text-align: right;
}

.mask {
  overflow: hidden;
}
.mask-line {
  transform: translateY(110%);
  transition: transform 1s var(--default-ease);
  will-change: transform;
}
.info,
.fact {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.info.active .mask-line {
  transform: translateY(0);
}

.info-number {
  color: var(--c-red);
  font-family: var(--f-roboto);
  font-size: 14.875rem;
  font-weight: 300;
  font-variation-settings:
    "wght" 300,
    "wdth" 50,
    "grad" 0;
  line-height: 90%;
  letter-spacing: -0.486rem;
  text-transform: capitalize;
}
.info-text {
  font-family: var(--f-peta-med);
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.0522rem;
  text-transform: uppercase;
  color: #fff;
}

.fact {
  gap: 0.75rem;
  opacity: 0;
  color: #fff;
  transition: all 0.4s var(--default-ease);
  width: 12.5rem;
}
.fact.active {
  opacity: 1;
}

.board-inner {
  --corner: 9.6875rem;
  --cell: 6rem;
  --gap: 0.125rem; /* 2px */
  --side: calc(var(--corner) * 2 + var(--cell) * 5 + var(--gap) * 6);

  position: relative;
  width: var(--side);
  height: var(--side);
  color: #fff;
  text-transform: uppercase;
  text-align: center;
}

/* common */
.side {
  position: absolute;
  display: flex;
  gap: var(--gap);
}

.cell,
.corner {
  border: 0.0625rem solid #fff;
  box-sizing: border-box;
  overflow: hidden;
}

.corner {
  width: var(--corner);
  height: var(--corner);
  display: grid;
  place-items: center;
  border: 0.0625rem solid #fff;
  box-sizing: border-box;
  position: relative;
}

.corner-text {
  /* НЕ absolute */
  transform: rotate(var(--corner-rot, 0deg));
}

.corner-arrow {
  width: 4.6875rem;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.top .corner--start {
  --corner-rot: -225deg;
}
.top .corner--end {
  --corner-rot: 225deg;
}

.bottom .corner--start {
  --corner-rot: 45deg;
}
.bottom .corner--end {
  --corner-rot: -45deg;
  color: red;
  font-size: 3.1823rem;
  font-family: var(--f-peta-med);
}

/* default: горизонтальні клітинки (top/bottom) */
.cell {
  width: var(--cell);
  height: var(--corner);
}

/* вертикальні сторони — тільки розміри клітинки + напрямок */
.left,
.right {
  flex-direction: column;
}

.left .cell,
.right .cell {
  width: var(--corner);
  height: var(--cell);
}

/* positioning */
.top {
  top: 0;
  left: 0;
}

.bottom {
  bottom: 0;
  left: 0;
}

.left {
  top: calc(var(--corner) + var(--gap));
  left: 0;
}

.right {
  top: calc(var(--corner) + var(--gap));
  right: 0;
}

@include hover {
  .country-cell:hover,
  .question-cell:hover {
    background: #fff;
    color: #000;
  }
}

// question cell
.question-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.8s var(--default-ease);
}

.question-text {
  color: red;
  font-family: var(--f-peta-red);
  font-size: 3.5653rem;
}
@include hover {
  .question-cell:hover .question-text {
    color: #000;
  }
}
.country-cell {
  position: relative;
  cursor: pointer;
  transition: all 0.8s var(--default-ease);
}
.country-cell:after {
  content: "";
  position: absolute;
  border: 0.0625rem solid #fff;
  z-index: 3;
}

.logo-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-icon {
  width: 2.75rem;
}

.country-name {
  font-size: 0.625rem;
  line-height: normal;
  font-family: var(--f-peta-med);
}
.country-content {
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  align-items: center;
  position: absolute;
}
.country-flag {
  width: 3.25rem;
}

// top
.top .country-cell:after {
  bottom: -0.0625rem;
  left: -0.0625rem;
  height: 2.0625rem;
  width: calc(100% + 0.125rem);
  background: red;
}

.top .logo-icon,
.top .country-content,
.top .question-text {
  transform: rotate(180deg);
}

.top .country-content {
  top: 0.75rem;
  left: 0;
  width: 100%;
}
@include hover {
  .top .country-cell:hover,
  .top .question-cell:hover {
    transform: translateY(1.125rem);
  }
}

// right
.right .country-cell:after {
  left: -0.0625rem;
  top: -0.0625rem;
  width: 2.0625rem;
  height: calc(100% + 0.125rem);
  background: #d93a96;
}

.right .logo-icon,
.right .country-content,
.right .question-text {
  transform: rotate(-90deg);
}

.right .country-content {
  right: 0.75rem;
  height: 100%;
}
@include hover {
  .right .country-cell:hover,
  .right .question-cell:hover {
    transform: translateX(-1.125rem);
  }
}

// left
.left .country-cell:after {
  right: -0.0625rem;
  top: -0.0625rem;
  width: 2.0625rem;
  height: calc(100% + 0.125rem);
  background: red;
}

.left .logo-icon,
.left .country-content,
.left .question-text {
  transform: rotate(90deg);
}

.left .question-text {
  color: #fff;
}

.left .country-content {
  left: 0.75rem;
  height: 100%;
}
@include hover {
  .left .country-cell:hover,
  .left .question-cell:hover {
    transform: translateX(1.125rem);
  }
}

.left .cell:nth-child(4):after {
  background: #0072bb;
}

// bottom
.bottom .logo-icon {
  width: 4.25rem;
}
.bottom .question-text {
  color: #fff;
}
.bottom .country-cell:after {
  left: -0.0625rem;
  top: -0.0625rem;
  width: calc(100% + 0.125rem);
  height: 2.0625rem;
  background: #d93a96;
}
.bottom .country-content {
  bottom: 0.75rem;
  width: 100%;
}

@include hover {
  .bottom .country-cell:hover,
  .bottom .question-cell:hover {
    transform: translateY(-1.125rem);
  }
}

.bottom .c1:after {
  background: #955436;
}
.bottom .c2:after {
  background: #fef200;
}

.monopoly-decor {
  width: 51.5rem;
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
}
.monopoly-logo {
  width: 20.3125rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
