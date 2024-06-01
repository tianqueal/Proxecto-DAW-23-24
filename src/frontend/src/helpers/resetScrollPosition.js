export const resetScrollPosition = () => {
  window.scrollTo(0, 0)
  // Not supported in Safari
  // window.scrollTo({ top: 0, behavior: 'smooth' })
}
