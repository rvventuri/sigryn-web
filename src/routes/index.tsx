import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '@/features/landing'

export const Route = createFileRoute('/')({
  component: LandingPage,
  head: () => ({
    title: 'Sigryn - Never Lose a Webhook Again | Webhook Reliability & Observability Platform',
    meta: [
      {
        name: 'description',
        content:
          'Webhooks fail silently in production. Providers say "delivered" but nothing reaches your system. Sigryn provides complete webhook observability, automatic retries, and delivery guarantees. Built for developers who can\'t afford to lose events.',
      },
      {
        name: 'keywords',
        content:
          'webhook reliability, webhook observability, webhook monitoring, webhook retry, webhook delivery, webhook infrastructure, webhook debugging, webhook history, webhook replay, webhook alerts, webhook management, event delivery, webhook failures, webhook tracking, webhook queue, webhook platform, webhook service, API webhooks, webhook debugging tools, webhook monitoring tools',
      },
      {
        property: 'og:title',
        content: 'Sigryn - Never Lose a Webhook Again | Webhook Reliability & Observability',
      },
      {
        property: 'og:description',
        content:
          'Webhooks fail silently in production. Providers say "delivered" but nothing reaches your system. Sigryn provides complete webhook observability, automatic retries, and delivery guarantees.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://sigryn.com',
      },
      {
        property: 'og:image',
        content: 'https://sigryn.com/images/og-image.png',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: 'Sigryn - Never Lose a Webhook Again | Webhook Reliability Platform',
      },
      {
        name: 'twitter:description',
        content:
          'Webhooks fail silently in production. Sigryn provides complete webhook observability, automatic retries, and delivery guarantees. Built for developers.',
      },
      {
        name: 'twitter:image',
        content: 'https://sigryn.com/images/og-image.png',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'article:author',
        content: 'Sigryn Team',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://sigryn.com',
      },
    ],
  }),
})

