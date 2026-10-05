import { useEffect, useRef } from 'react'

export function useReveal(ref, options = {}) {
  const { selector = '.reveal', threshold = 0.12, rootMargin, onReveal } = options
  const callbackRef = useRef(onReveal)

  useEffect(() => {
    callbackRef.current = onReveal
  }, [onReveal])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const nodes = Array.from(el.querySelectorAll(selector))
    if (!nodes.length) return

    const reveal = (node) => {
      if (node.classList.contains('is-visible')) return
      node.classList.add('is-visible')
      callbackRef.current?.(node)
    }

    const isOnScreen = (node) => {
      const r = node.getBoundingClientRect()
      return r.bottom > 0 && r.top < window.innerHeight
    }

    const sweep = () => nodes.forEach((n) => { if (isOnScreen(n)) reveal(n) })

    /* Without IntersectionObserver there is nothing to gate on, and the
       `.reveal { opacity: 0 }` base rule would hide every target for good. */
    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach(reveal)
      return
    }

    const ioOptions = { threshold }
    if (rootMargin) ioOptions.rootMargin = rootMargin

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target)
        })
      },
      ioOptions
    )

    nodes.forEach((n) => io.observe(n))

    /* The observer's first callback can land before layout and webfonts settle
       and report ratio 0, and it will not fire again until the ratio crosses
       the threshold — which for an already-on-screen element it never does.
       Reading the rects directly makes the initial state deterministic
       instead of dependent on when that first callback happens to arrive. */
    sweep()

    /* Font swap and image decode both change heights after mount, which moves
       elements across the threshold and can expose a target the first sweep
       judged off-screen. */
    document.fonts?.ready?.then(sweep).catch(() => {})
    window.addEventListener('load', sweep, { once: true })

    const timers = [120, 400, 900, 1600].map((ms) => setTimeout(sweep, ms))

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('load', sweep)
      io.disconnect()
    }
  }, [selector, threshold, rootMargin, ref])
}