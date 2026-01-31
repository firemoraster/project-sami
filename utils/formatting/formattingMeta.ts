import type { Meta, StrapiMeta } from "~/types"

export default function formattingMeta(data: StrapiMeta): Meta {
  const {
    strapi: { url },
  } = useRuntimeConfig()

  const title = data?.ogTitle || ""
  const description = data?.ogDescription || ""
  const keywords = data?.keywords || ""
  const image = url + (data?.ogImage?.data?.attributes?.url || "")
  const video = url + (data?.ogGif?.data?.attributes?.url || "")

  return {
    title,
    description,
    keywords,

    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: title,
    ogImageUrl: image,

    ogVideo: video,
    ogVideoWidth: 640,
    ogVideoHeight: 385,
    ogVideoType: "video/mp4",

    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: title,
    twitterCard: "summary_large_image",
  }
}
