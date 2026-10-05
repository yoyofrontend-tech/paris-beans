import { useState } from 'react'
import { menuCategories } from '@shared/models/siteData'
import CallToAction from '@shared/components/CallToAction'
import { MenuHero, MenuCategories, MenuSpecialty, MenuCafe } from '@features/menu'

export default function MenuPage() {
  const [activeId, setActiveId] = useState(menuCategories[0].id)
  const category = menuCategories.find((c) => c.id === activeId) ?? menuCategories[0]

  return (
    <>
      <MenuHero />
      <MenuCategories activeId={activeId} onSelect={setActiveId} />
      <MenuSpecialty category={category} />
      <MenuCafe />
      <CallToAction
        baseClass="menu-cta"
        threshold={0.08}
        eyebrow="— The Paris Beans Experience"
        title={
          <>
            Your Table Is Waiting.
          </>
        }
        description="It is a small Parisian ritual built into your HAIR RAP BY YOYO experience."
        href="/visit-contact"
        label="Book Your Salon Appointment"
      />
    </>
  )
}