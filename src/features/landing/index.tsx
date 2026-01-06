import { HeroPain } from './components/hero-pain'
import { SolutionHero } from './components/solution-hero'
import { FeaturesTech } from './components/features-tech'
import { HowItWorksTech } from './components/how-it-works-tech'
import { Pricing } from './components/pricing'
import { Footer } from './components/footer'
import { Navbar } from './components/navbar'
import { StructuredData } from './components/structured-data'

export function LandingPage() {
  return (
    <>
      <StructuredData />
      <div className='flex min-h-screen flex-col bg-background'>
        <Navbar />
        <main className='flex-1'>
          <HeroPain />
          <SolutionHero />
          <FeaturesTech />
          <HowItWorksTech />
          <Pricing />
        </main>
        <Footer />
      </div>
    </>
  )
}

