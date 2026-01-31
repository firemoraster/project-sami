import { gsap } from "gsap"
import {
  ScrollTrigger,
  ScrollToPlugin,
  CustomEase,
  SplitText,
  Draggable,
  ScrambleTextPlugin,
} from "gsap/all"

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    CustomEase,
    SplitText,
    Draggable,
    ScrambleTextPlugin,
  )

  CustomEase.create("default-ease", "0.24, 1, 0.36, 1")

  gsap.defaults({ ease: "default-ease" })
})
