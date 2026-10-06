import { srcSize } from '@shared/assets/srcSize'
import { storyImages } from '@shared/assets/images'
import './OurStoryImageRow.css'

export default function OurStoryImageRow() {
  return (
    <div className="ostory-story-img">
      <picture>
        {/* <source> takes no width/height — those are not valid attributes on
            it. The dimensions belong on the <img> below, which is the element
            the browser lays out. The three sources sit on the canonical
            edges, so each one serves exactly the tier its aspect ratio was
            cropped for (0.949 / 1.230 / 2.061): swapping at the tier edge
            changes the row's height by design, and by a whole tier at a
            time rather than at stray widths.

            <picture> picks the first source whose media query matches, so the
            sources are listed largest-first with the site's own breakpoints
            only (min-width: 641 / 1024). The trailing source has no media
            query at all, so it is the fall-through for the phone tier and
            nothing has to be written as max-width. */}
        <source
          srcSet={storyImages.img}
          media="(min-width: 1024px)"
        />
        <source
          srcSet={storyImages.tabletStory}
          media="(min-width: 641px)"
        />
        <source
          srcSet={storyImages.phoneStoryPage}
        />
        <img
          src={storyImages.img}
          alt="Paris Beans story image"
          loading="lazy"
          {...srcSize(storyImages.img)}
        />
      </picture>
    </div>
  )
}