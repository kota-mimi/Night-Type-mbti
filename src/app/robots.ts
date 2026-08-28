import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/result', '/gender-selection', '/quiz/'],
    },
    sitemap: 'https://www.night-type.net/sitemap.xml',
    host: 'https://www.night-type.net',
  }
}
