import { createClient } from 'next-sanity'

export const rawClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

export const client = {
  fetch: async <T = unknown>(query: string, params?: Record<string, string | number | boolean | null>): Promise<T | null> => {
    try {
      return params
        ? await rawClient.fetch<T>(query, params)
        : await rawClient.fetch<T>(query)
    } catch {
      return null
    }
  },
}

const rawPreviewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const previewClient = {
  fetch: async <T = unknown>(query: string, params?: Record<string, string | number | boolean | null>): Promise<T | null> => {
    try {
      return params
        ? await rawPreviewClient.fetch<T>(query, params)
        : await rawPreviewClient.fetch<T>(query)
    } catch {
      return null
    }
  },
}
