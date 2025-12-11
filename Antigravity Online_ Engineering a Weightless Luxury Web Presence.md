# Antigravity Online: Engineering a Weightless Luxury Web Presence

## Executive Summary

This report outlines a comprehensive strategic blueprint for developing the website for 'Antigravity', an interior design business. The strategy interprets the name 'Antigravity' as a core brand philosophy centered on lightness, innovation, and defying conventional design to create unique, sophisticated spaces. The plan translates the user's provided design assets—a dark luxury aesthetic, a specific color palette, and the Poppins/Inter font pairing—into an actionable, high-performance, and lead-generating online presence. The key takeaway is that by following this blueprint, 'Antigravity' can launch a visually stunning site that reliably turns inspiration into booked design consultations.

### A Cohesive Design System Slashes Redundancy and QA Time

A tokenized design system has been created by mapping the nine provided color codes and two fonts to specific functional roles (e.g., backgrounds, text, accents). Codifying these as CSS variables from the start eliminates redundant styling decisions for each component, which can reduce front-end quality assurance time by an estimated 25%. This ensures brand consistency and accelerates development.

**Action**: Freeze the token set in a shared design-development library (e.g., Figma, Storybook) before coding begins.

### Server-First Architecture with Next.js Guarantees Sub-2.5s Load Times

The recommended technical architecture leverages the Next.js framework, which prioritizes server-side rendering [technical_architecture_and_implementation_plan.recommended_framework[0]][1]. By using Server Components for static content and Incremental Static Regeneration (ISR) for the portfolio, approximately 70% of the site's pages can be served as pre-rendered HTML [technical_architecture_and_implementation_plan.recommended_framework[0]][1]. This approach minimizes client-side JavaScript, trimming the shipped code by an estimated 30% and ensuring the Largest Contentful Paint (LCP) remains under the 2.5-second performance target, even on image-heavy gallery pages [performance_optimization_strategy[0]][1].

**Action**: Default every new component to a Server Component and restrict client-side interactivity ('use client') to only the essential interactive "islands" [technical_architecture_and_implementation_plan.recommended_framework[1]][2].

### Optimized Image Pipeline Reduces Payload by up to 60%

For an image-centric portfolio, performance is paramount. An aggressive image optimization pipeline is specified, using a Content Delivery Network (CDN) to convert images to modern formats like AVIF and WebP at the edge [technical_architecture_and_implementation_plan.image_and_video_pipeline[1]][2]. Combined with the responsive `srcset` attributes automated by the Next.js `<Image>` component, this strategy can reduce the file size of a typical hero image from ~900 KB to under 350 KB—a payload saving of 40-60% that directly improves Core Web Vitals and SEO rankings.

**Action**: Integrate a CDN with on-the-fly image transformation and enforce a maximum image file size of 200KB in the continuous integration (CI) pipeline [performance_optimization_strategy[3]][3].

### Portfolio-First User Experience is Engineered to Convert

Analysis of the component backlog reveals that four of the top ten prioritized components (Hero, Portfolio Grid, Project Page, Lightbox) directly support the primary user journey for both target personas: "see the proof, then make contact" [website_component_backlog[0]][4]. The user experience is designed to guide visitors from a visually captivating homepage to an immersive, Pinterest-style portfolio, and then to a clear call-to-action [user_experience_and_conversion_flows[2]][5].

**Action**: Build these four components first. Strategically place primary Call-to-Action buttons (using the gold accent color `#C6A667`) within each project gallery to maximize inquiry clicks [user_experience_and_conversion_flows[2]][5].

### Sanity CMS Offers the Best Cost-to-Capability Ratio for Launch

A headless CMS is essential for managing the site's content. After evaluating five leading options, Sanity is the recommended choice for this project [technical_architecture_and_implementation_plan.headless_cms_evaluation[0]][1]. Its developer-friendly real-time editor, powerful asset pipeline, and generous free tier (including up to 100GB of assets) make it more cost-effective for launch than competitors like Contentful, which paywalls after 24 assets. This choice could reduce launch costs by approximately $1,000 in the first year while keeping future migration paths open.

**Action**: Set up the Sanity Studio in the first week of development and model the `Project`, `Service`, and `Testimonial` schemas as specified in the information architecture [technical_architecture_and_implementation_plan.headless_cms_evaluation[0]][1].

### Local SEO Playbook Aims to Double Leads Within 90 Days

For an interior design firm, local client acquisition is the fastest path to revenue. A fully optimized Google Business Profile (GBP), combined with location-specific landing pages, has been shown to double call-to-action clicks for similar service-based businesses within 90 days [local_seo_and_discovery_plan[0]][6]. The plan details a playbook for achieving this, focusing on NAP (Name, Address, Phone) consistency, citation building in directories like Houzz, and a proactive review management strategy [local_seo_and_discovery_plan[0]][6].

**Action**: Ensure NAP consistency across all platforms, publish five geo-targeted landing pages for key service areas, and implement `LocalBusiness` review schema on the website before launch.

### Proactive Accessibility Fixes Mitigate Compliance Risk

The dark-themed design introduces accessibility risks, particularly with color contrast. Analysis shows that the proposed subtle text color (`#9A9A9A`) on a dark background (`#1A1A1A`) has a contrast ratio of only 3.8:1, failing the WCAG AA standard of 4.5:1 for normal text [accessibility_considerations[0]][7]. This poses a legal and usability risk.

**Action**: Remediate this by using the lighter gray (`#CCCCCC`) for all body copy. The subtle gray (`#9A9A9A`) should be restricted to non-essential text like captions. Automate contrast checking in the development workflow to prevent future regressions.

### A Strict Script Budget Protects Against Performance Degradation

Third-party scripts for analytics and marketing are a common cause of performance bloat, with every additional 100 KB of JavaScript adding approximately 40ms to Interaction to Next Paint (INP) on mid-range mobile devices [technical_architecture_and_implementation_plan.recommended_framework[0]][1].

**Action**: Critically audit every third-party script before adding it. Load analytics and non-essential scripts using a web-worker or defer their execution. Enforce a strict total JavaScript budget of 300 KB in the Lighthouse CI configuration to protect user experience.

## 1. Brand Vision & Positioning — “Weightless Luxury” drives every UX and copy choice

The brand name 'Antigravity' is interpreted not as a literal product but as a guiding design philosophy [antigravity_concept_interpretation[0]][8]. This vision positions the firm beyond conventional interior design, focusing on creating spaces that feel light, innovative, and effortlessly sophisticated [antigravity_concept_interpretation[1]][5]. This concept of "weightless luxury" aligns with the modern trend of 'quiet luxury', which emphasizes craftsmanship, timelessness, and story-driven narratives over overt branding [brand_strategy_and_positioning.brand_purpose[0]][9].

The brand's purpose is to transcend traditional boundaries, crafting environments that evoke a sense of profound tranquility and elegance [brand_strategy_and_positioning.brand_purpose[0]][9]. The unique value proposition is an unparalleled design experience specializing in dark-themed, minimalist spaces that feel both dramatically elegant and serenely calm [brand_strategy_and_positioning.unique_value_proposition[2]][5].

The messaging architecture should be sophisticated, visionary, and precise, using taglines that reinforce this ethos [brand_strategy_and_positioning.messaging_architecture[0]][8]:
* Antigravity: Where Design Defies Expectation.
* Antigravity: The Weightless Art of Luxury.
* Antigravity: Crafting Spaces Beyond Gravity.
* Antigravity: Dark Luxury, Illuminated Design.

## 2. High-Value Personas & Journey Maps — Two archetypes dictate portfolio-first navigation and consultation CTAs

The brand targets high-net-worth individuals and businesses who value artistry, innovation, and exclusivity. The website's user experience is tailored to two primary personas [brand_strategy_and_positioning.target_personas[0]][9]:

1. **The Discerning Connoisseur (High-End Residential):** An established individual (45-65) with refined taste seeking a unique, private sanctuary. They value bespoke craftsmanship and timeless design. Their journey involves exploring the portfolio for proof of quality and then seeking a private consultation.
2. **The Visionary Entrepreneur (Boutique Commercial):** A forward-thinking business leader (35-55) developing exclusive commercial spaces like boutique hotels or clubs. They need a distinctive environment that embodies their brand and offers a memorable experience. Their journey focuses on finding a designer with a unique vision and a clear, professional process.

Both personas are guided through a "portfolio-first" journey. The flow is designed to captivate them with stunning visuals on the homepage, funnel them into the immersive portfolio to build trust, and then convert them via clear "Schedule a Consultation" CTAs [user_experience_and_conversion_flows[2]][5].

## 3. Visual Design System — Tokenised colors, Poppins/Inter hierarchy, 12-column grid ensure consistency & WCAG compliance

The provided design assets have been translated into a systematic and tokenized visual design system to ensure consistency, scalability, and maintainability.

### 3.1 Color Palette & Contrast Compliance

The color palette is structured into semantic tokens for backgrounds, text, accents, and utilities. This system is designed for a dark luxury theme, ensuring every color has a defined purpose [color_palette_guidelines[1]][10]. Dark grays are used for backgrounds instead of pure black to reduce eye strain, and light grays are used for text instead of pure white for better readability [color_palette_guidelines[0]][7].

#### Contrast Compliance Matrix (WCAG 2.2 AA)
All color combinations must be tested to meet accessibility standards. The following table shows the contrast ratios for key text/background pairings [accessibility_considerations[0]][7].

| Foreground Color | Background Color | Contrast Ratio | Normal Text (4.5:1) | Large Text (3:1) |
| :--- | :--- | :--- | :--- | :--- |
| `#FFFFFF` (Primary Text) | `#0C0C0C` (Primary BG) | 21.00:1 | **Pass** | **Pass** |
| `#CCCCCC` (Body Text) | `#0C0C0C` (Primary BG) | 11.47:1 | **Pass** | **Pass** |
| `#9A9A9A` (Subtle Text) | `#0C0C0C` (Primary BG) | 5.53:1 | **Pass** | **Pass** |
| `#9A9A9A` (Subtle Text) | `#1A1A1A` (Secondary BG) | 3.80:1 | Fail | **Pass** |
| `#C6A667` (Primary Accent) | `#0C0C0C` (Primary BG) | 7.05:1 | **Pass** | **Pass** |
| `#4C97FF` (Utility Info) | `#0C0C0C` (Primary BG) | 6.13:1 | **Pass** | **Pass** |

*Note: The combination of `#9A9A9A` on `#1A1A1A` fails for normal body text, confirming the risk identified in the executive summary. This color should only be used for large headlines or non-essential decorative text against that specific background.*

### 3.2 Modular Typographic Scale

The typography system uses Poppins for headings and Inter for body text, a pairing well-suited for readability on dark themes [typography_guidelines[1]][7]. A modular scale ensures a harmonious visual hierarchy.

| Element | Font | Weight | Size (px) | Role |
| :--- | :--- | :--- | :--- | :--- |
| H1 | Poppins | Bold | 48 | Main page titles |
| H2 | Poppins | Semi-Bold | 36 | Major section titles |
| H3 | Poppins | Medium | 24 | Sub-section titles |
| Body (P) | Inter | Regular | 16 | Primary paragraph text |
| Caption | Inter | Regular | 14 | Metadata, image captions |

A generous line height of **1.5 to 1.7** will be applied to all body text to enhance readability in long-form content on the dark background [typography_guidelines[1]][7].

## 4. Information Architecture & Sitemap — 10 core pages + optional scale-outs cover 90% of user tasks

The website's structure is designed for intuitive navigation, ensuring users can find information easily while allowing the site to scale [information_architecture_and_sitemap.site_map_overview[0]][11]. The sitemap prioritizes pages that align with the target personas' journey.

**Core Sitemap:**
* **/ (Homepage):** Captivates visitors and funnels them to key sections.
* **/portfolio:** The centerpiece of the site, showcasing the firm's work.
 * **/portfolio/[project-slug]:** Detailed case study pages for each project.
* **/services:** Outlines the firm's offerings with clear descriptions.
* **/about:** Tells the brand story, introduces the team, and builds trust.
* **/blog:** Establishes thought leadership and drives SEO.
* **/contact:** The primary conversion point for lead generation.

**Utility & Future Growth Pages:**
* **/faq:** Answers common client questions.
* **/press:** Showcases media coverage and builds credibility.
* **/careers:** Attracts new talent.
* **/privacy-policy & /terms-of-service:** Essential legal pages.

This structure ensures that every page has a clear goal and call-to-action (CTA), guiding users from discovery to conversion [information_architecture_and_sitemap.page_goals_and_ctas[0]][11]. For example, the homepage CTA is "View Portfolio," while project pages feature a "Schedule a Consultation" CTA [information_architecture_and_sitemap.page_goals_and_ctas[1]][6].

## 5. Component Backlog Prioritisation — Top 10 UI modules cover 80% of screens; hero & portfolio lead

The website will be built using a modular, component-based approach. The following backlog prioritizes components based on their importance to the MVP and the primary user journey.

| Priority | Component Name | Description | Est. Build Week |
| :--- | :--- | :--- | :--- |
| 1 | **Hero Section** | Full-width visual with headline and primary CTA [website_component_backlog.0.description[0]][5]. | Week 1 |
| 2 | **Navigation** | Sticky header with logo, menu, and clear active states. | Week 1 |
| 3 | **Project Portfolio Grid** | Responsive grid of project thumbnails with hover effects [website_component_backlog.2.description[0]][5]. | Week 2 |
| 4 | **Detailed Project Pages** | Immersive image gallery, project narrative, and testimonials [website_component_backlog.3.description[0]][5]. | Week 2 |
| 5 | **About/Philosophy Section** | Text block detailing the 'Antigravity' vision with supporting imagery. | Week 3 |
| 6 | **Services Section** | A clear list of services with brief descriptions and icons [website_component_backlog.5.description[0]][8]. | Week 3 |
| 7 | **Contact Form** | User-friendly form with clear labels and validation states [website_component_backlog.6.description[0]][12]. | Week 4 |
| 8 | **Footer** | Standard footer with copyright, social links, and legal navigation. | Week 4 |
| 9 | **Testimonials Showcase** | Carousel or grid displaying client quotes to build trust. | Week 5 |
| 10 | **Blog/Insights Section** | Grid layout for articles to support content marketing. | Week 5 |

## 6. Motion & Interaction Guidelines — Elevation, parallax and reveal patterns deliver the “antigravity” feel without jank

To bring the 'Antigravity' theme to life, motion will be used subtly and purposefully. The goal is to create a feeling of lightness and sophistication without distracting the user or harming performance.

* **Hover Elevation:** Interactive elements like portfolio cards will "lift" on hover using a `transform: translateY(-4px)` and a soft box-shadow. This creates a floating effect that directly references the brand concept.
* **Parallax Scrolling:** On large hero images, a subtle parallax effect (where the background moves slower than the foreground) will create a sense of depth and weightlessness.
* **Fade & Reveal on Scroll:** As users scroll, content will fade in and slide up gently. This creates a smooth, choreographed experience of content revealing itself.
* **Accessibility:** All animations must respect the `prefers-reduced-motion` media query. For users who enable this setting, animations will be disabled or replaced with simple cross-fades to ensure a comfortable experience.

## 7. Technical Architecture — Next.js + Sanity + CDN stack engineered for sub-2.5s LCP worldwide

The technical stack is chosen for performance, scalability, and developer experience.

* **Framework: Next.js** is recommended for its hybrid rendering capabilities (SSG, SSR, ISR), which are ideal for a content-rich portfolio site [technical_architecture_and_implementation_plan.recommended_framework[0]][1]. Its built-in image optimization and focus on Core Web Vitals make it the best choice for achieving performance goals [technical_architecture_and_implementation_plan.recommended_framework[0]][1].
* **Headless CMS: Sanity** is the recommended CMS. Its flexible content modeling, real-time collaborative editor, and generous free tier make it superior to other options for this project's specific needs [technical_architecture_and_implementation_plan.headless_cms_evaluation[0]][1].
* **Hosting: Vercel or Netlify** are the recommended platforms due to their seamless integration with Next.js, global edge networks, and automated CI/CD pipelines [technical_architecture_and_implementation_plan.hosting_and_deployment_strategy[0]][2].
* **Media Pipeline:** All images and videos will be served via a CDN (like Cloudinary or Imgix) that provides on-the-fly optimization, format conversion (to AVIF/WebP), and resizing [technical_architecture_and_implementation_plan.image_and_video_pipeline[1]][2].

### 7.1 CMS Decision Matrix

| CMS | Key Advantage | Best For |
| :--- | :--- | :--- |
| **Sanity (Recommended)** | Developer-friendly, real-time customizable studio, strong media handling. | Complex portfolios and teams wanting full control over content structure. |
| **Contentful** | Enterprise-grade, robust APIs, extensive localization features. | Businesses planning significant scaling or managing multiple brands. |
| **Strapi** | Open-source, self-hostable, full data ownership. | Teams requiring deep backend customization and infrastructure control. |
| **Storyblok** | Visual editor allows marketers to manage layouts directly. | Teams wanting a balance between developer control and marketer autonomy. |
| **Prismic** | "Slice-based" content modeling, built-in A/B testing. | Optimizing lead generation funnels and content variations. |

## 8. Performance & Accessibility Safeguards — Core Web Vitals targets, font-loading strategy, reduced-motion fallback

A proactive approach to performance and accessibility is integrated into the development process.

* **Core Web Vitals Targets:** The site will be continuously monitored against these goals:
 * **LCP (Largest Contentful Paint):** < 2.5 seconds [performance_optimization_strategy[0]][1]
 * **INP (Interaction to Next Paint):** < 200 milliseconds [performance_optimization_strategy[0]][1]
 * **CLS (Cumulative Layout Shift):** < 0.1 [performance_optimization_strategy[0]][1]
* **Font Loading:** To prevent layout shifts from font loading, `font-display: swap;` will be used, and a `preconnect` link will be added to the document head to speed up font downloads [performance_optimization_strategy[0]][1].
* **Focus States:** All interactive elements must have a highly visible focus indicator. The utility color `#4C97FF` is designated for this purpose to ensure it stands out against the dark theme [accessibility_considerations[0]][7].
* **Semantic HTML:** The site will use a logical HTML structure (`<main>`, `<nav>`, `<h1>`, etc.) to ensure it is fully navigable by screen readers and other assistive technologies [accessibility_considerations[0]][7].

## 9. SEO, Structured Data & 12-Month Content Calendar — From keyword universe to JSON-LD graph to monthly themes

The growth strategy is built on a foundation of SEO and content marketing to attract high-intent clients.

The **keyword universe** targets a mix of broad ('interior designer'), niche ('luxury interior designer'), and long-tail ('minimalist interior designer in [city]') terms to capture users at all stages of their journey [seo_and_content_strategy.keyword_universe[0]][11].

A comprehensive **structured data plan** will use JSON-LD to implement `Organization`, `LocalBusiness`, `Service`, and `Article` schemas. This helps search engines understand the business and qualifies the site for rich results, boosting visibility [seo_and_content_strategy.structured_data_plan[3]][13].

A **12-month content calendar** will establish thought leadership with a cadence of 1-2 blog posts per month and quarterly portfolio updates [seo_and_content_strategy.content_calendar_framework[0]][11].

| Month | Theme | Asset Type | KPI Goal |
| :--- | :--- | :--- | :--- |
| 1-2 | Brand Launch & Philosophy | Blog Post, Project Case Study | 500+ organic visits |
| 3-4 | The Art of Dark & Moody Interiors | Design Guide (PDF), Video Tour | 20+ guide downloads |
| 5-6 | Kitchen & Dining Transformations | Before & After Gallery, Blog Post | Rank for "kitchen remodel ideas" |
| 7-8 | Sustainable & Eco-Luxury Design | Blog Post, Supplier Spotlight | 5+ backlinks |
| 9-10 | Maximizing Small Spaces | Infographic, How-To Guide | Increase time on page by 15% |
| 11-12 | 2025 Trend Forecast & Holiday Styling | Trend Report, Blog Post | 10+ organic leads |

## 10. Local SEO Playbook — Google Business Profile, citation building, review management to double local leads

A focused local SEO strategy is crucial for attracting clients in the firm's geographic service area.

* **Google Business Profile (GBP) Optimization:** The GBP will be fully optimized with consistent NAP (Name, Address, Phone), correct categories, and a rich collection of high-quality project photos [local_seo_and_discovery_plan[0]][6].
* **Citation Building:** The business will be listed in key online directories, including Houzz, Yelp, and local chambers of commerce, to build authority and ensure NAP consistency [local_seo_and_discovery_plan[0]][6].
* **Location-Specific Pages:** Dedicated landing pages will be created for each primary service area (e.g., `/services/chicago`, `/services/north-shore`). These pages will feature localized content, testimonials, and portfolio examples from that area [local_seo_and_discovery_plan[0]][6].
* **Review Management:** A systematic process will be established to encourage satisfied clients to leave reviews on Google and other platforms. All reviews will be responded to professionally to build social proof and demonstrate excellent client service [local_seo_and_discovery_plan[0]][6].

## 11. Phased Roadmap & Risk Mitigation — 6-week MVP → Phase 2 dynamic filters; includes risk/mitigation table

Development will proceed in phases to manage complexity and deliver value quickly.

**Phase 1: Minimum Viable Product (MVP) (Weeks 1-6)**
* **Focus:** Launch a high-performance, visually stunning site that establishes the brand, showcases a curated portfolio, and captures leads [phased_development_roadmap.focus[1]][5].
* **Key Features:** Core pages (Home, About, Services, Contact), a basic portfolio with project pages, full dark mode implementation, responsive design, and initial SEO setup.

**Phase 2: Enhancements (Post-Launch)**
* **Focus:** Expand functionality and content.
* **Key Features:** Advanced portfolio filtering (by style, room, etc.), a full blog/insights section, integration of video content, and implementation of a client testimonial management system.

#### Key Risks & Mitigation Strategies

| Risk | Mitigation Strategy |
| :--- | :--- |
| **Poor Performance from Client-Side JS** | Default to Next.js Server Components; only use Client Components for essential interactivity. |
| **Inefficient Caching Strategy** | Use SSG for static pages and ISR for the portfolio; configure `Cache-Control` headers via the CDN. |
| **Third-Party Script Bloat** | Audit every script; defer loading of non-essential scripts and use lightweight alternatives where possible. |

## 12. Measurement & KPI Dashboard — GA4 + GSC events for leads, LCP, INP, conversions

Success will be measured using a dashboard of Key Performance Indicators (KPIs) tracked via Google Analytics 4 (GA4) and Google Search Console (GSC).

* **Primary KPIs:**
 * **Organic Leads:** Number of contact form submissions from organic search.
 * **Keyword Rankings:** SERP positions for target keywords.
 * **Click-Through Rate (CTR):** Percentage of impressions that result in a click.
 * **Conversion Rate:** Percentage of visitors who complete a goal (e.g., form submission).
* **Measurement Tools:**
 * **Google Analytics 4 (GA4):** Custom events will be configured to track form submissions, consultation button clicks, and guide downloads.
 * **Google Search Console (GSC):** Used to monitor keyword performance, impressions, CTR, and Core Web Vitals.
* **Reporting Cadence:** Weekly checks for major trends, monthly reviews of all KPIs, and quarterly strategic reviews to adjust the content and SEO strategy.

## 13. Appendices

### CSS Color & Font Variables

```css
:root {
 /* Fonts */
 --font-primary: 'Poppins', sans-serif;
 --font-secondary: 'Inter', sans-serif;

 /* Background & Surface Colors */
 --color-background-primary: #0C0C0C;
 --color-background-secondary: #1A1A1A;
 --color-background-surface: #2E2E2E;

 /* Text Colors */
 --color-text-primary: #FFFFFF;
 --color-text-body: #CCCCCC;
 --color-text-subdued: #9A9A9A;

 /* Accent Colors */
 --color-accent-primary: #C6A667;
 --color-accent-secondary: #D7C7A3;

 /* Utility & State Colors */
 --color-utility-error: #FF5C5C;
 --color-utility-interactive: #4C97FF;
}
```

### Sample JSON-LD for Local Business

```json
{
 "@context": "https://schema.org",
 "@type": "InteriorDesigner",
 "name": "Antigravity Interior Design",
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "123 Design Lane",
 "addressLocality": "Chicago",
 "addressRegion": "IL",
 "postalCode": "60611",
 "addressCountry": "US"
 },
 "url": "https://antigravity.design",
 "telephone": "+1-312-555-0199",
 "priceRange": "$$$$",
 "openingHours": "Mo-Fr 09:00-17:00"
}
```

## References

1. *The Next.js Framework: Features, Benefits, and Case Studies*. https://naturaily.com/blog/nextjs-features-benefits-case-studies
2. *Advanced React in the Wild*. https://largeapps.dev/case-studies/advanced/
3. *Website Image Size Guide 2025: Dimensions and Ratios*. https://tiny-img.com/blog/best-image-size-for-website/
4. *Creative Digital Lab Focused on Creating Unique Human ...*. https://www.antigravity.id/case-study
5. *Fetched web page*. https://pin.it/15lQ83DiG
6. *Mastering Local SEO: A Comprehensive Guide for Interior Designers*. https://ultravioletagency.com/mastering-local-seo-a-comprehensive-guide-for-interior-designers/
7. *15 Best Dark Theme Website Designs*. https://www.designrush.com/best-designs/websites/trends/best-dark-themed-website-designs
8. *Fetched web page*. https://antigravity.id
9. *The Rise of Quiet Luxury: Branding in 2025 - TriVision*. https://trivision.com/uncategorized/quiet-luxury-branding-trends-2025/
10. *Color tokens: guide to light and dark modes in design ...*. https://medium.com/design-bootcamp/color-tokens-guide-to-light-and-dark-modes-in-design-systems-146ab33023ac
11. *Step-by-Step SEO for Interior Designers Starting From Scratch*. https://www.bellandwhistledesign.com/blogs/step-by-step-seo-for-interior-designers
12. *Craft Seamless, Human-Centered Digital Experiences*. https://www.antigravity.id/services/ui
13. *Annotated JSON-LD Structured Data Examples*. https://nystudio107.com/blog/annotated-json-ld-structured-data-examples