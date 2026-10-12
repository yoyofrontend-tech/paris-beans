import CallToAction from '@shared/components/CallToAction'
import { VisitHero, ContactLocation } from '@features/visit'

export default function VisitContactPage() {
  return (
    <>
      <VisitHero />
      <ContactLocation />
      <CallToAction
        baseClass="visit-cta"
        sectionClass="section"
        titleClass="section-heading"
        eyebrowAs="span"
        eyebrow="— The Paris Beans Experience"
        title={
          <>
            Make Your Next Visit a Little More Parisian.
          </>
        }
        description="Book your HAIR RAP BY YOYO appointment and enjoy your complimentary coffee at ParisBeans."
        href="#visit-contact"
        label="Book Your Salon Appointment"
      />
    </>
  )
}