export function sectionTransition(options: {
  title: string
  trigger: string
  container: string
}) {

  gsap.set(options.container, {
    transformOrigin: "bottom"
  })
  gsap.set(options.title, {
    transformOrigin: "top left"
  })
  gsap.to(options.container, {
    scaleY: 0.1,
    ease: "none",
    scrollTrigger: {
      trigger: options.trigger,
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
  })

  gsap.from(options.title, {
    scaleY: 0,
    ease: "none",
    scrollTrigger: {
      trigger: options.title,
      start: "top bottom",
      end: "bottom 75%",
      scrub: true,
    },
  })
}
