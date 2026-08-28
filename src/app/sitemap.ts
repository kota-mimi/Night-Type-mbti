import type { MetadataRoute } from 'next'
import { characterSlugs } from '@/data/characterSlugs'

const SITE_URL = 'https://night-type.net'

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date('2026-08-28')
  const publicPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: updatedAt, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/gallery`, lastModified: updatedAt, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: updatedAt, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: updatedAt, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/contact`, lastModified: updatedAt, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const characterPages: MetadataRoute.Sitemap = Object.values(characterSlugs).map((slug) => ({
    url: `${SITE_URL}/character/${slug}`,
    lastModified: updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...publicPages, ...characterPages]
}
