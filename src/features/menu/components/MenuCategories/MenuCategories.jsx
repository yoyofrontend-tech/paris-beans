import { useCallback, useEffect, useRef, useState } from 'react'
import { cafeMenus } from '@shared/models/cafeMenus'
import '../Menu.css'

export default function MenuCategories({ menu, activeId, onMenuSelect, onSelect }) {
  const railRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const [scroll, setScroll] = useState({ overflow: false, hasPrevious: false, hasNext: false })

  const updateScroll = useCallback(() => {
    const rail = railRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!rail || !viewport || !track) return

    const overflow = track.scrollWidth > rail.clientWidth + 1
    const hasPrevious = viewport.scrollLeft > 1
    const hasNext = viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1

    setScroll((current) =>
      current.overflow === overflow && current.hasPrevious === hasPrevious && current.hasNext === hasNext
        ? current
        : { overflow, hasPrevious, hasNext }
    )
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    viewport.scrollLeft = 0
    updateScroll()

    const observer = new ResizeObserver(updateScroll)
    observer.observe(railRef.current)
    observer.observe(viewport)
    observer.observe(trackRef.current)
    return () => observer.disconnect()
  }, [menu.id, updateScroll])

  function scrollCategories(direction) {
    const viewport = viewportRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    viewport.scrollBy({ left: direction * viewport.clientWidth * 0.8, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <section className="menu-cats" aria-label="Café menus">
      <div className="container">
        <div className="menu-editions" data-active-menu={menu.id} role="group" aria-label="Choose a café menu">
          {cafeMenus.map((option) => (
            <button
              type="button"
              key={option.id}
              className="menu-edition"
              aria-pressed={option.id === menu.id}
              onClick={() => onMenuSelect(option)}
            >
              {option.label}
            </button>
          ))}
          <span className="menu-edition-indicator" aria-hidden="true" />
        </div>

        <div className="menu-cats-rail" ref={railRef}>
          <button
            type="button"
            className="menu-cats-arrow"
            aria-label="Scroll categories left"
            aria-controls="menu-category-tabs"
            hidden={!scroll.overflow}
            disabled={!scroll.hasPrevious}
            onClick={() => scrollCategories(-1)}
          />
          <nav
            className="menu-cats-tabs"
            id="menu-category-tabs"
            aria-label={`${menu.label} categories`}
            ref={viewportRef}
            onScroll={updateScroll}
          >
            <div className="menu-cats-track" ref={trackRef}>
              {menu.categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className="menu-tab"
                  aria-pressed={category.id === activeId}
                  aria-controls="menu-category-panel"
                  onClick={() => onSelect(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </nav>
          <button
            type="button"
            className="menu-cats-arrow menu-cats-arrow--next"
            aria-label="Scroll categories right"
            aria-controls="menu-category-tabs"
            hidden={!scroll.overflow}
            disabled={!scroll.hasNext}
            onClick={() => scrollCategories(1)}
          />
        </div>

        <div className="menu-cats-divider" aria-hidden="true" />
      </div>
    </section>
  )
}
