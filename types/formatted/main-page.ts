import type { Meta } from "~/types/common"

export interface PreloaderInterface {
  info1: {
    number: string
    text: string
  }
  info2: {
    number: string
    text: string
  }
  info3: {
    number: string
    text: string
  }
  info4: {
    number: string
    text: string
  }
}

export interface IntroInterface {
  hero: {
    subtitle: {
      text1: string
      text2: string
      text3: string
      text4: string
    }
    description: {
      text1: string
      text2: string
      text3: string
      text4: string
      text5: string
    }
    text: string
    photo: string
    video: string
  }
  info: {
    title: string[]
    photos: string[]
    description: {
      title: string
      text: string
    }
    cube: string[]
    leftTitle: string
    rightTitle: string
    description2: string
    description3: string
    photo: string
    scratchText: string
  }
}

export interface AboutInterface {
  details: {
    title: string
    description: {
      title: string
      text: string
    }
    title2: string[]
    coreTitle: string
    coreValue: string
    mission: {
      title: string
      text: string
    }
    photos: string[]
  }
  team: {
    title: string
    person: {
      position: string
      name: string
      description: string
      face: string
    }[]
  }
}

export interface ServicesInterface {
  title: string
  type: {
    name: string
    photo: string
    description: string
    description2: string
    subServices: {
      name: string
      description: string
      mark: boolean | undefined
    }[]
  }[]
}

export interface ProjectsInterface {
  hero: {
    title: string
    description: string
    brands: {
      name: string
      industry: string
      logo: string | null
    }[]
  }
  data: {
    name: string
    list: {
      title: string
      number1: string
      number2: string
      text2: string
      text1: string
    }[]
  }[]
  facts: {
    number: string
    text: string
  }[]
  items: {
    id: number
    mainPhoto: string
    brandPhoto: string | null
    year: string
    title: string
    client: string
    summary?: string[]
    type: string
    strategy?: {
      title: string
      description: string
    }[]
    gallery?: string[]
    results?: {
      title: string
      subtitle: string
      description: string
    }[]
    text?: string
    beforeAfter?: {
      beforeTitle: string
      beforeDescription: string
      beforePhoto: string
      afterTitle: string
      afterDescription: string
      afterPhoto: string
    }[]
    review?: {
      text: string
      photo: string
      name: string
      position: string
    }
  }[]
}

export interface FeedbackInterface {
  hero: {
    title: string
    description: string
  }
  reviews: {
    brands: {
      name: string
      position: string
      description: string
      photo: string
      socials: {
        name: string
        link: string
      }[]
    }[]
    influencers: {
      name: string
      position: string
      description: string
      photo: string
      socials: {
        name: string
        link: string
      }[]
    }[]
  }
}

export interface ContactInterface {
  info: {
    title: string[]
    description: string
  }
  form: {
    ourTime: string
    discussOptions: string[]
    knowFromOptions: string[]
    person: {
      photo: string
      name: string
      position: string
      encryption: string
    }
    thanksStatus: string
    thanksTitle: string
    thanksDescription: string
    linkedin: string
    instagram: string
    youtube: string
    telegram: string
  }
}

export interface FooterInterface {
  budget: {
    perMilliseconds: string
    maxBudget: string
    tip1: {
      emoji: string
      text: string
    }
    tip2: {
      emoji: string
      text: string
    }
    tip3: {
      emoji: string
      text: string
    }
    tip4: {
      emoji: string
      text: string
    }
  }
  privacy: string
  terms: string
  agreement: string
  email: string
  linkedin: string
  instagram: string
  telegram: string
  youtube: string
}

export interface MainPage {
  preloader: PreloaderInterface
  intro: IntroInterface
  about: AboutInterface
  services: ServicesInterface
  projects: ProjectsInterface
  feedback: FeedbackInterface
  contact: ContactInterface
  footer: FooterInterface
  seo: Meta
}
