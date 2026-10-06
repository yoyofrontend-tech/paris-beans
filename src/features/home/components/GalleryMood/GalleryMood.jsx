import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@shared/hooks/useReveal'
import { useCarousel } from '@shared/hooks/useCarousel'
import { gallery, galleryImages, galleryDims } from '@shared/models/siteData'
import Button from '@shared/components/Button'
import './GalleryMood.css'

// How deep the coverflow arc goes per tier. The same ladder lives in
// GalleryMood.css as --gallery-visible (3 / 5 / 7), one per media query. CSS
// owns it; this module reads the value off the DOM so the state classes and the
// arc geometry can never disagree about a breakpoint. The three edges below are
// the only width edges in the Home carousel.
const VISIBLE_BREAKPOINTS = [
  { edge: 1920, visible: 7 },
  { edge: 1024, visible: 7 },
  { edge: 641, visible: 5 },
]

const visibleForWidth = (width) => {
  for (const { edge, visible } of VISIBLE_BREAKPOINTS) {
    if (width >= edge) return visible
  }
  return 3
}

export default function GalleryMood() {
  const ref = useRef(null)
  const stageRef = useRef(null)
  const dragRef = useRef({ x: 0, dragging: false, moved: false })
  const [visible, setVisible] = useState(3)
  useReveal(ref, { selector: '.reveal', threshold: 0.08 })
  const carousel = useCarousel({ itemCount: gallery.length, interval: 4500 })

  const n = gallery.length

  // Read --gallery-visible from the stylesheet instead of duplicating the
  // breakpoints in JS, and keep it in step on resize.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const read = () => {
      const raw = getComputedStyle(el).getPropertyValue('--gallery-visible').trim()
      const fromCss = Number.parseInt(raw, 10)
      setVisible(Number.isFinite(fromCss) ? fromCss : visibleForWidth(window.innerWidth))
    }
    read()
    window.addEventListener('resize', read, { passive: true })
    return () => window.removeEventListener('resize', read)
  }, [])

  const half = Math.floor(n / 2)

  const offset = (i) => {
    let d = i - carousel.active
    if (d > half) d -= n
    if (d < -half) d += n
    return d
  }

  // --gallery-visible counts the whole arc, so the deepest visible slot is
  // (visible - 1) / 2 steps out. Everything past that is parked as hidden-*.
  const stateClass = (d) => {
    const depth = Math.floor((visible - 1) / 2)
    const step = Math.abs(d)
    const side = d < 0 ? 'left' : 'right'
    if (d === 0) return 'center'
    if (step > depth) return `hidden-${side}`
    if (step === 1) return side
    if (step === 2) return `mid-${side}`
    return `far-${side}`
  }

  const advance = (dir) => carousel.go(dir)

  const onPointerDown = (e) => {
    dragRef.current = { x: e.clientX, y: e.clientY, dragging: true, moved: false }
    carousel.pause()
  }

  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d.dragging) return
    if (Math.abs(e.clientX - d.x) > 8) d.moved = true
  }

  const onPointerUp = (e) => {
    const d = dragRef.current
    if (!d.dragging) return
    d.dragging = false
    const dx = e.clientX - d.x
    if (d.moved && Math.abs(dx) > 40) advance(dx < 0 ? 1 : -1)
    carousel.resume()
  }

  return (
    <section
      id="gallery"
      className="gallery"
      ref={ref}
      onFocus={carousel.pause}
      onBlur={carousel.resume}
    >
      <div className="container">
        <div className="section-header--center gallery-head reveal">
          <p className="eyebrow">— The ParisBeans Mood</p>
          <h2 className="gallery-title">
            A Corner of <em>Paris,</em> Inside
            <br className="gallery-break" />
            <em>HAIR RAP BY YOYO.</em>
          </h2>
          <p className="lead gallery-desc">
            Paris-inspired details, warm coffee, beautiful surroundings and the
            little moments that make your salon visit feel different.
          </p>
        </div>
      </div>

      {/* Auto carousel — Polaroid slides travel an arc through the centre */}
      <div
        className="gallery-stage reveal reveal-delay-1"
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Gallery slideshow — use the left and right arrow keys to move"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            carousel.pause()
            carousel.go(-1)
          } else if (e.key === 'ArrowRight') {
            e.preventDefault()
            carousel.pause()
            carousel.go(1)
          }
        }}
        onMouseEnter={carousel.pause}
        onMouseLeave={() => {
          dragRef.current.dragging = false
          dragRef.current.moved = false
          carousel.resume()
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="carousel">
          {gallery.map((img, i) => {
            const state = stateClass(offset(i))
            const dims = galleryDims[img.key]
            return (
              <button
                key={img.key}
                type="button"
                className={`carousel-item ${state}`}
                aria-label={img.alt}
                onClick={() => {
                  if (dragRef.current.moved) {
                    dragRef.current.moved = false
                    return
                  }
                  carousel.setActive(i)
                }}
              >
                <div className="polaroid">
                  <div className="polaroid-photo">
                    <img
                      src={galleryImages[img.key]}
                      alt=""
                      aria-hidden="true"
                      width={dims.width}
                      height={dims.height}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="gallery-meta container reveal reveal-delay-2">
        <p
          className="gallery-caption"
          key={gallery[carousel.active].key}
          aria-live="polite"
        >
          {gallery[carousel.active].alt}
        </p>
        <div className="gallery-dots" role="group" aria-label="Gallery slideshow">
          {gallery.map((img, i) => (
            <button
              key={img.key}
              type="button"
              className={`gallery-dot${i === carousel.active ? ' is-active' : ''}`}
              aria-label={`Go to slide: ${img.alt}`}
              aria-current={i === carousel.active}
              onClick={() => {
                carousel.setActive(i)
                carousel.resume()
              }}
            />
          ))}
        </div>
      </div>

      <div className="gallery-cta container reveal reveal-delay-2">
        <Button href="/gallery" variant="primary" arrow>
          See the Gallery
        </Button>
      </div>
    </section>
  )
}