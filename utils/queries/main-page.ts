import { stringify } from "qs"

export const MainPageQuery = stringify(
  {
    fields: [
      "locale",
      "introText",
      "leftTitle",
      "rightTitle",
      "introDescription3",
      "introDescription4",
      "scratchText",
      "aboutTitle",
      "coreValue",
      "coreTitle",
      "teamTitle",
      "servicesTitle",
      "projectTitle",
      "projectDescription",
      "feedbackTitle",
      "feedbackTitle2",
      "instagram",
      "youtube",
      "telegram",
      "linkedin",
      "mail",
      "footerDescription",
    ],
    populate: {
      introSubtitle: {
        fields: ["text1", "text2", "text3", "text4"],
      },
      introDescription: {
        fields: ["text1", "text2", "text3", "text4", "text5"],
      },
      introPhoto: {
        fields: ["url"],
      },
      introDescription2: {
        fields: ["title", "text"],
      },
      aboutMission: {
        fields: ["title", "text"],
      },
      introVideo: {
        fields: ["url"],
      },
      preloaderInfo: {
        fields: ["number", "text"],
      },
      preloaderInfo2: {
        fields: ["number", "text"],
      },
      preloaderInfo3: {
        fields: ["number", "text"],
      },
      preloaderInfo4: {
        // ✅ ДОДАТИ
        fields: ["number", "text"],
      },
      Project_data: {
        fields: ["Name"],
        populate: {
          List: {
            fields: ["Title", "Number1", "Number2", "Text1", "Text2"],
          },
        },
      },
      introTitles: {
        fields: ["text"],
      },
      introPhotos: {
        fields: ["url"],
      },
      cubeSides: {
        fields: ["url"],
      },
      introBigPhoto: {
        fields: ["url"],
      },
      aboutDescription: {
        fields: ["title", "text"],
      },
      aboutTitles: {
        fields: ["text"],
      },
      aboutPhotos: {
        fields: ["url"],
      },
      person: {
        fields: ["position", "name", "description"],
        populate: {
          face: {
            fields: ["url"],
          },
        },
      },
      typeService: {
        fields: ["name", "description", "description2"],
        populate: {
          photo: {
            fields: ["url"],
          },
          subServices: {
            fields: ["name", "description", "mark"],
          },
        },
      },
      workedWith: {
        fields: ["brand", "industry"],
        populate: {
          logo: {
            fields: ["url"],
          },
        },
      },
      addInfo: {
        fields: ["number", "text"],
      },
      projectItems: {
        fields: ["year", "title", "text", "client"],
        populate: {
          mainPhoto: {
            fields: ["url"],
          },
          brandPhoto: {
            fields: ["url"],
          },
          summary: {
            fields: ["text"],
          },
          strategy: {
            fields: ["title", "description"],
          },
          results: {
            fields: ["title", "subtitle", "description"],
          },
          beforeAfter: {
            fields: [
              "beforeTitle",
              "beforeDescription",
              "afterTitle",
              "afterDescription",
            ],
            populate: {
              beforePhoto: {
                fields: ["url"],
              },
              afterPhoto: {
                fields: ["url"],
              },
            },
          },
          review: {
            fields: ["text", "name", "position", "afterDescription"],
            populate: {
              photo: {
                fields: ["url"],
              },
            },
          },
          gallery: {
            fields: ["url"],
          },
          type: {
            fields: ["text"],
          },
        },
      },
      feedbackBrands: {
        fields: ["name", "position", "description", "feedbackBrands"],
        populate: {
          photo: {
            fields: ["url"],
          },
          socialLink: {
            fields: ["name", "link"],
          },
        },
      },
      feedbackInfluencers: {
        fields: ["name", "position", "description", "feedbackBrands"],
        populate: {
          photo: {
            fields: ["url"],
          },
          socialLink: {
            fields: ["name", "link"],
          },
        },
      },
      privacyPolicy: {
        fields: ["url"],
      },
      termsUse: {
        fields: ["url"],
      },
      agreement: {
        fields: ["url"],
      },
      footerTitles: {
        fields: ["text"],
      },
      budget: {
        fields: ["maxBudget", "perMilliseconds"],
        populate: {
          tip: {
            fields: ["emoji", "text"],
          },
          tip2: {
            fields: ["emoji", "text"],
          },
          tip3: {
            fields: ["emoji", "text"],
          },
          tip4: {
            fields: ["emoji", "text"],
          },
        },
      },
      form: {
        fields: ["ourTime", "thanksStatus", "thanksTitle", "thanksDescription"],
        populate: {
          discussOptions: {
            fields: ["text"],
          },
          knowFrom: {
            fields: ["text"],
          },
          person: {
            fields: ["name", "position", "encryption"],
            populate: {
              photo: {
                fields: ["url"],
              },
            },
          },
        },
      },
      seoBlock: {
        fields: [
          "ogTitle",
          "ogDescription",
          "metaTitle",
          "metaDescription",
          "keywords",
        ],
        populate: {
          ogImage: {
            fields: ["url"],
          },
          ogGif: {
            fields: ["url"],
          },
          metaImage: {
            fields: ["url"],
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
)
