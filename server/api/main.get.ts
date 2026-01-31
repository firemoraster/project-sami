import { MainPagePure } from "@/types/response/main-page"
import { MainPageQuery } from "@/utils/queries/main-page"
import { formattingMainPage } from "@/utils/formatting/main-page"

export default defineEventHandler(async (event) => {
  const {
    strapi: { url },
  } = useRuntimeConfig()

  const query = getQuery(event)
  const locale = query.locale === "ua" ? "uk-UA" : query.locale || "en"

  try {
    const response = await $fetch<MainPagePure>(
      `${url}/api/main?${MainPageQuery}&locale=${locale}`
    )

    return formattingMainPage(response)
  } catch (error) {
    return null
  }
})
