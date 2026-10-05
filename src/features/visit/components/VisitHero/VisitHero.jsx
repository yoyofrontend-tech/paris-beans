import { useRef } from 'react'
import { useReveal } from '@shared/hooks/useReveal'
import { heroImages } from '@shared/assets/images'
import '../VisitContact.css'

export default function VisitHero() {
  const ref = useRef(null)
  useReveal(ref, { threshold: 0.12 })

  return (
    <section className="visit-hero" ref={ref}>
      <div className="visit-hero-media">
        <img
          src={heroImages.salonInterior}
          alt="Paris Beans salon interior"
          className="visit-hero-img"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1280}
        />
        <div className="visit-hero-overlay" />
      </div>

      <span className="visit-hero-word" aria-hidden="true">
        PARIS
      </span>

      <div className="visit-hero-content container">
        <div className="visit-hero-copy reveal">
          {/* Grouped so the phone tier can hold the label and heading at the top
              of the card and pin the paragraph to the bottom with one
              space-between, instead of three independent blocks. */}
          <div className="visit-hero-lead">
            <span className="eyebrow visit-hero-eyebrow">
              <span className="visit-hero-dash" aria-hidden="true">
                —
              </span>
              Visit ParisBeans
            </span>
            <h1 className="visit-hero-title">
              Find Your Little Corner of <em>Paris.</em>
            </h1>
          </div>
          <p className="visit-hero-desc">
            Paris Beans is located inside HAIR RAP BY YOYO, bringing a
            Paris-inspired café experience directly into your salon visit.
          </p>
        </div>
      </div>
    </section>
  )
}
