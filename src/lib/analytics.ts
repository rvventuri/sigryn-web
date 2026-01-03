/**
 * Google Analytics event tracking helper
 */

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-EGKTCCZWEL'

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'js' | 'config',
      action: string,
      params?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent(
  eventName: string,
  eventParams?: {
    event_category?: string
    event_label?: string
    value?: number
    [key: string]: any
  }
) {
  if (typeof window === 'undefined') return

  // Check if gtag is available
  if (window.gtag) {
    try {
      window.gtag('event', eventName, eventParams)
    } catch (error) {
      console.warn('Failed to track event:', eventName, error)
    }
  } else {
    // Fallback: push to dataLayer if gtag is not yet loaded
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
      })
    } else {
      console.warn('Google Analytics not loaded. Event:', eventName, eventParams)
    }
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined') return

  // Check if gtag is available
  if (window.gtag) {
    try {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title,
      })
    } catch (error) {
      console.warn('Failed to track page view:', path, error)
    }
  } else {
    // Fallback: push to dataLayer if gtag is not yet loaded
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: path,
        page_title: title,
      })
    } else {
      console.warn('Google Analytics not loaded. Page view:', path)
    }
  }
}

/**
 * Landing page events
 */
export const landingEvents = {
  heroCtaClick: () => {
    trackEvent('hero_cta_click', {
      event_category: 'Landing Page',
      event_label: 'Start for free',
    })
  },
  heroDocsClick: () => {
    trackEvent('hero_docs_click', {
      event_category: 'Landing Page',
      event_label: 'Read docs',
    })
  },
  navbarSignInClick: () => {
    trackEvent('navbar_signin_click', {
      event_category: 'Navigation',
      event_label: 'Sign In',
    })
  },
  navbarSignUpClick: () => {
    trackEvent('navbar_signup_click', {
      event_category: 'Navigation',
      event_label: 'Get Started',
    })
  },
  navbarBlogClick: () => {
    trackEvent('navbar_blog_click', {
      event_category: 'Navigation',
      event_label: 'Blog',
    })
  },
  pricingPlanClick: (planName: string) => {
    trackEvent('pricing_plan_click', {
      event_category: 'Pricing',
      event_label: planName,
    })
  },
  pricingView: () => {
    trackEvent('pricing_view', {
      event_category: 'Landing Page',
      event_label: 'Pricing Section',
    })
  },
}

/**
 * Blog events
 */
export const blogEvents = {
  postView: (postSlug: string, postTitle: string) => {
    trackEvent('blog_post_view', {
      event_category: 'Blog',
      event_label: postTitle,
      post_slug: postSlug,
    })
  },
  postCtaClick: (postSlug: string, ctaType: 'signup' | 'signin') => {
    trackEvent('blog_post_cta_click', {
      event_category: 'Blog',
      event_label: `${postSlug}_${ctaType}`,
      cta_type: ctaType,
    })
  },
  postNavigationClick: (direction: 'next' | 'previous', postSlug: string) => {
    trackEvent('blog_post_navigation', {
      event_category: 'Blog',
      event_label: direction,
      post_slug: postSlug,
    })
  },
}

/**
 * Auth events
 */
export const authEvents = {
  signInStart: (method: 'email' | 'google') => {
    trackEvent('sign_in_start', {
      event_category: 'Authentication',
      event_label: method,
      method,
    })
  },
  signInSuccess: (method: 'email' | 'google') => {
    trackEvent('sign_in_success', {
      event_category: 'Authentication',
      event_label: method,
      method,
    })
  },
  signInError: (method: 'email' | 'google', errorMessage?: string) => {
    trackEvent('sign_in_error', {
      event_category: 'Authentication',
      event_label: method,
      method,
      error_message: errorMessage,
    })
  },
  signUpStart: (method: 'email' | 'google') => {
    trackEvent('sign_up_start', {
      event_category: 'Authentication',
      event_label: method,
      method,
    })
  },
  signUpSuccess: (method: 'email' | 'google') => {
    trackEvent('sign_up_success', {
      event_category: 'Authentication',
      event_label: method,
      method,
    })
  },
  signUpError: (method: 'email' | 'google', errorMessage?: string) => {
    trackEvent('sign_up_error', {
      event_category: 'Authentication',
      event_label: method,
      method,
      error_message: errorMessage,
    })
  },
  googleAuthClick: (mode: 'signin' | 'signup') => {
    trackEvent('google_auth_click', {
      event_category: 'Authentication',
      event_label: mode,
      mode,
    })
  },
}

