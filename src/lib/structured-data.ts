export function organizationSchema({
  name,
  url,
  logo,
  phone,
  email,
  sameAs,
}: {
  name: string
  url: string
  logo?: string
  phone?: string
  email?: string
  sameAs?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(phone && { contactPoint: { '@type': 'ContactPoint', telephone: phone, contactType: 'customer service' } }),
    ...(email && { email }),
    ...(sameAs && { sameAs }),
  }
}

export function localBusinessSchema({
  name,
  url,
  phone,
  address,
  geo,
  hours,
  image,
  priceRange,
}: {
  name: string
  url: string
  phone: string
  address: { street: string; city: string; state: string; zip: string; country?: string }
  geo: { lat: number; lng: number }
  hours?: string[]
  image?: string
  priceRange?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: address.country ?? 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lng,
    },
    ...(hours && { openingHours: hours }),
    ...(image && { image }),
    ...(priceRange && { priceRange }),
  }
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function serviceSchema({
  name,
  description,
  provider,
  areaServed,
  url,
}: {
  name: string
  description: string
  provider: string
  areaServed?: string
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: provider },
    ...(areaServed && { areaServed }),
    ...(url && { url }),
  }
}
