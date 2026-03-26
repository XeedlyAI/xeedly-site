# CONTENT.md — Universal Content Writing & SEO/AEO Skill
# Applies to ALL project types (websites and landing pages)

## Voice & Tone Principles

Write as a confident expert who genuinely understands the client's industry. Sound like a trusted advisor, not a marketer. Every sentence should either solve a problem, answer a question, or move the reader toward a decision.

### Reading Level
- Write at 5th to 9th grade reading level
- Use short, clear sentences
- One idea per sentence
- Paragraphs: 2-3 sentences maximum
- Break up walls of text with subheadings, not bullet points

### Tone Calibration
The brief will specify a tone direction. Default behaviors:
- **Professional services** (law, finance, medical): authoritative, measured, trustworthy
- **Home services** (HVAC, roofing, concrete): practical, direct, no-nonsense
- **Lifestyle/entertainment** (restaurants, venues, spas): warm, energetic, inviting
- **Technology/SaaS**: clear, confident, outcome-focused
- Adjust based on the brief's tone field — these are defaults, not mandates

### Perspective
- Write in second person ("you") when addressing the customer
- Write in first person plural ("we") when speaking as the business
- Never use third person to refer to the business on its own site ("The company offers...")
- Exception: About page biographical content can use third person for founder stories

## Banned Words & Phrases

Never use these words. They signal AI-generated content and erode trust:

embark, look no further, navigating, picture this, top-notch, unleash, unlock, unveil,
we've got you covered, transition, transitioning, crucial, delve, daunting, deep dive,
dive in, reel in, ensure, in conclusion, in summary, optimal, assessing, firstly, strive,
striving, furthermore, moreover, comprehensive, we know, we understand, testament,
captivating, eager, refreshing, edge of my seat, breath of fresh air, to consider,
it is important to consider, there are a few considerations, lastly, in terms of,
with regard to, its worth mentioning, its interesting to note, significantly, notably,
essentially, as such, therefore, thus, interestingly, in essence, noteworthy, bear in mind,
its crucial to note, one might argue, its widely acknowledged, predominantly,
from this perspective, in this context, this demonstrates, arguably, its common knowledge,
undoubtedly, this raises the question, in a nutshell, unveiled, game-changer,
cutting-edge, next-level, revolutionize, disrupt, synergy, leverage (as verb),
seamless (unless describing a literal seam), robust, scalable (unless technical context),
elevate, empower (unless quoting someone), holistic, innovative (show don't tell),
best-in-class, world-class, state-of-the-art

### What To Use Instead
- Replace vague superlatives with specific outcomes and numbers
- Replace buzzwords with plain descriptions of what actually happens
- "We help you capture 30% more calls" beats "We offer a cutting-edge solution"
- "Your ads cost less and bring more buyers" beats "Our innovative platform leverages AI"

## SEO Requirements (All Pages)

### Keyword Placement
- Primary keyword in: H1, meta title, first paragraph, at least one H2, meta description
- Secondary keywords distributed naturally across H2s and body copy
- Keyword density: 1-2% for primary keyword (don't force it)
- Never sacrifice readability for keyword placement

### Meta Tags
- **Title format:** "[Primary Benefit or Keyword] | [Business Name]" — under 60 characters
- **Description:** Action-oriented, includes primary keyword, under 155 characters
- **URL slugs:** Short, keyword-rich, hyphenated lowercase (e.g., /concrete-contractor-sandy-utah)

### Heading Structure
- Single H1 per page — exact match or close match to primary keyword, in conversational context
- H2s for major sections — include secondary keywords or GBP categories as exact match where natural
- H3s for subsections — can be more conversational
- Never skip heading levels (H1 → H3 without H2)

### Internal Linking
- Every page links to at least 2 other pages on the site
- Link text should be descriptive (not "click here")
- Service pages link to related service pages and back to category pages
- All pages link to the homepage or primary category pages

### Image Optimization
- Every image has descriptive alt text
- Alt text includes keyword naturally when the image is relevant to the keyword
- File names are descriptive and hyphenated (not IMG_4532.jpg)
- Use next/image with proper width/height to prevent layout shift

## AEO (Answer Engine Optimization)

### Why This Matters
AI search engines (ChatGPT, Google AI Overviews, Perplexity) cite content that directly answers questions in a structured, authoritative format. AEO-optimized content gets recommended when users ask "Who is the best [service] near me?" or "What should I look for in a [provider]?"

### How To Implement
- Every service page and product page includes an FAQ section at the bottom
- FAQs use actual questions real customers ask (derived from the brief's pain points and objections)
- Answer format: 2-3 sentence direct answer first, then expanded detail if needed
- Question formats to include: "What is...", "How does...", "Why should I...", "How much does...", "What's the difference between..."
- Wrap FAQ sections in schema.org FAQPage JSON-LD markup

### Structured Data (JSON-LD)
Generate appropriate structured data for every page:
- **Homepage:** Organization schema (name, url, logo, contactPoint, sameAs for social profiles)
- **Service pages:** Service schema or LocalBusiness with service offerings
- **About page:** Organization or Person schema for founders
- **FAQ sections:** FAQPage schema
- **Location pages:** LocalBusiness schema with address, geo, hours
- **Blog posts:** Article schema with author, datePublished, dateModified

### Content Structure for AI Citability
- Start sections with a clear statement of what the section covers
- Use specific numbers, stats, and outcomes (AI systems prefer concrete data over vague claims)
- Include local signals: neighborhood names, landmarks, service area descriptions
- Reference seasonal or area-specific issues that demonstrate genuine local expertise
- Provide value beyond listing services — share helpful advice that solves actual problems

## Dual Optimization Approach

Balance traditional Google ranking signals with AI recommendation signals:

### For Google Algorithm
- Exact-match keywords in title, H1, and first paragraph
- GBP secondary categories or services as exact-match H2 headings
- Proper heading hierarchy for content structure
- Local SEO signals (neighborhoods, landmarks, service areas)
- Semantic keywords related to the primary service industry

### For AI Systems
- Sound like a genuine recommendation from a trusted local expert
- Use natural, conversational language matching how people actually talk
- Answer real questions: "Who is the best [service] near me?" "What do I do if [common problem]?"
- Include authentic local knowledge and community connections
- Share helpful advice, not just sales pitches
- Use exact words customers use when describing their problems

### Balanced Writing Pattern
Start each section with natural conversational language, then layer in keyword optimization:

EXAMPLE: "Last winter half of [local neighborhood] called us when [common problem] happened. Here's what we learned about emergency [service] in [city]."

Follow storytelling with clear service descriptions that include exact keyword matches. Balance helpful advice with service-focused content.

## Content Generation Process

When generating content for any page:
1. Read the full brief before writing anything
2. Identify the primary keyword, secondary keywords, and target audience for this specific page
3. Outline the page structure (H1, H2s, H3s, CTAs) before writing body copy
4. Write the H1 and meta description first — they frame everything
5. Write body copy section by section, following the heading outline
6. Add FAQ section last (informed by the content you just wrote + brief's objections/pain points)
7. Generate JSON-LD structured data appropriate to the page type
8. Review: Does every section serve the reader? Remove anything that's filler
