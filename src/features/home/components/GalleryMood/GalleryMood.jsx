import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@shared/hooks/useReveal'
import { useCarousel } from '@shared/hooks/useCarousel'
import Button from '@shared/components/Button'
import './GalleryMood.css'

const reels = [
  { src: '/videos/Video-13993.mp4', label: 'Coffee and café moments at Paris Beans' },
  { src: '/videos/Video-23260.mp4', label: 'Café service during a salon visit' },
  { src: '/videos/Video-56815.mp4', label: 'Refreshments in the salon' },
  { src: '/videos/Video-10176.mp4', label: 'Guests enjoying the café' },
  { src: '/videos/Video-67258.mp4', label: 'Behind the scenes at HAIR RAP BY YOYO' },
  { src: '/videos/Video-56962.mp4', label: 'A visit to HAIR RAP BY YOYO' },
  { src: '/videos/Video-25492.mp4', label: 'Inside the salon' },
]

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

function ReelVideo({ src, shown, playing }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (playing) video.play().catch(() => {})
    else video.pause()
  }, [playing])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay={playing}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload={shown ? 'metadata' : 'none'}
      aria-hidden="true"
    />
  )
}

export default function GalleryMood() {
  const ref = useRef(null)
  const stageRef = useRef(null)
  const dragRef = useRef({ x: 0, dragging: false, moved: false })
  const [visible, setVisible] = useState(3)
  const [playback, setPlayback] = useState({ entered: false, active: false })
  useReveal(ref, { selector: '.reveal', threshold: 0.08 })
  const carousel = useCarousel({ itemCount: reels.length, interval: 4500, autoPlay: playback.active })

  const n = reels.length

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inView = typeof IntersectionObserver === 'undefined'
    const sync = () => {
      setPlayback((previous) => ({
        entered: previous.entered || inView,
        active: inView && !document.hidden && !motion.matches,
      }))
    }
    const observer = inView ? null : new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      sync()
    })

    observer?.observe(stageRef.current)
    document.addEventListener('visibilitychange', sync)
    motion.addEventListener('change', sync)
    sync()

    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', sync)
      motion.removeEventListener('change', sync)
    }
  }, [])

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
            {' '}
            <em>HAIR RAP BY YOYO.</em>
          </h2>
          <p className="lead gallery-desc">
            Paris-inspired details, warm coffee, beautiful surroundings and the
            little moments that make your salon visit feel different.
          </p>
        </div>
      </div>

      {/* Reels travel the same arc through the centre. */}
      <div
        className="gallery-stage reveal reveal-delay-1"
        ref={stageRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Gallery reels — use the left and right arrow keys to move"
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
          {reels.map((reel, i) => {
            const state = stateClass(offset(i))
            const shown = !state.startsWith('hidden-')
            return (
              <button
                key={reel.src}
                type="button"
                className={`carousel-item ${state}`}
                aria-label={reel.label}
                tabIndex={shown ? 0 : -1}
                aria-hidden={!shown}
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
                    <ReelVideo src={playback.entered ? reel.src : undefined} shown={shown} playing={shown && playback.active} />
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
          key={reels[carousel.active].src}
          aria-live="polite"
        >
          {reels[carousel.active].label}
        </p>
        <div className="gallery-dots" role="group" aria-label="Choose a gallery reel">
          {reels.map((reel, i) => (
            <button
              key={reel.src}
              type="button"
              className={`gallery-dot${i === carousel.active ? ' is-active' : ''}`}
              aria-label={`Go to reel: ${reel.label}`}
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
