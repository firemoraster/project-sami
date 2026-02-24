export interface MainPagePure {
  data: {
    id: number
    attributes: {
      locale: string
      introText: string
      leftTitle: string
      rightTitle: string
      introDescription3: string
      introDescription4: string
      scratchText: string
      aboutTitle: string
      coreValue: string
      coreTitle: string
      teamTitle: string
      servicesTitle: string
      projectTitle: string
      projectDescription: string
      feedbackTitle: string
      feedbackTitle2: string
      footerDescription: string
      instagram: string
      telegram: string
      linkedin: string
      Youtube: string
      mail: string
      introSubtitle: {
        text1: string
        text2: string
        text3: string
        text4: string
      }
      introDescription: {
        text1: string
        text2: string
        text3: string
        text4: string
        text5: string
      }
      introPhoto: {
        data: {
          id: number
          attributes: {
            url: string
          }
        }
      }
      introVideo: {
        data: {
          id: number
          attributes: {
            url: string
          }
        }
      }
      introDescription2: {
        title: string
        text: string
      }
      aboutMission: {
        title: string
        text: string
      }
      aboutDescription: {
        title: string
        text: string
      }
      preloaderInfo: {
        id: number
        number: string
        text: string
      }
      preloaderInfo2: {
        id: number
        number: string
        text: string
      }
      preloaderInfo3: {
        id: number
        number: string
        text: string
      }
      preloaderInfo4: {
        id: number
        number: string
        text: string
      }
      Project_data: Array<{
        Name: string
        img: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
        details: Array<{
          number: string
          text: string
        }>
      }>
      Monopoly_facts: Array<{
        title: string
        descr: string
      }>
      Review_screens: {
        data: Array<{
          id: number
          attributes: {
            url: string
          }
        }>
      }
      Monopoly_blocks: Array<{
        title: string
        img: string
      }>
      introTitles: Array<{
        id: number
        text: string
      }>
      introPhotos: {
        data: Array<{
          id: number
          attributes: {
            url: string
          }
        }>
      }
      cubeSides: {
        data: Array<{
          id: number
          attributes: {
            url: string
          }
        }>
      }
      introBigPhoto: {
        data: {
          id: number
          attributes: {
            url: string
          }
        }
      }
      aboutTitles: Array<{
        id: number
        text: string
      }>
      aboutPhotos: {
        data: Array<{
          id: number
          attributes: {
            url: string
          }
        }>
      }
      person: Array<{
        id: number
        position: string
        name: string
        description: string
        face: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
      }>
      typeService: Array<{
        id: number
        name: string
        description: string
        description2: string
        photo: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
        subServices: Array<{
          id: number
          name: string
          description: string
          mark?: boolean
        }>
      }>
      workedWith: Array<{
        id: number
        brand: string
        industry: string
        logo: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
      }>
      addInfo: Array<{
        id: number
        number: string
        text: string
      }>
      projectItems: Array<{
        id: number
        year: string
        title: string
        text?: string
        client: string
        mainPhoto: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
        type: {
          data: {
            id: number
            attributes: {
              text: string
            }
          }
        }
        gallery: {
          data?: Array<{
            id: number
            attributes: {
              url: string
            }
          }>
        }
        brandPhoto: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
        summary: Array<{
          id: number
          text: string
        }>
        strategy: Array<{
          id: number
          title: string
          description: string
        }>
        results: Array<{
          id: number
          title: string
          subtitle: string
          description: string
        }>
        beforeAfter: Array<{
          id: number
          beforeTitle: string
          beforeDescription: string
          afterTitle: string
          afterDescription: string
          beforePhoto: {
            data: {
              id: number
              attributes: {
                url: string
              }
            }
          }
          afterPhoto: {
            data: {
              id: number
              attributes: {
                url: string
              }
            }
          }
        }>
        review?: {
          id: number
          text: string
          name: string
          position: string
          photo: {
            data?: {
              id: number
              attributes: {
                url: string
              }
            }
          }
        }
      }>
      feedbackInfluencers: Array<{
        id: number
        name: string
        position: string
        description: string
        photo: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
        socialLink: Array<{
          id: number
          name: string
          link: string
        }>
      }>
      feedbackBrands: Array<{
        id: number
        name: string
        position: string
        description: string
        photo: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
        socialLink: Array<{
          id: number
          name: string
          link: string
        }>
      }>
      footerTitles: Array<{
        id: number
        text: string
      }>
      privacyPolicy: {
        data: {
          id: number
          attributes: {
            url: string
          }
        }
      }
      termsUse: {
        data: {
          id: number
          attributes: {
            url: string
          }
        }
      }
      agreement: {
        data: {
          id: number
          attributes: {
            url: string
          }
        }
      }
      form: {
        id: number
        ourTime: string
        discussOptions: Array<{
          id: number
          text: string
        }>
        knowFrom: Array<{
          id: number
          text: string
        }>
        person: {
          id: number
          name: string
          position: string
          encryption: string
          photo: {
            data: {
              id: number
              attributes: {
                url: string
              }
            }
          }
        }
        thanksStatus: string
        thanksTitle: string
        thanksDescription: string
      }
      budget: {
        id: number
        perMilliseconds: string
        maxBudget: string
        tip: {
          id: number
          emoji: string
          text: string
        }
        tip2: {
          id: number
          emoji: string
          text: string
        }
        tip3: {
          id: number
          emoji: string
          text: string
        }
        tip4: {
          id: number
          emoji: string
          text: string
        }
      }
      seoBlock: {
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
          }
        }
        ogGif: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
        metaImage: {
          data: {
            id: number
            attributes: {
              url: string
            }
          }
        }
      }
    }
  }
  meta: {}
}
