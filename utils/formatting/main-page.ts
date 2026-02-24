import type { MainPagePure } from "@/types/response/main-page"
import type { MainPage } from "@/types/formatted/main-page"
import formattingMeta from "@/utils/formatting/formattingMeta"

export function formattingMainPage({ data }: MainPagePure): MainPage {
  const {
    strapi: { url },
  } = useRuntimeConfig()

  // ✅ Важливо: дістаємо preloaderInfo4 теж
  const {
    preloaderInfo,
    preloaderInfo2,
    preloaderInfo3,
    preloaderInfo4,
    Project_data,
    Monopoly_blocks,
    Monopoly_facts,

    seoBlock,
    cubeSides,
    introSubtitle,
    introDescription,
    introText,
    introPhoto,
    introVideo,
    introTitles,
    introPhotos,
    introDescription2,
    leftTitle,
    rightTitle,
    introDescription3,
    introDescription4,
    introBigPhoto,
    scratchText,
    aboutTitle,
    aboutDescription,
    aboutTitles,
    coreTitle,
    coreValue,
    aboutMission,
    aboutPhotos,
    teamTitle,
    person,
    servicesTitle,
    typeService,
    projectTitle,
    projectDescription,
    addInfo,
    workedWith,
    projectItems,
    feedbackTitle,
    feedbackTitle2,
    feedbackBrands,
    feedbackInfluencers,
    footerTitles,
    footerDescription,
    form,
    budget,
    privacyPolicy,
    termsUse,
    agreement,
    mail,
    instagram,
    telegram,
    linkedin,

    // ⚠️ у тебе в коді було Youtube (з великої)
    // але часто поле називається youtube
    Youtube,
    // @ts-ignore (якщо в типах є youtube — TS це підхопить)
    youtube,
  } = data.attributes as any

  // ✅ нормалізуємо ютуб, щоб не ловити undefined
  const youtubeValue = Youtube ?? youtube ?? ""

  return {
    preloader: {
      info1: {
        number: preloaderInfo?.number ?? "",
        text: preloaderInfo?.text ?? "",
      },
      info2: {
        number: preloaderInfo2?.number ?? "",
        text: preloaderInfo2?.text ?? "",
      },
      info3: {
        number: preloaderInfo3?.number ?? "",
        text: preloaderInfo3?.text ?? "",
      },
      info4: {
        number: preloaderInfo4?.number ?? "",
        text: preloaderInfo4?.text ?? "",
      },
    },

    intro: {
      hero: {
        subtitle: {
          text1: introSubtitle?.text1 ?? "",
          text2: introSubtitle?.text2 ?? "",
          text3: introSubtitle?.text3 ?? "",
          text4: introSubtitle?.text4 ?? "",
        },
        description: {
          text1: introDescription?.text1 ?? "",
          text2: introDescription?.text2 ?? "",
          text3: introDescription?.text3 ?? "",
          text4: introDescription?.text4 ?? "",
          text5: introDescription?.text5 ?? "",
        },
        text: introText ?? "",
        photo: introPhoto?.data?.attributes?.url
          ? url + introPhoto.data.attributes.url
          : "",
        video: introVideo?.data?.attributes?.url
          ? url + introVideo.data.attributes.url
          : "",
      },

      info: {
        title: (introTitles ?? []).map((el: any) => el?.text ?? ""),
        photos: (introPhotos?.data ?? []).map((el: any) =>
          el?.attributes?.url ? url + el.attributes.url : ""
        ),
        cube: (cubeSides?.data ?? []).map((el: any) =>
          el?.attributes?.url ? url + el.attributes.url : ""
        ),
        description: {
          title: introDescription2?.title ?? "",
          text: introDescription2?.text ?? "",
        },
        leftTitle: leftTitle ?? "",
        rightTitle: rightTitle ?? "",
        description2: introDescription3 ?? "",
        description3: introDescription4 ?? "",
        photo: introBigPhoto?.data?.attributes?.url
          ? url + introBigPhoto.data.attributes.url
          : "",
        scratchText: scratchText ?? "",
      },
    },

    about: {
      details: {
        title: aboutTitle ?? "",
        description: {
          title: aboutDescription?.title ?? "",
          text: aboutDescription?.text ?? "",
        },
        title2: (aboutTitles ?? []).map((el: any) => el?.text ?? ""),
        coreTitle: coreTitle ?? "",
        coreValue: coreValue ?? "",
        mission: {
          title: aboutMission?.title ?? "",
          text: aboutMission?.text ?? "",
        },
        photos: (aboutPhotos?.data ?? []).map((el: any) =>
          el?.attributes?.url ? url + el.attributes.url : ""
        ),
      },

      team: {
        title: teamTitle ?? "",
        person: (person ?? []).map((el: any) => ({
          position: el?.position ?? "",
          description: el?.description ?? "",
          name: el?.name ?? "",
          face: el?.face?.data?.attributes?.url
            ? url + el.face.data.attributes.url
            : "",
        })),
      },
    },

    services: {
      title: servicesTitle ?? "",
      type: (typeService ?? []).map((el: any) => ({
        name: el?.name ?? "",
        photo: el?.photo?.data?.attributes?.url
          ? url + el.photo.data.attributes.url
          : "",
        description: el?.description ?? "",
        description2: el?.description2 ?? "",
        subServices: (el?.subServices ?? []).map((item: any) => ({
          name: item?.name ?? "",
          description: item?.description ?? "",
          mark: item?.mark,
        })),
      })),
    },

    monopoly: {
      facts: Monopoly_facts.map((el: any) => ({
        title: el.title,
        descr: el.descr,
      })),
      blocks: Monopoly_blocks.map((el: any) => ({
        title: el.title,
        img: el?.img?.data?.attributes?.url
          ? url + el.img.data.attributes.url
          : "",
        details: el?.details.map((det: any) => ({
          number: det?.number,
          text: det?.text,
        })),
      })),
    },

    projects: {
      hero: {
        title: projectTitle ?? "",
        description: projectDescription ?? "",
        brands: (workedWith ?? []).map((el: any) => ({
          name: el?.brand ?? "",
          logo: el?.logo?.data?.attributes?.url
            ? url + el.logo.data.attributes.url
            : null,
          industry: el?.industry ?? "",
        })),
      },

      facts: (addInfo ?? []).map((el: any) => ({
        number: el?.number ?? "",
        text: el?.text ?? "",
      })),

      data: Project_data.map((el: any) => ({
        name: el.Name,
        list: el.List.map((l: any) => ({
          title: l.Title,
          number1: l.Number1,
          number2: l.Number2,
          text1: l.Text1,
          text2: l.Text2,
        })),
      })),

      items: (projectItems ?? []).map((el: any) => ({
        id: el?.id,
        mainPhoto: el?.mainPhoto?.data?.attributes?.url
          ? url + el.mainPhoto.data.attributes.url
          : "",
        brandPhoto: el?.brandPhoto?.data?.attributes?.url
          ? url + el.brandPhoto.data.attributes.url
          : null,
        year: el?.year ?? "",
        title: el?.title ?? "",
        client: el?.client ?? "",
        type: el?.type?.data?.attributes?.text ?? "",
        summary: (el?.summary ?? []).map((item: any) => item?.text ?? ""),
        strategy: (el?.strategy ?? []).map((item: any) => ({
          title: item?.title ?? "",
          description: item?.description ?? "",
        })),
        gallery: (el?.gallery?.data ?? []).map((item: any) =>
          item?.attributes?.url ? url + item.attributes.url : ""
        ),
        results: (el?.results ?? []).map((item: any) => ({
          title: item?.title ?? "",
          subtitle: item?.subtitle ?? "",
          description: item?.description ?? "",
        })),
        text: el?.text ?? "",
        beforeAfter: (el?.beforeAfter ?? []).map((item: any) => ({
          beforeTitle: item?.beforeTitle ?? "",
          beforeDescription: item?.beforeDescription ?? "",
          beforePhoto: item?.beforePhoto?.data?.attributes?.url
            ? url + item.beforePhoto.data.attributes.url
            : "",
          afterTitle: item?.afterTitle ?? "",
          afterDescription: item?.afterDescription ?? "",
          afterPhoto: item?.afterPhoto?.data?.attributes?.url
            ? url + item.afterPhoto.data.attributes.url
            : "",
        })),
        review: el?.review
          ? {
              text: el?.review?.text ?? "",
              position: el?.review?.position ?? "",
              name: el?.review?.name ?? "",
              photo: el?.review?.photo?.data?.attributes?.url
                ? url + el.review.photo.data.attributes.url
                : "",
            }
          : undefined,
      })),
    },

    feedback: {
      hero: {
        title: feedbackTitle ?? "",
        description: feedbackTitle2 ?? "",
      },

      reviews: {
        brands: (feedbackBrands ?? []).map((el: any) => ({
          name: el?.name ?? "",
          position: el?.position ?? "",
          description: el?.description ?? "",
          photo: el?.photo?.data?.attributes?.url
            ? url + el.photo.data.attributes.url
            : "",
          socials: (el?.socialLink ?? []).map((item: any) => ({
            name: item?.name ?? "",
            link: item?.link ?? "",
          })),
        })),

        influencers: (feedbackInfluencers ?? []).map((el: any) => ({
          name: el?.name ?? "",
          position: el?.position ?? "",
          description: el?.description ?? "",
          photo: el?.photo?.data?.attributes?.url
            ? url + el.photo.data.attributes.url
            : "",
          socials: (el?.socialLink ?? []).map((item: any) => ({
            name: item?.name ?? "",
            link: item?.link ?? "",
          })),
        })),
      },
    },

    contact: {
      info: {
        title: (footerTitles ?? []).map((el: any) => el?.text ?? ""),
        description: footerDescription ?? "",
      },

      form: {
        ourTime: form?.ourTime ?? "",
        discussOptions: (form?.discussOptions ?? []).map(
          (el: any) => el?.text ?? ""
        ),
        knowFromOptions: (form?.knowFrom ?? []).map(
          (el: any) => el?.text ?? ""
        ),
        person: {
          name: form?.person?.name ?? "",
          photo: form?.person?.photo?.data?.attributes?.url
            ? url + form.person.photo.data.attributes.url
            : "",
          position: form?.person?.position ?? "",
          encryption: form?.person?.encryption ?? "",
        },
        thanksStatus: form?.thanksStatus ?? "",
        thanksDescription: form?.thanksDescription ?? "",
        thanksTitle: form?.thanksTitle ?? "",
        instagram: instagram ?? "",
        telegram: telegram ?? "",
        linkedin: linkedin ?? "",
        youtube: youtubeValue,
      },
    },

    footer: {
      budget: {
        perMilliseconds: budget?.perMilliseconds ?? "",
        maxBudget: budget?.maxBudget ?? "",
        tip1: {
          emoji: budget?.tip?.emoji ?? "",
          text: budget?.tip?.text ?? "",
        },
        tip2: {
          emoji: budget?.tip2?.emoji ?? "",
          text: budget?.tip2?.text ?? "",
        },
        tip3: {
          emoji: budget?.tip3?.emoji ?? "",
          text: budget?.tip3?.text ?? "",
        },
        tip4: {
          emoji: budget?.tip4?.emoji ?? "",
          text: budget?.tip4?.text ?? "",
        },
      },
      privacy: privacyPolicy?.data?.attributes?.url
        ? url + privacyPolicy.data.attributes.url
        : "",
      terms: termsUse?.data?.attributes?.url
        ? url + termsUse.data.attributes.url
        : "",
      agreement: agreement?.data?.attributes?.url
        ? url + agreement.data.attributes.url
        : "",
      email: mail ?? "",
      youtube: youtubeValue,
      instagram: instagram ?? "",
      telegram: telegram ?? "",
      linkedin: linkedin ?? "",
    },

    seo: formattingMeta(seoBlock),
  }
}
