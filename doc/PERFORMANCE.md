# Performance Standards - Next.js

## Core Principles

Measure before optimizing. Ship less JavaScript. Prioritize Core Web Vitals. Cache aggressively.

## Rendering Strategy Selection

Choose the right strategy per page:

- **Static (SSG)**: Marketing pages, blog posts, documentation
- **ISR**: Product listings, content that changes hourly/daily
- **SSR**: Personalized dashboards, real-time data
- **Client**: Interactive widgets after initial load

Default to static, add dynamism only when required.

## Component Architecture

### Server Components First

Server Components by default, Client Components only for interactivity:

```typescript
import { Suspense } from 'react'
import { ProductList } from './ProductList'
import { ProductSkeleton } from './ProductSkeleton'

export default async function Page() {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductList />
    </Suspense>
  )
}
```

### Client Component Boundaries

Push 'use client' as deep as possible in the component tree:

```typescript
// BAD: entire page is client
'use client'
export default function Page() { /* ... */ }

// GOOD: only interactive part is client
import { InteractiveWidget } from './InteractiveWidget'

export default function Page() {
  return (
    <div>
      <StaticContent />
      <InteractiveWidget />
    </div>
  )
}
```

## Image Optimization

Always use next/image with explicit dimensions:

```typescript
import Image from 'next/image'

<Image
  src="/hero.webp"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL={blurDataUrl}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

- Use WebP/AVIF formats
- Set `priority` only for LCP images
- Provide accurate `sizes` attribute
- Use blur placeholders for perceived performance

## Font Optimization

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})
```

- Subset fonts to required characters
- Use `display: swap` to prevent FOIT
- Self-host when possible for better caching

## Code Splitting & Lazy Loading

```typescript
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
})

const Modal = dynamic(() => import('./Modal'))
```

- Lazy load below-fold components
- Use `ssr: false` for browser-only libraries
- Split by route automatically with App Router

## Data Fetching Optimization

### Parallel Fetching

```typescript
export default async function Page() {
  const [products, categories, user] = await Promise.all([
    getProducts(),
    getCategories(),
    getUser(),
  ])
  
  return <Dashboard products={products} categories={categories} user={user} />
}
```

### Caching Strategy

```typescript
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { 
      revalidate: 3600,
      tags: ['products']
    }
  })
  return res.json()
}

async function getUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`, {
    cache: 'no-store'
  })
  return res.json()
}
```

### Database Query Optimization

```typescript
const products = await prisma.product.findMany({
  where: { status: 'active' },
  select: {
    id: true,
    name: true,
    price: true,
    image: true,
  },
  take: 20,
})
```

- Select only needed fields
- Use pagination, never fetch unbounded lists
- Add database indexes for filtered/sorted columns
- Use connection pooling (PgBouncer, Prisma Accelerate)

## Bundle Size Management

### Analyze Regularly

```bash
ANALYZE=true npm run build
```

Configure in next.config.js:

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})
```

### Import Optimization

```typescript
// BAD
import { format } from 'date-fns'

// GOOD
import { format } from 'date-fns/format'

// BAD
import _ from 'lodash'

// GOOD
import debounce from 'lodash/debounce'
```

### Tree Shaking

- Use ES modules exclusively
- Avoid barrel files (index.ts re-exports) in large directories
- Mark packages as sideEffects-free when applicable

## Caching Layers

### Browser Caching

```typescript
export async function GET() {
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

### React Cache

```typescript
import { cache } from 'react'

export const getUser = cache(async (id: string) => {
  const user = await db.user.findUnique({ where: { id } })
  return user
})
```

### unstable_cache for Database

```typescript
import { unstable_cache } from 'next/cache'

const getCachedProducts = unstable_cache(
  async () => prisma.product.findMany(),
  ['products'],
  { revalidate: 3600, tags: ['products'] }
)
```

## Third-Party Scripts

```typescript
import Script from 'next/script'

<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload"
/>

<Script
  src="https://critical.example.com/widget.js"
  strategy="afterInteractive"
/>
```

- Use `lazyOnload` for analytics, chat widgets
- Use `afterInteractive` for critical third-party
- Self-host when possible
- Consider Partytown for web workers

## Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Monitoring

- Use Vercel Analytics or Web Vitals API
- Set up Real User Monitoring (RUM)
- Monitor server response times
- Track bundle size in CI

## Checklist Before PR

- [ ] Server Components used where possible
- [ ] Images use next/image with sizes
- [ ] No unnecessary client-side JavaScript
- [ ] Data fetched in parallel when possible
- [ ] Appropriate caching strategy defined
- [ ] Bundle size checked, no regressions
- [ ] Lighthouse score maintained or improved
