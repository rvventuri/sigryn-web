import { HeroSection } from './components/hero-section'
import { ProblemSection } from './components/problem-section'
import { SolutionSection } from './components/solution-section'
import { FeaturesGridSection } from './components/features-grid-section'
import { CtaSection } from './components/cta-section'
import { MinimalNavbar } from './components/minimal-navbar'
import { MinimalFooter } from './components/minimal-footer'
import { StructuredData } from './components/structured-data'

export function LandingPage() {
  return (
    <>
      <StructuredData />
      <div className='flex min-h-screen flex-col bg-white'>
        <MinimalNavbar />
        <main className='flex-1'>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <FeaturesGridSection />
          <CtaSection />
        </main>
        <MinimalFooter />
      </div>
    </>
  )
}
