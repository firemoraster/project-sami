const { TG_CHAT, TG_TOKEN, TG_CHAT2, TG_TOKEN2 } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  try {
    const { name, company, discuss, knowing, email, message, phone, telegram } =
      await readBody(event)

    let tg_message = ""

    tg_message += `<b>Name: </b>` + (name || "") + `\n`
    tg_message += `<b>Company Name: </b>` + (company || "") + `\n`
    tg_message += `<b>Discuss: </b>` + (discuss || "") + `\n`
    tg_message += `<b>Know From: </b>` + (knowing || "") + `\n`
    tg_message += `<b>Email: </b>` + (email || "") + `\n`
    tg_message += `<b>Phone: </b>` + (phone || "") + `\n`
    tg_message += `<b>Telegram: </b>` + (telegram || "") + `\n`
    tg_message += `<b>Message: </b>` + (message || "") + `\n`

    const TG_URL = "https://api.telegram.org/bot"

    await $fetch(TG_URL + TG_TOKEN + "/sendMessage", {
      method: "post",
      body: {
        chat_id: TG_CHAT,
        text: tg_message,
        parse_mode: "HTML",
      },
    })

    await $fetch(TG_URL + TG_TOKEN2 + "/sendMessage", {
      method: "post",
      body: {
        chat_id: TG_CHAT2,
        text: "<b>Sami Marketing</b>\n\n" + tg_message,
        parse_mode: "HTML",
      },
    })

    return {
      status: 200,
      message: "ok",
    }
  } catch (error) {
    return {
      status: 400,
      message: error,
    }
  }
})
