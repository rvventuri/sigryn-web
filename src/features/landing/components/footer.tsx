import { Link } from '@tanstack/react-router'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  Product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Integrations', href: '#' },
  ],
  Company: [
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  Resources: [
    { name: 'Help Center', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Status Page', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Compliance', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' },
  ],
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@sigryn.com' },
]

export function Footer() {
  return (
    <footer className='border-t bg-background'>
      <div className='container px-4 py-12'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-6'>
          {/* Brand */}
          <div className='lg:col-span-2'>
            <Link to='/' className='flex items-center mb-4'>
              <img
                src='/images/sigryn_logo.png'
                alt='Sigryn Logo'
                className='h-8 w-auto'
              />
            </Link>
            <p className='text-sm text-muted-foreground mb-4 max-w-sm'>
              The control layer for reliable event delivery. Sigryn processes signals, validates signatures, and guarantees event delivery at scale.
            </p>
            <div className='flex gap-4'>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className='text-muted-foreground hover:text-foreground transition-colors'
                    aria-label={social.name}
                  >
                    <Icon className='h-5 w-5' />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className='font-semibold mb-4'>{category}</h4>
              <ul className='space-y-3'>
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Sigryn. All rights reserved.
          </p>
          <div className='flex gap-6 text-sm text-muted-foreground'>
            <a href='#' className='hover:text-foreground transition-colors'>
              Privacy
            </a>
            <a href='#' className='hover:text-foreground transition-colors'>
              Terms
            </a>
            <a href='#' className='hover:text-foreground transition-colors'>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

