import { SigrynLogo } from '@/assets/sigryn-logo'

export function MinimalFooter() {
  return (
    <footer className='border-t border-gray-200 bg-white'>
      <div className='container px-4 py-12 max-w-4xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <SigrynLogo className='h-6 w-auto text-gray-900' />
            <p className='text-sm text-gray-500'>
              Webhook Observability & Retry Platform
            </p>
          </div>
          <a
            href='#'
            className='text-sm text-gray-500 hover:text-gray-700 transition-colors'
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
