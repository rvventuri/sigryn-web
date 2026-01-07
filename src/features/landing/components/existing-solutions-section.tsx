export function ExistingSolutionsSection() {
  return (
    <section className='py-24 bg-[#0B0F1A]'>
      <div className='container px-4 max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='mb-6 text-4xl sm:text-5xl font-bold text-white'>
            Why Existing Solutions Fall Short
          </h2>
        </div>

        <div className='space-y-8 max-w-2xl mx-auto'>
          <div className='p-6 rounded-lg bg-gray-800/20 border border-gray-700/30'>
            <h3 className='text-xl font-semibold text-white mb-3'>Retry logic in your code</h3>
            <p className='text-gray-300 leading-relaxed'>
              You add exponential backoff, idempotency keys, and queue workers. It helps, but you're still blind to what the provider actually sent.
            </p>
          </div>

          <div className='p-6 rounded-lg bg-gray-800/20 border border-gray-700/30'>
            <h3 className='text-xl font-semibold text-white mb-3'>Logs with TTL</h3>
            <p className='text-gray-300 leading-relaxed'>
              You check your application logs. But logs expire, and you can't see what happened before the failure.
            </p>
          </div>

          <div className='p-6 rounded-lg bg-gray-800/20 border border-gray-700/30'>
            <h3 className='text-xl font-semibold text-white mb-3'>Manual debugging</h3>
            <p className='text-gray-300 leading-relaxed'>
              You contact the provider's support, check their dashboard, and hope they have the data you need.
            </p>
          </div>

          <p className='text-center text-xl text-gray-300 pt-4'>
            These help, but they don't give you <span className='text-[#3ABFF8] font-semibold'>visibility</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

