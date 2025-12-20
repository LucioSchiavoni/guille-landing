# SEO Standards - Next.js

## Core Principles

Content is king. Technical SEO removes barriers. User experience drives rankings. Measure and iterate.

## Metadata Configuration

### Static Metadata

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Site Name',
    template: '%s | Site Name',
  },
  description: 'Compelling description under 160 characters with primary keyword.',
  keywords: ['primary keyword', 'secondary keyword', 'related term'],
  authors: [{ name: 'Author Name' }],
  creator: 'Company Name',
  publisher: 'Company Name',
  metadataBase: new URL('https://www.example.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.example.com',
    siteName: 'Site Name',
    title: 'Page Title for Social Sharing',
    description: 'Description optimized for social sharing, can be longer.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Descriptive alt text',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@username',
    creator: '@username',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
}
```

### Dynamic Metadata

```typescript
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug)
  
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'article',
      publishedTime: product.createdAt,
      modifiedTime: product.updatedAt,
    },
  }
}
```

## URL Structure

- Use descriptive, keyword-rich slugs: `/productos/zapatillas-running-hombre`
- Keep URLs short and readable
- Use hyphens, not underscores
- Lowercase only
- Avoid query parameters for indexable content
- Implement consistent trailing slash policy

```typescript
// next.config.js
module.exports = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
}
```

## Structured Data (JSON-LD)

```typescript
import type { Product, WithContext } from 'schema-dts'

export default function ProductPage({ product }) {
  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.example.com/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: product.reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating,
      reviewCount: product.reviews.length,
    } : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductContent product={product} />
    </>
  )
}
```

### Common Schema Types

- **Organization**: Homepage
- **WebSite**: Homepage with SearchAction
- **BreadcrumbList**: All pages
- **Product**: Product pages
- **Article/BlogPosting**: Blog posts
- **FAQPage**: FAQ sections
- **LocalBusiness**: Local businesses
- **Review**: Review pages

## Sitemap Generation

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  const posts = await getPosts()
  
  const productUrls = products.map((product) => ({
    url: `https://www.example.com/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  const postUrls = posts.map((post) => ({
    url: `https://www.example.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [
    {
      url: 'https://www.example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
    ...postUrls,
  ]
}
```

## Robots.txt

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/private/'],
      },
    ],
    sitemap: 'https://www.example.com/sitemap.xml',
  }
}
```

## Semantic HTML Structure

```typescript
export default function ArticlePage({ article }) {
  return (
    <article>
      <header>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        <time dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
      </header>
      
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li aria-current="page">{article.title}</li>
        </ol>
      </nav>
      
      <main>
        <section>
          <h2>Section Title</h2>
          <p>Content...</p>
        </section>
      </main>
      
      <aside>
        <h2>Related Articles</h2>
      </aside>
      
      <footer>
        <p>Author: {article.author}</p>
      </footer>
    </article>
  )
}
```

## Heading Hierarchy

- One `<h1>` per page, containing primary keyword
- Logical hierarchy: h1 → h2 → h3, never skip levels
- Include keywords naturally in headings
- Keep headings descriptive and concise

## Image SEO

```typescript
<Image
  src={product.image}
  alt="Nike Air Max 90 - Men's Running Shoes in White/Black colorway"
  title="Nike Air Max 90"
  width={800}
  height={600}
/>
```

- Descriptive alt text with keywords when natural
- Meaningful filenames: `nike-air-max-90-white.webp`
- Compress images without quality loss
- Use modern formats (WebP, AVIF)
- Provide multiple sizes with srcset

## Internal Linking

- Link to related content with descriptive anchor text
- Implement breadcrumbs on all pages
- Create topic clusters linking to pillar content
- Avoid orphan pages
- Use `<Link>` component for client-side navigation

```typescript
<Link href="/products/running-shoes">
  Shop Running Shoes
</Link>
```

## Performance Impact on SEO

- Core Web Vitals are ranking factors
- Prioritize LCP optimization (main content visible fast)
- Minimize CLS (no layout shifts)
- Fast server response time (TTFB < 200ms)
- Use SSG/ISR for indexable content

## International SEO

```typescript
// app/[lang]/layout.tsx
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }, { lang: 'pt' }]
}

export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://www.example.com/${params.lang}`,
      languages: {
        'en': 'https://www.example.com/en',
        'es': 'https://www.example.com/es',
        'pt': 'https://www.example.com/pt',
        'x-default': 'https://www.example.com/en',
      },
    },
  }
}
```

## Canonical URLs

Always specify canonical to prevent duplicate content:

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.example.com/products/shoe',
  },
}
```

- Use absolute URLs
- Point paginated content to first page or view-all
- Self-referencing canonicals on unique pages

## Content Guidelines

- Unique, valuable content on every indexable page
- Minimum 300 words for article pages
- Include primary keyword in first paragraph
- Use related keywords naturally throughout
- Update content regularly, show last modified date
- Avoid thin or duplicate content

## Technical Checklist

- [ ] Unique title and meta description per page
- [ ] Open Graph and Twitter cards configured
- [ ] Structured data validates in Rich Results Test
- [ ] Sitemap includes all indexable pages
- [ ] Robots.txt allows crawling of important pages
- [ ] Canonical URLs set correctly
- [ ] hreflang tags for multilingual sites
- [ ] Mobile-friendly responsive design
- [ ] HTTPS enforced
- [ ] Core Web Vitals passing
- [ ] No broken internal links
- [ ] Images have alt text
