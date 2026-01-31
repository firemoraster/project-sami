<template>
  <div
    class="input__wrap"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <input
      class="input"
      :name="name"
      :type="type"
      :value="inputValue"
      :autocomplete="name"
      :placeholder="placeholder"
      @input="handleInputFunc"
      @blur="handleBlur"
    />

    <CommonLine />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate"

interface Props {
  type: string
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

function validateNumericInput(e: InputEvent) {
  const input = e.target as HTMLInputElement;
  let value = input.value;

  value = value.replace(/\D/g, "");

  input.value = value;

  return value;
}

function handleInputFunc(e: Event) {
  if (props.name === "phone") {
    const validatedValue = validateNumericInput(e as InputEvent)
    handleChange(validatedValue)
  } else {
    handleChange(e)
  }
}

</script>

<style lang="scss" scoped>
.input__wrap {
  position: relative;
  width: 100%;
}
.input {
  width: 100%;
  color: var(--color-black);
  font-family: var(--f-peta-med);
  background: transparent;
  border: none;
  border-radius: 0;
  font-size: 1.25rem;
  line-height: 130%;
  letter-spacing: -0.055rem;
  padding: 0.3rem 0;

  @include mobile {
    padding: 0 0 0.5rem;
    font-size: .9375rem;
    letter-spacing: -0.0413rem;
  }
}
.input::placeholder {
  color: var(--color-black);
  font-family: var(--f-peta-med);
  opacity: 0.3;
}
.has-error .input, .has-error .input::placeholder {
  color: var(--c-red);
  opacity: 1;
}
.has-error:deep(.line div:nth-child(2)) {
  background: var(--c-red);
}
</style>
