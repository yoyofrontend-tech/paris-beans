import { useState } from 'react'
import { cafeMenus } from '@shared/models/cafeMenus'
import CallToAction from '@shared/components/CallToAction'
import { MenuHero, MenuCategories, MenuSpecialty } from '@features/menu'

export default function MenuPage() {
  const [menu, setMenu] = useState(cafeMenus[0])
  const [activeId, setActiveId] = useState(menu.categories[0].id)
  const category = menu.categories.find((item) => item.id === activeId) ?? menu.categories[0]

  function selectMenu(nextMenu) {
    if (nextMenu.id === menu.id) return
    setMenu(nextMenu)
    setActiveId(nextMenu.categories[0].id)
  }

  return (
    <>
      <MenuHero />
      <MenuCategories menu={menu} activeId={category.id} onMenuSelect={selectMenu} onSelect={setActiveId} />
      <MenuSpecialty category={category} />
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
