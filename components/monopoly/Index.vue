<template>
  <section class="board">
    <div class="board-inner">
      <!-- TOP -->
      <div class="side top">
        <div class="corner corner--start">
          <div class="corner-text p2">
            <div>free</div>
            <div>space</div>
          </div>
        </div>
        <div class="cell question-cell">
          <div class="question-text">?</div>
        </div>
        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[0].img" />
            <p class="country-name">{{ monopoly.blocks[0].title }}</p>
          </div>
        </div>
        <div class="cell logo-cell">
          <div class="logo-icon">
            <IconLogo />
          </div>
        </div>
        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[1].img" />
            <p class="country-name">{{ monopoly.blocks[1].title }}</p>
          </div>
        </div>
        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[2].img" />
            <p class="country-name">{{ monopoly.blocks[2].title }}</p>
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
        <div class="cell question-cell">
          <div class="question-text">?</div>
        </div>
        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[3].img" />
            <p class="country-name">{{ monopoly.blocks[3].title }}</p>
          </div>
        </div>
        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[4].img" />
            <p class="country-name">{{ monopoly.blocks[4].title }}</p>
          </div>
        </div>
        <div class="cell logo-cell">
          <div class="logo-icon">
            <IconLogo />
          </div>
        </div>

        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[5].img" />
            <p class="country-name">{{ monopoly.blocks[5].title }}</p>
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
        <div class="cell question-cell">
          <div class="question-text">?</div>
        </div>
        <div class="cell country-cell c1">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[0].img" />
            <p class="country-name">{{ monopoly.blocks[0].title }}</p>
          </div>
        </div>
        <div class="cell logo-cell">
          <div class="logo-icon">
            <IconName />
          </div>
        </div>
        <div class="cell country-cell c2">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[1].img" />
            <p class="country-name">{{ monopoly.blocks[1].title }}</p>
          </div>
        </div>
        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[2].img" />
            <p class="country-name">{{ monopoly.blocks[2].title }}</p>
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
        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[3].img" />
            <p class="country-name">{{ monopoly.blocks[3].title }}</p>
          </div>
        </div>

        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[4].img" />
            <p class="country-name">{{ monopoly.blocks[4].title }}</p>
          </div>
        </div>

        <div class="cell question-cell">
          <div class="question-text">?</div>
        </div>
        <div class="cell country-cell">
          <div class="country-content">
            <img class="country-flag" :src="monopoly.blocks[5].img" />
            <p class="country-name">{{ monopoly.blocks[5].title }}</p>
          </div>
        </div>

        <div class="cell logo-cell">
          <div class="logo-icon">
            <IconLogo />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const monopoly = {
  facts: [
    {
      title: "RECORD-BREAKING REACH",
      descr:
        "The campaign generated over 3M organic impressions within the first 72 hours.",
    },

    {
      title: "ENGAGEMENT ABOVE BENCHMARK",
      descr:
        "Engagement rate exceeded industry benchmarks by 240%, setting a new internal record.",
    },

    {
      title: "MOBILE-FIRST IMPACT",
      descr:
        "Over 65% of traffic came from mobile users, highlighting strong cross-platform adaptability.",
    },

    {
      title: "SURGE IN BRAND DEMAND",
      descr:
        "The activation sparked a 4x increase in branded search queries within one week.",
    },
  ],
  blocks: [
    {
      title: "philippines",
      img: "/images/flag.svg",
      details: [
        { number: "146%", text: "jump in participation" },
        { number: "250M", text: "total reach growth" },
        { number: "+24000", text: "new active users" },
      ],
    },
    {
      title: "germany",
      img: "/images/flag.svg",
      details: [
        { number: "98%", text: "increase in engagement" },
        { number: "180M", text: "campaign impressions" },
        { number: "+18200", text: "new signups" },
      ],
    },
    {
      title: "brazil",
      img: "/images/flag.svg",
      details: [
        { number: "172%", text: "audience growth" },
        { number: "320M", text: "media exposure" },
        { number: "+31200", text: "new participants" },
      ],
    },
    {
      title: "canada",
      img: "/images/flag.svg",
      details: [
        { number: "121%", text: "conversion increase" },
        { number: "95M", text: "organic views" },
        { number: "+8600", text: "new registrations" },
      ],
    },
    {
      title: "japan",
      img: "/images/flag.svg",
      details: [
        { number: "134%", text: "brand awareness lift" },
        { number: "210M", text: "video views" },
        { number: "+15400", text: "new users onboarded" },
      ],
    },
    {
      title: "australia",
      img: "/images/flag.svg",
      details: [
        { number: "89%", text: "traffic growth" },
        { number: "76M", text: "social impressions" },
        { number: "+7300", text: "new accounts created" },
      ],
    },
    {
      title: "france",
      img: "/images/flag.svg",
      details: [
        { number: "158%", text: "participation boost" },
        { number: "140M", text: "digital exposure" },
        { number: "+19400", text: "new subscribers" },
      ],
    },
    {
      title: "india",
      img: "/images/flag.svg",
      details: [
        { number: "203%", text: "market expansion" },
        { number: "540M", text: "content reach" },
        { number: "+45200", text: "new active members" },
      ],
    },
    {
      title: "spain",
      img: "/images/flag.svg",
      details: [
        { number: "111%", text: "engagement rise" },
        { number: "88M", text: "ad impressions" },
        { number: "+9700", text: "new customers" },
      ],
    },
    {
      title: "italy",
      img: "/images/flag.svg",
      details: [
        { number: "129%", text: "brand interaction growth" },
        { number: "102M", text: "campaign reach" },
        { number: "+11300", text: "new leads generated" },
      ],
    },
    {
      title: "mexico",
      img: "/images/flag.svg",
      details: [
        { number: "167%", text: "user engagement boost" },
        { number: "190M", text: "total impressions" },
        { number: "+22100", text: "new app installs" },
      ],
    },
    {
      title: "uk",
      img: "/images/flag.svg",
      details: [
        { number: "140%", text: "conversion uplift" },
        { number: "150M", text: "online reach" },
        { number: "+16800", text: "new verified users" },
      ],
    },
  ],
}
</script>

<style scoped lang="scss">
.board {
  background: #000;
  padding: 0.5rem 0.5rem 21rem;
  display: grid;
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
</style>
