import { MarketingHeader } from "@/src/components/marketing/header"
import { MarketingHero } from "@/src/components/marketing/hero"
import { MarketingBrands } from "@/src/components/marketing/brand"
import { MarketingFeatures } from "@/src/components/marketing/feature"
import { MarketingWorking } from "@/src/components/marketing/working"
import { MarketingTestimonials } from "@/src/components/marketing/testimonial"
import { MarketingPricing } from "@/src/components/marketing/pricing"
import { MarketingCta } from "@/src/components/marketing/cta"
import { MarketingFooter } from "@/src/components/marketing/footer"

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <MarketingHeader />
      <main className="flex-grow">
        <MarketingHero />
        <MarketingBrands />
        <MarketingFeatures />
        <MarketingWorking />
        <MarketingTestimonials />
        <MarketingPricing />
        <MarketingCta />
      </main>
      <MarketingFooter />
    </div>
  )
}
