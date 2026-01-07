import { ArrowRight } from 'lucide-react'

export function CoreIdeaSection() {
  return (
    <section id='how-it-works' className='py-24 bg-[#0E1325]'>
      <div className='container px-4 max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='mb-6 text-4xl sm:text-5xl font-bold text-white'>
            The Core Idea
          </h2>
        </div>

        <div className='space-y-8 max-w-2xl mx-auto mb-16'>
          <p className='text-lg text-gray-300 leading-relaxed'>
            Sigryn is a <span className='text-[#3ABFF8] font-semibold'>webhook gateway</span>—a single reliable layer between providers and your API.
          </p>
          <p className='text-lg text-gray-300 leading-relaxed'>
            No changes to your business logic. No code rewrites. Just point your webhooks to Sigryn, and Sigryn delivers them to your endpoints.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className='max-w-3xl mx-auto mb-16'>
          <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8'>
            {/* Provider */}
            <div className='px-6 py-4 rounded-lg bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm'>
              <div className='text-center'>
                <div className='text-2xl mb-2'>🔌</div>
                <span className='text-sm font-semibold text-gray-200'>Provider</span>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className='h-6 w-6 text-[#3ABFF8] hidden md:block' />
            <div className='md:hidden rotate-90'>
              <ArrowRight className='h-6 w-6 text-[#3ABFF8]' />
            </div>

            {/* Sigryn */}
            <div className='px-6 py-4 rounded-lg bg-[#3ABFF8]/10 border-2 border-[#3ABFF8]/30 backdrop-blur-sm'>
              <div className='text-center'>
                <span className='text-lg font-bold text-[#3ABFF8]'>Sigryn</span>
                <div className='mt-2 text-xs text-gray-400'>
                  Gateway layer
                </div>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className='h-6 w-6 text-[#3ABFF8] hidden md:block' />
            <div className='md:hidden rotate-90'>
              <ArrowRight className='h-6 w-6 text-[#3ABFF8]' />
            </div>

            {/* Your API */}
            <div className='px-6 py-4 rounded-lg bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm'>
              <div className='text-center'>
                <div className='text-2xl mb-2'>🚀</div>
                <span className='text-sm font-semibold text-gray-200'>Your API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

