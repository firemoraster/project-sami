<template>
  <div class="contact-popup" data-lenis-prevent>
    <div class="head">
      <p class="your-time b2">{{ $t("form.your_time") }}: {{ userTime }}</p>
      <p class="our-time b2">{{ $t("form.our_time") }}: {{ ownerTime }}</p>
      <p class="let-connect b2">{{ $t("form.lets_connect") }}!</p>
      <div class="close-wrap">
        <CommonButtonClose @click="animClosePopup" />
      </div>
    </div>
    <Form class="body" :validation-schema="formSchema" @submit="onSubmit">
      <div class="blur" />
      <div class="left">
        <CommonLine class="line" :vertical="true" />

        <div class="left-top">
          <div class="row">
            <p class="p1">{{ $t("form.hi_my_name_is") }}</p>
            <div class="field">
              <CommonInput
                type="text"
                :placeholder="$t('form.your_name') + '*'"
                name="name"
              />
            </div>
            <p class="p1 coma">,</p>
          </div>
          <div class="row">
            <p class="p1">{{ $t("form.and_i_work_at") }}</p>
            <div class="field">
              <CommonInput
                type="text"
                :placeholder="$t('form.your_company_name') + '*'"
                name="company"
              />
            </div>
            <p class="p1 dot">.</p>
          </div>
          <div class="row">
            <p class="p1">{{ $t("form.reaching_out_to_discuss") }}</p>
            <div class="field">
              <CommonSelect
                name="discuss"
                :options="formData.discussOptions"
                :placeholder="$t('form.select')"
              />
            </div>
            <p class="p1 dot">.</p>
          </div>
          <div class="row">
            <p class="p1">{{ $t("form.i_know_you") }}</p>
            <div class="field">
              <CommonSelect
                name="knowing"
                :options="formData.knowFromOptions"
                :placeholder="$t('form.select')"
              />
            </div>
            <p class="p1">{{ $t("form.feels_like_match") }} :)</p>
          </div>
          <div class="row row-textarea">
            <p class="p1">{{ $t("form.in_short") }},</p>
            <div class="field">
              <CommonTextarea
                :placeholder="$t('form.message_to_us')"
                name="message"
              />
            </div>
          </div>
        </div>
        <div class="left-bottom">
          <div class="row">
            <p class="p1">{{ $t("form.reach_me_at") }}</p>
            <div class="field">
              <CommonInput
                type="email"
                :placeholder="$t('form.your_email') + '*'"
                name="email"
              />
            </div>
            <p class="p1 dot">,</p>
          </div>

          <div class="row row-tg-phone">
            <div class="field">
              <CommonInput
                type="text"
                :placeholder="$t('form.your_phone')"
                name="phone"
              />
            </div>
            <p class="p1 dot">,</p>
            <div class="field">
              <CommonInput
                type="text"
                :placeholder="$t('form.your_telegram')"
                name="telegram"
              />
            </div>
            <p class="p1 dot">.</p>
          </div>

          <div class="row">
            <p class="p1">{{ $t("form.looking_forward") }}!</p>
          </div>
        </div>

        <button type="submit">
          <CommonButtonDefault text="Submit 🕊" />
        </button>

        <div class="docs-mob">
          <a
            class="hover-line-hide b3"
            :href="footerData.privacy"
            target="_blank"
          >
            {{ $t("footer.policy") }}
          </a>
          <a
            class="hover-line-hide b3"
            :href="footerData.agreement"
            target="_blank"
          >
            {{ $t("footer.agreement") }}
          </a>
        </div>
      </div>
      <div class="right">
        <CommonLine class="line" />

        <div class="name">
          <IconName />
        </div>
        <p class="timestamp p4">{{ $t("form.timestamp") }}: {{ timestamp }}</p>
        <p class="encryption p4">
          {{ $t("form.encryption") }}: {{ formData.person.encryption }}
        </p>

        <div class="deliver">
          <p class="deliver-to p2">{{ $t("form.to") }}:</p>
          <div class="deliver-photo">
            <img class="photo-decor" src="/images/photo-decor.png" alt="" />
            <img class="photo-head" :src="formData.person.photo" alt="" />
          </div>

          <div class="deliver-info">
            <p class="p2">{{ formData.person.name }}</p>
            <p class="p4">{{ formData.person.position }}</p>
          </div>
        </div>

        <div class="contact-info">
          <p class="p4">{{ $t("address") }}: Київ, IQ Business Center</p>
          <p class="p4">
            {{ $t("collaboration") }}/{{ $t("consultation") }}:
            <a
              class="hover-line-show"
              href="https://t.me/Roksolana_SAMI"
              target="_blank"
              >@Roksolana_SAMI</a
            >
          </p>
          <p class="p4">
            {{ $t("mail") }}:
            <a class="hover-line-show" href="mailto:hello@sami.marketing"
              >hello@sami.marketing</a
            >
          </p>
        </div>

        <button type="submit">
          <CommonButtonDefault text="Submit 🕊" />
        </button>

        <div class="docs">
          <a
            class="hover-line-hide b3"
            :href="footerData.privacy"
            target="_blank"
          >
            {{ $t("footer.policy") }}
          </a>
          <a
            class="hover-line-hide b3"
            :href="footerData.agreement"
            target="_blank"
          >
            {{ $t("footer.agreement") }}
          </a>
        </div>
      </div>
    </Form>

    <ContactThanks />
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup"
import { Form } from "vee-validate"
import type { MainPage } from "@/types/formatted/main-page"
import type { SubmissionHandler } from "vee-validate"

const data = useState<MainPage>("all-data")
const formData = data.value.contact.form
const footerData = data.value.footer

interface ValuesInterface {
  name: string
  company: string
  email: string
  message: string
  discuss: string
  knowing: string
  phone: string
  telegram: string
}

const { isDesktop } = useViewport()

const isContactPopupOpen = useState<boolean>("is-contact-popup-open")

onMounted(async () => {
  await nextTick()

  useLockScroll(true)
  animOpenPopup()

  timestamp.value = userTime.value
})

const userTime = ref("")
const ownerTime = ref("")
const timestamp = ref("")

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

function updateTimes() {
  const now = new Date()

  userTime.value = formatTime(now)

  const ownerDate = new Date(
    now.toLocaleString("en-US", { timeZone: formData.ourTime })
  )
  ownerTime.value = formatTime(ownerDate)
}

updateTimes()
const interval = setInterval(updateTimes, 1000)

const animThankPopup = () => {
  const contactPopup = document.querySelector(".contact-popup")
  contactPopup?.removeAttribute("data-lenis-prevent")
  gsap.to(".contact-popup .blur", {
    opacity: 1,
    duration: 0.5,
  })

  if (isDesktop.value) {
    gsap.to(".contact-popup .body", {
      scale: 0.7,
      duration: 1.2,
    })
    gsap.set(".contact-popup .thanks", {
      autoAlpha: 1,
    })
    gsap.to(".contact-popup .thanks", {
      y: 0,
      duration: 1.2,
    })
  } else {
    gsap.from(".contact-popup .thanks", {
      yPercent: 10,
    })
    gsap.to(".contact-popup .thanks", {
      autoAlpha: 1,
    })
  }
}

const animOpenPopup = () => {
  gsap.fromTo(
    ".contact-popup",
    {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.75,
    }
  )
}

const animClosePopup = () => {
  gsap.to(".contact-popup", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    duration: 0.75,
    onComplete() {
      useLockScroll(false)
      isContactPopupOpen.value = false
    },
  })
}

const onSubmit: SubmissionHandler<any> = async (values: ValuesInterface) => {
  animThankPopup()

  await $fetch("/api/form", {
    method: "POST",
    body: JSON.stringify(values),
  })

  // console.log("TG:", response)
}

const formSchema = Yup.object().shape({
  name: Yup.string().required(),
  company: Yup.string().required(),
  email: Yup.string().required().matches(emailRegex),
  message: Yup.string(),
  discuss: Yup.string().required(),
  knowing: Yup.string().required(),
  phone: Yup.string(),
  telegram: Yup.string(),
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped lang="scss">
.contact-popup {
  position: fixed;
  inset: 0;
  z-index: var(--z-popup-contact);
  background: var(--c-blue);
  padding: 0 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;

  @include mobile {
    overflow: auto;
  }
}
.head {
  display: flex;
  align-items: center;
}
.let-connect {
  margin-left: auto;
  margin-right: 21.375rem;

  @include mobile {
    display: none;
  }
}
.our-time {
  margin-left: var(--32);

  @include mobile {
    display: none;
  }
}
.your-time {
  @include mobile {
    padding-top: 0.5rem;
  }
}
.close-wrap {
  @include mobile {
    margin-left: auto;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 11;
    width: 50%;
  }
}
.body {
  background: var(--c-grey);
  flex: 1 1 auto;
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 25.9375rem;

  @include mobile {
    display: flex;
    flex-direction: column;
    margin-top: 8.75rem;
  }
}
.right {
  padding: var(--60);
  display: flex;
  flex-direction: column;

  @include mobile {
    padding: 1.5rem 1.5rem 2.5rem;
    order: 1;
    position: relative;
  }
}
.left {
  position: relative;
  padding: var(--60);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include mobile {
    padding: 4.5625rem 1.5rem 1.625rem;
    order: 2;
  }
}
.row {
  display: flex;
  align-items: flex-end;

  @include mobile {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
}
.row:not(:last-child) {
  margin-bottom: var(--16);

  @include mobile {
    margin-bottom: 4.5625rem;
  }
}
.field {
  flex: 1 1 auto;
  margin: 0 var(--32);
  position: relative;
  top: 0.1875rem;
  display: flex;
  justify-content: center;

  @include mobile {
    margin: 0;
    top: 0;
  }
}
.right button,
.right button:deep(.btn-default) {
  width: 100%;
}
.right button {
  margin-top: 2.5rem;

  @include mobile {
    display: none;
  }
}
.row-textarea {
  align-items: flex-start;

  @include mobile {
    align-items: stretch;
  }
}
.row-textarea .field {
  position: relative;
  top: -0.0625rem;
  margin-right: 0;

  @include mobile {
    top: 0;
  }
}
.name {
  --icon-color: var(--c-black);
  margin-bottom: var(--12);

  @include mobile {
    margin-bottom: 0.5rem;
  }
}
.timestamp,
.encryption {
  text-align: center;
}
.deliver {
  display: flex;
  gap: var(--12);
  margin-top: 4.8125rem;

  @include mobile {
    margin-top: 5.5rem;
  }
}
.deliver-to {
  opacity: 0.3;

  @include mobile {
    margin-right: 1rem;
  }
}
.deliver-photo {
  flex: 0 0 5.9375rem;
  height: 7.125rem;
  position: relative;
  margin-top: -1.2rem;
  transform: rotate(-3deg);
}
.deliver-photo:after {
  content: "";
  position: absolute;
  width: calc(100% - 0.8125rem);
  height: calc(100% - 0.8125rem);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1f6c6e;
}
.photo-decor {
  width: 100%;
  height: 100%;
}
.photo-head {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.75rem;
  z-index: 2;
}
.blur {
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2.450000047683716px);
  opacity: 0;
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 10;

  @include mobile {
    background: rgba(0, 0, 0, 0.35);
    position: fixed;
  }
}
.dot,
.coma {
  @include mobile {
    display: none;
  }
}
.left .line {
  @include mobile {
    display: none;
  }
}
.right .line {
  display: none;
  @include mobile {
    display: block;
  }
}
.left-bottom {
  @include mobile {
    margin-top: 4.5625rem;
  }
}
.left-bottom .row:not(:last-child) {
  @include mobile {
    margin-bottom: 1.5rem;
  }
}
.left button {
  display: none;

  @include mobile {
    display: block;
    margin-top: 4.5rem;
  }
}
.left button,
.left button:deep(.btn-default) {
  @include mobile {
    width: 100%;
  }
}
.row-tg-phone .field:nth-child(1) {
  margin-left: 0;
}
.deliver-info .p2 {
  line-height: 128%;
  margin-bottom: 1rem;
}
.deliver-info {
  @include mobile {
    padding-right: 2rem;
  }
}
.docs {
  display: flex;
  gap: 1rem;
  margin-top: var(--24);
  justify-content: center;

  @include mobile {
    display: none;
  }
}
.docs a,
.docs-mob a {
  line-height: 128%;
}
.docs-mob {
  display: none;
  @include mobile {
    display: flex;
    gap: 1rem;
    margin-top: 4.5rem;
    justify-content: center;
  }
}
.contact-info {
  margin-top: auto;


  @include mobile {
    margin-top: 8rem;
  }
}
.contact-info p {
  text-align: center;
  line-height: 130%;
}
</style>
