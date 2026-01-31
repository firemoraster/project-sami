export function useSplitText(elements: string) {
  const text = document.querySelectorAll(elements)
  const { words } = new SplitText(text, {
    type: "words",
    wordsClass: "word-wrap",
    tag: "span"
  })

  words.forEach((word) => {
    const inner = document.createElement("span")
    inner.classList.add("word-anim")
    inner.textContent = word.textContent

    word.textContent = ""
    word.appendChild(inner)

    gsap.set(word, {
      paddingRight: "0.2rem",
      overflow: "hidden",
      display: "inline-flex",
    })
  })
}
