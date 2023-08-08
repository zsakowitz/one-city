export function autoResize(target: HTMLTextAreaElement) {
  function resize() {
    target.style.height = "0px"
    target.style.height = target.scrollHeight + 2 + "px"
  }

  resize()
  target.addEventListener("input", resize)
  target.classList.add("auto-resize")
}
