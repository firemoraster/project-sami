import Lenis from "@studio-freight/lenis"

export function useLockScroll(value: boolean = true) {
  const lenis = useState<Lenis>("lenis")
  value ? lenis.value.stop() : lenis.value.start()
}
