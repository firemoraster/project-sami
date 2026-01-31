export function parallaxImage(options: { percents: number[]; elements: string }) {
  const items = document.querySelectorAll(options.elements)

  const percent = options.percents

  items.forEach((el, i) => {
    gsap.to(el, {
      yPercent: percent[i],
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  })
}
