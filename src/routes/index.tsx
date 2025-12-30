import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '@/features/landing'

export const Route = createFileRoute('/')({
  component: LandingPage,
  head: () => ({
    title: 'Sigryn - Never Lose a Webhook Again | Reliable Event Delivery Infrastructure',
    meta: [
      {
        name: 'description',
        content:
          'Sigryn is the control layer for reliable event delivery. Process webhooks, validate signatures, queue events, and guarantee delivery with enterprise-grade reliability. Zero infrastructure needed.',
      },
      {
        name: 'keywords',
        content:
          'webhook, webhooks, event delivery, webhook infrastructure, webhook management, webhook queue, webhook retry, webhook monitoring, event-driven architecture, webhook reliability, webhook delivery, webhook routing, webhook transformation, webhook debugging, webhook observability, API webhooks, webhook service, webhook platform',
      },
      {
        property: 'og:title',
        content: 'Sigryn - Never Lose a Webhook Again | Reliable Event Delivery Infrastructure',
      },
      {
        property: 'og:description',
        content:
          'Sigryn is the control layer for reliable event delivery. Process webhooks, validate signatures, queue events, and guarantee delivery with enterprise-grade reliability. Zero infrastructure needed.',
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
        content: 'Sigryn - Never Lose a Webhook Again | Reliable Event Delivery Infrastructure',
      },
      {
        name: 'twitter:description',
        content:
          'Sigryn is the control layer for reliable event delivery. Process webhooks, validate signatures, queue events, and guarantee delivery with enterprise-grade reliability.',
      },
      {
        name: 'twitter:image',
        content: 'https://sigryn.com/images/og-image.png',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
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

