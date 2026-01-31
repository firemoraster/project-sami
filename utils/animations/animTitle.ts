export function animTitle(options: { trigger: string; elements: string }) {
  gsap.fromTo(
    options.elements,
    {
      yPercent: 105,
    },
    {
      yPercent: 0,
      stagger: 0.125,
      delay: 0.125,
      duration: 0.8,
      clearProps: "all",
      scrollTrigger: {
        trigger: options.trigger,
        start: "top bottom",
      },
    }
  )
}
