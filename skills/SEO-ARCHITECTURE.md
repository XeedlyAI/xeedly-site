# SEO-ARCHITECTURE.md — Website Silo Structure & Page Architecture
# USE ONLY FOR: Full multi-page websites
# DO NOT USE FOR: Landing pages (use LANDING-PAGE.md instead)

## Overview

This skill implements a proprietary SEO silo architecture methodology. Before generating
any pages for a website, you MUST first construct the complete page architecture from the
brief's GBP categories, services, and target locations. Every page exists for a reason
tied to search intent and GBP alignment.

## Architecture Construction Process

### Step 1: Extract the Silo Inputs from the Brief

Read the brief and identify:
- **GBP Primary Category** (e.g., "Concrete Contractor")
- **GBP Secondary Categories** (e.g., "Flooring Contractor", "Driveway Contractor")
- **Services** with city names (e.g., "Stamped Concrete Sandy Utah")
- **Target City/Cities**
- **Service Area** (neighborhoods, surrounding cities)

### Step 2: Build the Page Tree

The page hierarchy follows this exact pattern:

```
Homepage (targets: [Primary Category] [City])
├── [Secondary Category 1] (targets: [Secondary Cat 1] [City])
│   ├── [Service A] (targets: [Service A] [City])
│   ├── [Service B] (targets: [Service B] [City])
│   └── [Service C] (targets: [Service C] [City])
├── [Secondary Category 2] (targets: [Secondary Cat 2] [City])
│   ├── [Service D] (targets: [Service D] [City])
│   └── [Service E] (targets: [Service E] [City])
├── About
├── Contact
└── Blog (optional)
```

### Step 3: Validate the Architecture

Before writing any content, verify:

**Homepage requirements:**
- [ ] Title tag includes: [Primary Category] [City] + additional context
- [ ] H1 includes the primary category + city naturally
- [ ] Body copy mentions EVERY secondary category
- [ ] Internal links exist to EVERY secondary category page
- [ ] Describes the business scope broadly enough to encompass all services

**Secondary Category page requirements:**
- [ ] Each secondary category has its own dedicated page
- [ ] Title tag format: "[Secondary Category] [City] | [Additional Context]"
- [ ] H1 includes the secondary category + city
- [ ] Lists and links to all services under this category
- [ ] Links back to homepage

**Service page requirements:**
- [ ] Every service has its own dedicated page
- [ ] Title tag format: "[Service] [City] | [Additional Context]"
- [ ] Title tag includes the EXACT phrase "[Service] [City]"
- [ ] Assigned to the most relevant secondary category
- [ ] Links back to its parent category page
- [ ] Links to 1-2 related service pages (cross-linking within the silo)

### Step 4: Gap Analysis (for existing sites being rebuilt)

If rebuilding an existing site, compare the proposed architecture against what exists:
- List any missing pages (category or service without a dedicated URL)
- List any title tag gaps (pages exist but title tags don't match the required format)
- List any missing homepage mentions or links to secondary categories
- List any service pages not linked from their parent category page
- List any orphaned pages (pages with no internal links pointing to them)

## Title Tag Format Rules

Every title tag must follow this pattern:
```
[Keyword Phrase] [City Name] | [Additional Context or Brand Name]
```

Examples:
- "Concrete Contractor Sandy Utah | Expert Installation & Repair"
- "Stamped Concrete Sandy Utah | Beautiful, Durable Driveways"
- "Flooring Contractor Sandy Utah | Residential & Commercial"

Rules:
- Total length: under 60 characters
- Primary keyword + city comes FIRST
- Brand name or additional context comes after the pipe
- Every page has a UNIQUE title tag — no duplicates

## Internal Linking Rules

### Mandatory Links
- Homepage → every secondary category page
- Category page → every service page under it
- Service page → parent category page
- Service page → 1-2 related service pages (creates lateral connections)
- Every page → homepage (via logo/nav, but also contextual link in footer or body)

### Linking Patterns
- Use descriptive anchor text that includes the target page's keyword
- NOT: "Click here to learn more"
- YES: "Learn about our stamped concrete services in Sandy"
- Place contextual links within body copy, not just in navigation
- Each page should have 3-5 internal links minimum (excluding nav/footer)

### Link Flow Direction
```
Homepage (authority hub)
    ↕ (bidirectional)
Category Pages (topic clusters)
    ↕ (bidirectional)
Service Pages (specific intent)
    ↔ (lateral cross-links to related services)
```

## URL Structure

```
/ (homepage)
/[secondary-category]/ (category page)
/[secondary-category]/[service-name]/ (service page)
/about/
/contact/
/blog/ (if applicable)
/blog/[post-slug]/
```

Rules:
- All lowercase, hyphenated
- Include city name in service page slugs if targeting local SEO
- Keep slugs under 5 words when possible
- No stop words unless necessary for readability

## Page Content Requirements by Type

### Homepage Content
- Length: 1500-2500 words
- H1: Primary category + city in conversational context
- Must mention every secondary category with a brief description (2-3 sentences each)
- Each secondary category mention includes an internal link to its dedicated page
- Include service area description (neighborhoods, surrounding cities)
- Include social proof (review count, years in business, projects completed)
- FAQ section with 5-8 questions covering common queries across all services
- CTA in hero, after service descriptions, and at page bottom

### Category Page Content
- Length: 1000-1500 words
- H1: Secondary category + city
- Overview of the category with industry expertise demonstrated
- List each service under this category as an H2 or H3 with description
- Each service description links to its dedicated service page
- Include 1-2 local references (neighborhoods, seasonal issues)
- FAQ section with 4-6 questions specific to this category
- CTA after overview and at page bottom

### Service Page Content
- Length: 800-1200 words
- H1: Service name + city (exact match in natural context)
- Detailed description of the service
- Process/how-it-works section
- Benefits specific to this service
- Local relevance (how this service applies to the area)
- FAQ section with 3-5 questions specific to this service
- Link to parent category page in body copy
- Links to 1-2 related services
- CTA after description and at page bottom

### About Page
- Length: 600-1000 words
- Founder/company story with authentic local connections
- Years in business, community involvement
- Team highlights (if applicable)
- Values and mission (brief, not corporate-speak)
- Photos of real team/work (noted in brief if available)
- Links to key service categories

### Contact Page
- Business name, address, phone, email
- Embedded map (Google Maps)
- Contact form
- Hours of operation
- Service area description
- Schema markup: LocalBusiness with full address and geo coordinates

## Local SEO Signals

Every page should include some combination of:
- City and state name (naturally, not stuffed)
- Neighborhood names within the service area
- Local landmarks or well-known locations
- References to area-specific conditions (weather, soil, building codes, regulations)
- Community involvement mentions
- Service area boundaries (specific cities/zip codes served)

## Blog/Content Hub (if included in brief)

### Purpose
- Target long-tail keywords and questions not covered by service pages
- Build topical authority around the primary category
- Provide shareable content for social media
- Attract links from local media or industry sites

### Blog Post Structure
- Length: 800-1500 words
- Target one long-tail keyword per post
- Include at least 2 internal links to service or category pages
- FAQ schema on posts that answer specific questions
- Article schema with author, date, modified date
- Meta description that entices clicks from search results

## Multi-Location Websites

If the brief specifies multiple locations:
- Create a location hub page listing all locations
- Each location gets its own page with LocalBusiness schema
- Service pages can be duplicated per location IF content is substantially unique
- Alternatively, one service page can list all locations it's available in
- Each location page links to the location-specific services
- Avoid thin content: don't create 20 pages that differ only by city name
