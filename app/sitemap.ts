import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.horsforthharriers.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/how-to-join', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/membership', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/sessions', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/sessions/matrix', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/sessions/coaches', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/couch-to-5k', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/committee', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/kit', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/records', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/races/peco', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/races/abc', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/races/championships', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/races/relays', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/races/yorkshire-vets', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/club-documents', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/club-documents/constitution', priority: 0.5, changeFrequency: 'yearly' as const },
    { url: '/club-documents/privacy-policy', priority: 0.4, changeFrequency: 'yearly' as const },
    { url: '/club-documents/terms-and-conditions', priority: 0.4, changeFrequency: 'yearly' as const },
    { url: '/club-documents/health-and-safety', priority: 0.4, changeFrequency: 'yearly' as const },
  ]

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
