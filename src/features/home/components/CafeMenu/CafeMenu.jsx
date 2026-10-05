import { useRef } from 'react'
import { menuItems } from '@shared/models/siteData'
import { srcSize } from '@shared/assets/srcSize'
import { menuDeco } from '@shared/assets/images'
import { useReveal } from '@shared/hooks/useReveal'
import Button from '@shared/components/Button'
import './CafeMenu.css'

export default function CafeMenu() {
  const ref = useRef(null)
  useReveal(ref, { threshold: 0.08 })

  // The card block is a plain CSS grid of 4-up cards (see CafeMenu.css): no
  // carousel state, no pointer-drag translation and no width-dependent
  // breakpoint in JavaScript. Eight cards, two rows, at every tier.
  return (
    <section id="menu" className="cafe" ref={ref}>
      {/* Corner art — decorative only. Direct children of the section, before the
          content, at z-index 0; the text and cards sit at z-index 1. The section's
          overflow: hidden crops both against the screen edge. */}
      <img
        src={menuDeco.topLeft}
        alt=""
        aria-hidden="true"
        className="home-menu-deco home-menu-deco--tl"
      />
      <img
        src={menuDeco.bottomRight}
        alt=""
        aria-hidden="true"
        className="home-menu-deco home-menu-deco--br"
      />

      <div className="container">
        <div className="cafe-grid">
          {/* Left — text */}
          <div className="cafe-copy">
            <div className="cafe-copy-inner">
              <p className="eyebrow reveal">— From the Café</p>
              <h2 className="cafe-title reveal reveal-delay-1">
                Coffee, <em>Breakfast</em> &amp; Little <em>Indulgences.</em>
              </h2>
              <p className="lead cafe-paragraph reveal reveal-delay-2">
                Discover a simple, satisfying café offering curated for the moments
                around your appointment.
              </p>
            </div>
            <div className="cafe-cta reveal reveal-delay-3">
              <Button href="/menu" variant="primary" arrow>
                View the Menu
              </Button>
            </div>
          </div>

          {/* Right — the editorial image grid */}
          <div className="cafe-grid-right">
            <div className="menu-grid">
              <div className="cafe-slider-track">
                {menuItems.map((item, i) => (
                  <figure className="menu-item reveal" style={{ '--i': i }} key={item.title}>
                    <span className="menu-accent" aria-hidden="true" />
                    <div className="menu-thumb">
                      {/* Eager, not lazy: this grid sits ~2700px down the home
                          page, so Chrome's lazy threshold never reached the two
                          cards in the last row and they rendered as empty
                          white boxes until the page was scrolled. */}
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="eager"
                        decoding="async"
                        {...srcSize(item.image)}
                      />
                    </div>
                    <figcaption className="menu-caption">
                      <span className="menu-dot" aria-hidden="true" />
                      {item.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}