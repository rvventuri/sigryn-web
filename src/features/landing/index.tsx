import { Hero } from './components/hero'
import { Features } from './components/features'
import { Benefits } from './components/benefits'
import { SocialProof } from './components/social-proof'
import { Pricing } from './components/pricing'
import { Footer } from './components/footer'
import { Navbar } from './components/navbar'

export function LandingPage() {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Navbar />
      <main className='flex-1'>
        <Hero />
        <Features />
        <Benefits />
        <SocialProof />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

