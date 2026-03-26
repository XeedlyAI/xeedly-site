# DEPLOY.md — Git & Vercel Deployment

## Git Workflow
1. Verify clean working directory: git status
2. Stage all changes: git add -A
3. Commit with descriptive message: git commit -m "[type] description"
4. Push to main: git push origin main
5. Vercel auto-deploys from main branch

## Commit Message Types
- [setup] — project initialization, dependencies, config
- [feat] — new page, component, or feature
- [content] — copy, content, or SEO changes
- [style] — visual/CSS changes
- [fix] — bug fixes
- [deploy] — deployment config changes

## Vercel Configuration
- Framework: Next.js (auto-detected)
- Build command: npm run build (default)
- Output directory: .next (default)
- Environment variables: set in Vercel dashboard, never commit .env files

## Pre-Push Checklist
1. npm run build passes with zero errors
2. All TypeScript types resolve
3. No console.log in production code
4. All images have alt text
5. Meta titles and descriptions set for all pages
6. JSON-LD structured data validates
7. Sitemap generates correctly (if configured)

## Domain Setup
- Configure custom domain in Vercel dashboard after first deploy
- Set up redirects (www → non-www or vice versa)
- Verify SSL certificate is active
