<template>
  <section class="monopoly">
    <div class="items">
      <div class="head">
        <div class="block angle-block-1">
          <div class="block-text p2">
            <div>free</div>
            <div>space</div>
          </div>
        </div>

        <div class="block question-block">?</div>

        <div class="block basic-block">
          <img
            class="block-flag"
            draggable="false"
            :src="monopoly.blocks[0].img"
          />
          <p class="block-title">{{ monopoly.blocks[0].title }}</p>
        </div>

        <div class="block logo-block">
          <IconLogo class="logo-svg" />
        </div>

        <div class="block basic-block">
          <img
            class="block-flag"
            draggable="false"
            :src="monopoly.blocks[1].img"
          />
          <p class="block-title">{{ monopoly.blocks[1].title }}</p>
        </div>

        <div class="block basic-block">
          <img
            class="block-flag"
            draggable="false"
            :src="monopoly.blocks[2].img"
          />
          <p class="block-title">{{ monopoly.blocks[2].title }}</p>
        </div>

        <div class="block angle-block-2">
          <div class="block-text p2">
            <div>free</div>
            <div>parking</div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="block basic-block">
          <img
            class="block-flag"
            draggable="false"
            :src="monopoly.blocks[0].img"
          />
          <p class="block-title">{{ monopoly.blocks[0].title }}</p>
        </div>

        <div class="block question-block">?</div>
      </div>
    </div>

    <div class="details">123</div>
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
.monopoly {
  min-height: 100vh;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 50.125rem 1fr;
  align-items: center;
  background: var(--c-black);
  color: var(--c-white);
}

/* ===== VARIABLES ===== */
.items {
  --corner: 9.6875rem;
  --block: 6rem;
  --gap: 0.125rem; /* 2px */
  --board: calc(var(--corner) * 2 + var(--block) * 5 + var(--gap) * 6);

  position: relative;
  width: var(--board);
  height: var(--board);
}

/* ===== TOP ROW ===== */
.head {
  position: relative;
  width: 100%;
  height: var(--corner);
}

.head .block {
  top: 0;
  transform: rotate(180deg);
}

/* ===== CORNERS ===== */
.items .angle-block-1 {
  left: 0;
  width: var(--corner);
  height: var(--corner);
}

.items .angle-block-2 {
  right: 0;
  width: var(--corner);
  height: var(--corner);
}

/* ===== TOP BLOCKS WITH GAP ===== */

.head .block:nth-child(2) {
  left: calc(var(--corner) + var(--gap));
}

.head .block:nth-child(3) {
  left: calc(var(--corner) + var(--block) * 1 + var(--gap) * 2);
}

.head .block:nth-child(4) {
  left: calc(var(--corner) + var(--block) * 2 + var(--gap) * 3);
}

.head .block:nth-child(5) {
  left: calc(var(--corner) + var(--block) * 3 + var(--gap) * 4);
}

.head .block:nth-child(6) {
  left: calc(var(--corner) + var(--block) * 4 + var(--gap) * 5);
}

/* ===== COMMON BLOCK ===== */
.block {
  position: absolute;
  height: var(--corner);
  border: 0.0625rem solid var(--c-white);
  text-align: center;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--block);
}

.basic-block {
  height: 7.5rem;
}

.basic-block:after {
  content: "";
  position: absolute;
  height: 2.0625rem;
  border: 0.0625rem solid var(--c-white);
  bottom: 100%;
  margin-bottom: 0.1875rem;
  left: -0.0625rem;
  right: -0.0625rem;
}

.head .basic-block:after {
  background: var(--c-red);
}

.block-title {
  font-size: 0.625rem;
  line-height: normal;
  font-family: var(--f-peta-med);
}

.question-block {
  color: var(--c-red);
  font-family: var(--f-peta-reg);
  font-size: 3.5653rem;
}

.logo-svg {
  width: 2.75rem;
}

.angle-block-1 .block-text {
  transform: rotate(-45deg);
}

.angle-block-2 .block-text {
  transform: rotate(45deg);
}

.block-flag {
  width: 3.25rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

/* ===== BODY ===== */

.body {
  position: absolute;
  top: calc(var(--corner) + var(--gap));
  left: 0;
  width: 100%;
  height: calc(var(--block) * 5 + var(--gap) * 4);
}

.body .block:nth-child(odd) {
  transform: rotate(90deg);
}
.body .block:nth-child(even) {
  transform: rotate(-90deg);
}

//1
.body .block:nth-child(1) {
  top: -0.75rem;
  left: 0.75rem;
}
.body .block:nth-child(1):after {
  background: red;
}
// 2
.body .block:nth-child(2) {
  top: -29px;
  right: 30px;
}
</style>
