/**
 * Smoothly scroll the nearest scrollable ancestor of the given element to top.
 * Falls back to window if none is found.
 */
export function scrollContainerToTop(element) {
  if (!element) return;

  let el = element.parentElement;
  while (el) {
    const style = window.getComputedStyle(el);
    if (["auto", "scroll"].includes(style.overflowY)) {
      el.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    el = el.parentElement;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}
