import { useRef } from 'react'
import { useReveal } from '@shared/hooks/useReveal'
import { srcSize } from '@shared/assets/srcSize'
import Button from '@shared/components/Button'
import { storyImages } from '@shared/assets/images'
import './StorySection.css'

const storySlides = [
  { src: storyImages.rectangle72, alt: 'The Paris Beans café counter' },
  { src: storyImages.rectangle71, alt: 'A guest raising a glass at the café counter' },
  { src: storyImages.rectangle69, alt: 'A cocktail garnished with lemon' },
]

export default function StorySection() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="story" className="section story" ref={ref}>
      <div className="story-grid container">
        {/* Left — text */}
        <div className="story-copy">
          <div className="pb-story-eyebrow eyebrow reveal">— OUR STORY</div>
          <h2 className="story-title reveal reveal-delay-1">
            Inspired By Paris
            <br />
            <em>Streets.</em> Created For
            <br />
            Your <em>Salon Day.</em>
          </h2>
          <p className="lead story-paragraph reveal reveal-delay-2">
            Born from a love for the café culture of Paris, ParisBeans
            brings the rhythm of a street-side coffee break into the heart of
            HAIR RAP BY YOYO.
          </p>
          <div className="story-cta reveal reveal-delay-3">
            {/* Cup + croissant line art, desktop and tablet only. Anchored to the
                button row so its steam always sits just above the button. */}
            <img
              className="home-story-deco"
              src={storyImages.decoCupCroissant}
              alt=""
              aria-hidden="true"
            />
            <Button href="/story" variant="primary" arrow>
              Read Our Story
            </Button>
          </div>
        </div>

        <div
          className="story-media reveal reveal-delay-1"
          role="group"
          aria-label="Paris Beans story gallery"
        >
          <div className="story-image-stack">
            {storySlides.map(({ src, alt }) => (
              <img key={src} className="story-image-card" src={src} alt={alt} {...srcSize(src)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
