<template>
  <div
    class="textarea__wrap"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >

    <textarea
      ref="textareaRef"
      class="textarea"
      :name="name"
      :value="inputValue"
      :placeholder="placeholder"
      @blur="handleBlur"
      @input="handleInput"
      @paste.prevent
    />

    <CommonLine class="line-1" />
    <CommonLine class="line-2" />
    <CommonLine class="line-3" />
    <CommonLine class="line-4" />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate"

interface Props {
  value?: string | undefined
  placeholder: string
  name: string
}
const props = defineProps<Props>()

const name = toRef(props, "name")

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
})

const textareaRef = ref()

let maxHeight = 0

const updateMaxHeight = () => {
  if (textareaRef.value) {
    maxHeight = textareaRef.value.scrollHeight
  }
}

const handleInput = async (e: Event) => {
  const target = e.target as HTMLTextAreaElement

  await nextTick()

  if (target.scrollHeight > maxHeight + 10) {
    target.value = target.value.slice(0, -1)
  }

  handleChange(e)
}

onMounted(async () => {
  await nextTick()

  updateMaxHeight()
})
</script>

<style lang="scss" scoped>
.textarea__wrap {
  position: relative;
  width: 100%;
}
.textarea {
  width: 100%;
  color: var(--color-black);
  font-family: var(--f-peta-med);
  background: transparent;
  border: none;
  border-radius: 0;
  font-size: 1.25rem;
  line-height: 190%;
  letter-spacing: -0.055rem;
  height: 10rem;
  resize: none;

  @include mobile {
    font-size: .9375rem;
    letter-spacing: -0.0413rem;
    line-height: 250%;
  }
}
.textarea::placeholder {
  color: var(--color-black);
  font-family: var(--f-peta-med);
  opacity: 0.3;
}
.has-error .textarea, .has-error .textarea::placeholder {
  color: var(--c-red);
  opacity: 1;
}
.has-error:deep(.line div:nth-child(2)) {
  background: var(--c-red);
}
.line-1 {
  bottom: 33%;
}
.line-2 {
  bottom: 56%;
}
.line-3 {
  bottom: 78%;
}
.line-4 {
  bottom: 10%;
}
</style>
