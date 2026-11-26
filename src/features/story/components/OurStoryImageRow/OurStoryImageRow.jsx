import { srcSize } from '@shared/assets/srcSize'
import { storyImages } from '@shared/assets/images'
import './OurStoryImageRow.css'

export default function OurStoryImageRow() {
  return (
    <div className="ostory-story-artwork">
      <picture className="ostory-story-img">
        <source
          media="(min-width: 1024px)"
          srcSet={storyImages.desktopStoryPage}
          {...srcSize(storyImages.desktopStoryPage)}
        />
        <img
          src={storyImages.phoneStoryPage}
          alt="Illustrated Paris Beans cup with four café moments: Pause, Sip, Connect, and Experience."
          loading="lazy"
          {...srcSize(storyImages.phoneStoryPage)}
        />
      </picture>
    </div>
  )
}
