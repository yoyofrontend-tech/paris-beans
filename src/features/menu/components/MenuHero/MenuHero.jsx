import { useRef } from 'react'
import { useReveal } from '@shared/hooks/useReveal'
import { srcSize } from '@shared/assets/srcSize'
import { menuImages } from '@shared/assets/images'
import '../Menu.css'

export default function MenuHero() {
  const ref = useRef(null)
  useReveal(ref, { threshold: 0.08 })

  return (
    <section className="menu-hero" ref={ref}>
      <div className="menu-hero-media">
        <img
          src={menuImages.background}
          alt="Warm Parisian café corner"
          className="menu-hero-img"
          {...srcSize(menuImages.background)}
        />
      </div>
      <div className="menu-hero-overlay" aria-hidden="true" />
      {/*
      <span className="menu-hero-word" aria-hidden="true">
        PARIS
      </span>
      */}

      <div className="menu-hero-content container">
        {/* No `reveal` here on purpose. The hero copy sits above the fold at
            every breakpoint (top=131 at 1440, top=113 at 375), so fading it in
            from opacity 0 only ever delays the LCP element: measured, the copy
            mounted at ~640ms and did not finish fading until ~1.54s, and a
            first callback that missed left it at zero opacity indefinitely.
            Below-the-fold sections keep the reveal. */}
        <div className="menu-hero-copy">
          <div className="menu-hero-lead">
            <p className="eyebrow menu-hero-eyebrow">
              <span className="menu-hero-dash" aria-hidden="true">
                —
              </span>
              ParisBeans Menu
            </p>
            {/* Plain text, no <br>: the breaks were the only thing between the
                words, and with the <br> hidden at the wider tiers the DOM read
                "Something Good,Before" - the space has to live in the markup. */}
            <h1 className="menu-hero-title">
              Something Good, Before Or After Your Appointment.
            </h1>
          </div>
          <p className="menu-hero-desc">
            From comforting coffee to simple café favourites, discover the
            offerings available at ParisBeans inside HAIR RAP BY YOYO.
          </p>
        </div>
      </div>
    </section>
  )
}