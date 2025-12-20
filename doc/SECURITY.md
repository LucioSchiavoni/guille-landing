# Security Standards - Next.js

## Core Principles

Apply defense in depth. Never trust client input. Minimize attack surface. Fail securely.

## Input Validation & Sanitization

- Validate all inputs server-side using Zod schemas before processing
- Sanitize HTML output with DOMPurify when rendering user content
- Use parameterized queries exclusively, never string concatenation for database operations
- Implement strict TypeScript types for all API boundaries

## Authentication & Authorization

- Use NextAuth.js or similar battle-tested libraries, never roll custom auth
- Store sessions server-side, use httpOnly secure cookies with SameSite=Strict
- Implement RBAC checks on every protected route and API endpoint
- Validate JWT tokens server-side on each request, check expiration and issuer
- Use constant-time comparison for token validation to prevent timing attacks

## API Security

- All API routes must validate authentication before any logic
- Implement rate limiting using upstash/ratelimit or similar
- Return generic error messages to clients, log detailed errors server-side only
- Use CORS restrictively, whitelist specific origins
- Validate Content-Type headers, reject unexpected formats

```typescript
import { headers } from 'next/headers'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function POST(request: Request) {
  const ip = headers().get('x-forwarded-for') ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }
}
```

## Data Protection

- Never expose sensitive data in client components or browser console
- Use environment variables for secrets, validate they exist at build time
- Implement field-level encryption for PII in database
- Log security events without sensitive data (no passwords, tokens, PII in logs)
- Use `server-only` package to prevent server code leaking to client bundle

## Headers & CSP

Configure security headers in next.config.js or middleware:

```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.yourdomain.com;"
  }
]
```

## File Uploads

- Validate file type by magic bytes, not extension
- Limit file size server-side
- Store uploads outside webroot, serve through authenticated endpoints
- Scan uploads for malware when possible
- Generate random filenames, never use user-provided names

## SQL Injection & NoSQL Injection Prevention

- Use Prisma, Drizzle or similar ORMs with parameterized queries
- Never interpolate variables into raw queries
- Validate and sanitize MongoDB query operators

## XSS Prevention

- React escapes by default, but avoid dangerouslySetInnerHTML
- When HTML rendering is required, sanitize with DOMPurify
- Validate URLs before rendering in href/src attributes
- Use CSP to restrict inline scripts

## CSRF Protection

- Next.js API routes with cookies need CSRF tokens
- Use SameSite=Strict cookies
- Verify Origin/Referer headers on state-changing requests

## Dependency Security

- Run `npm audit` in CI pipeline, fail on high/critical
- Use Dependabot or Renovate for automated updates
- Pin exact versions in production
- Review changelogs before updating auth/crypto packages

## Secrets Management

```typescript
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
```

## Error Handling

- Catch errors at API boundaries, return safe messages
- Never expose stack traces or internal paths to clients
- Implement global error boundary for React
- Log errors with correlation IDs for debugging

## Checklist Before PR

- [ ] All user inputs validated with Zod
- [ ] Authentication checked on protected routes
- [ ] Authorization verified for resource access
- [ ] No secrets in client-side code
- [ ] Rate limiting on public endpoints
- [ ] Security headers configured
- [ ] npm audit passes
