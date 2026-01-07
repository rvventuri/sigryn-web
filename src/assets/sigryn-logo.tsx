import { type SVGProps } from 'react'
import { cn } from '@/lib/utils'

export function SigrynLogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 200 40'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      className={cn('h-10 w-auto', className)}
      {...props}
    >
      <title>Sigryn - Webhook Reliability Platform</title>
      
      {/* Text: Sigryn */}
      <text
        x='0'
        y='28'
        fontSize='24'
        fontWeight='700'
        fill='currentColor'
        className='text-foreground font-bold tracking-tight'
        fontFamily='system-ui, -apple-system, sans-serif'
        letterSpacing='-0.5px'
      >
        Sigryn
      </text>
    </svg>
  )
}

// Compact version for smaller spaces (icon only - just the S)
export function SigrynLogoIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 40 40'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      className={cn('h-10 w-10', className)}
      {...props}
    >
      <title>Sigryn</title>
      
      {/* Just the S letter */}
      <text
        x='8'
        y='28'
        fontSize='24'
        fontWeight='700'
        fill='currentColor'
        className='text-foreground font-bold'
        fontFamily='system-ui, -apple-system, sans-serif'
      >
        S
      </text>
    </svg>
  )
}
