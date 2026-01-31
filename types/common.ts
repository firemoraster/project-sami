export interface StrapiMeta {
  id: number
  ogTitle: string
  ogDescription: string
  metaTitle: string
  metaDescription: string
  keywords: string
  ogImage: {
    data: {
      id: number
      attributes: {
        url: string
      }
    } | null
  }
  ogGif: {
    data: {
      id: number
      attributes: {
        url: string
      }
    } | null
  }
  metaImage: {
    data: {
      id: number
      attributes: {
        url: string
      }
    } | null
  }
}

type TwitterCard =
  | "summary"
  | "summary_large_image"
  | "app"
  | "player"
  | null
  | undefined

export interface Meta {
  title: string
  description: string
  keywords: string

  ogImage: string
  ogImageUrl: string
  ogImageAlt: string
  ogTitle: string
  ogDescription: string

  ogVideo: string,
  ogVideoWidth: number,
  ogVideoHeight: number,
  ogVideoType: "video/mp4",

  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  twitterImageAlt: string
  twitterCard: TwitterCard
}
