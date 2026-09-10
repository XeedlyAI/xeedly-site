# Website Development Project Rules

## Before Starting Any Session
1. Confirm you are on main branch: `git branch`
2. Confirm clean git state: `git status`
3. Read this file (CLAUDE.md)
4. Identify the project type from the brief: Website or Landing Page
5. Read the skill files:
   - ALWAYS read: skills/CONTENT.md, skills/WEBDEV.md, skills/DESIGN.md, skills/DEPLOY.md
   - If Website: ALSO read skills/SEO-ARCHITECTURE.md
   - If Landing Page: ALSO read skills/LANDING-PAGE.md
   - **Advanced Design Skills** (read when brief requires high design quality):
     In addition to the core skills, read these for any project where design quality matters:
     - skills/ANIMATION.md — Motion design patterns, timing constants, scroll animations
     - skills/SVG-VISUALS.md — Code-generated graphics, product mockups, data visualizations
     - skills/LAYOUT.md — Advanced composition patterns, bento grids, sticky scroll
     - skills/TYPOGRAPHY.md — Font pairing, text hierarchy, phrase highlighting, responsive type
     - skills/INTERACTIVE.md — Premium interactive components, tabs, accordions, toggles
   - For ALL website and landing page builds, read at minimum: ANIMATION.md and TYPOGRAPHY.md.
   - For builds requiring product mockups or placeholder visuals: also read SVG-VISUALS.md.
   - For builds requiring advanced layouts: also read LAYOUT.md.
   - For builds requiring interactive components beyond basic: also read INTERACTIVE.md.
6. Read the project brief from briefs/[project-name].md
7. Run `npm run build` to confirm the project builds before making changes

## Build Rules
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS + custom CSS variables for theming
- Components: shadcn/ui as base, customized per project
- Fonts: Loaded via next/font — NEVER use Inter, Roboto, or Arial as primary fonts
- Images: next/image with proper alt text always
- Deployment: Vercel via Git push to main
- Verification: `npm run build` must pass before any commit
- Never run `npm run dev` — verify via build only, check on Vercel

## Git Rules
- Always work on main branch
- Never use git worktrees
- Commit messages: descriptive, prefixed with [feat], [fix], [content], [style], [setup]
- Push to origin/main after every verified build

## Content Rules
- Read the project brief before writing ANY content
- All content must be original, SEO-optimized, and AEO-structured
- Every page must include JSON-LD structured data
- Every page must have unique meta title (under 60 chars) + description (under 155 chars)
- FAQ sections use schema.org FAQPage markup
- Follow ALL rules in skills/CONTENT.md — especially the banned words list

## Design Rules
- Every project must have a distinctive visual identity — no generic AI aesthetics
- Read skills/DESIGN.md before making any styling decisions
- Choose fonts and colors based on the project brief, not defaults
- Dark and light themes are both valid — match the brief

## Project Type Routing
- The brief has a "Project Type" field: Website or Landing Page
- Website builds: generate multiple pages following the silo architecture in SEO-ARCHITECTURE.md
- Landing Page builds: generate a single page following the 10-section framework in LANDING-PAGE.md
- NEVER apply landing page patterns to website pages or vice versa

## Quality Checklist (Before Final Commit)
- [ ] npm run build passes with zero errors
- [ ] Every page has unique meta title + description
- [ ] Every page has appropriate JSON-LD structured data
- [ ] Every image has alt text
- [ ] All internal links work
- [ ] FAQ sections have FAQPage schema markup
- [ ] No banned words from CONTENT.md appear anywhere
- [ ] Responsive: looks correct at 375px, 768px, and 1440px widths
- [ ] Lighthouse: 90+ on Performance, Accessibility, SEO
