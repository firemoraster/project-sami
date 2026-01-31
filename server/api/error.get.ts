import { ErrorPagePure } from "@/types/response/error-page"

export default defineEventHandler(async () => {
  const {
    strapi: { url },
  } = useRuntimeConfig()

  try {
    const response = await $fetch<ErrorPagePure>(`${url}/api/error`)

    return response
  } catch (error) {
    return null
  }
})
