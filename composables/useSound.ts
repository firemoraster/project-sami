export function useSound() {
  const { isMobile } = useViewport()

  const playSound = (src: string) => {
    if (isMobile.value) return

    const audio = new Audio(src)
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  return {
    playHoverSound: () => playSound('/sounds/hover.mp3'),
    playClickSound: () => playSound('/sounds/click.mp3'),
  }
}
