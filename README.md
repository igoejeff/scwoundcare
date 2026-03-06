# Carolina Wound Care — Website

A modern, professional, mobile-first static website for **Carolina Wound Care**, a specialized wound care clinic in Aiken, SC offering both in-clinic and true mobile in-home visits across all 46 South Carolina counties.

---

## 🌐 Project Overview

**Site URL:** https://scwound.com/
**Brand Colors:** Teal `#2A9D8F` · Blue `#264653` · White `#FFFFFF`
**Phone:** 866-540-8090
**Email:** info@scwound.com
**Aiken Address:** 511 Grier Court, Aiken, SC 29803
**Charleston Address:** 2 Carriage Lane, Suite 101, Charleston, SC 29407
**Service Area:** All 46 South Carolina counties (mobile visits)

---

## ✅ Completed Pages & Features (24 pages)

### Core Pages
| File | Page | Description |
|---|---|---|
| `index.html` | Home | Hero, trust strip, stats, features, how-it-works, services preview, conditions preview, in-home value prop, testimonials (6), insurance, locations preview, CTAs. **JSON-LD LocalBusiness+MedicalClinic+FAQPage schema** |
| `about.html` | About Us | Mission, who we are, values (6), what makes us different, locations/SC map |
| `services.html` | Services | Debridement, grafts/biologics, specialized dressings, personalized care plans, in-clinic vs in-home compare, FAQ accordion |
| `conditions.html` | Conditions We Treat | 5 full condition deep-dives, "Is This For You" criteria grid, 1-minute interactive wound quiz |
| `team.html` | Our Team | Board-certified team profiles (5 roles), credentials explained (CWCN/WCS/InteliWound), careers section. **MedicalOrganization JSON-LD** |
| `resources.html` | Resources | 4 Stages of Healing, nutrition tips, wound care glossary, FAQ accordion, urgent warning banner |
| `locations.html` | Locations & Mobile Care | Aiken + Charleston clinic details, Google Maps embeds, mobile service, all 46 SC counties grid |
| `contact.html` | Contact | GHL embedded form, contact info panel, hours, insurance checker, map |
| `referral.html` | Refer a Patient | Provider referral form with urgency selector, HIPAA notice |
| `practitioner-partners.html` | Practitioner Partners | Public page for healthcare facilities & providers — hero, 6 differentiators, 4-step how-it-works, testimonials |
| `faq.html` | FAQ | 38 questions with FAQPage JSON-LD schema |

### Learn / Blog Pages
| File | Page | Description |
|---|---|---|
| `blog.html` | Blog & Articles | Post grid with category filter, featured post, load-more, sidebar |
| `blog-why-wound-wont-heal.html` | Blog: Why Won't My Wound Heal | Full article |
| `blog-diabetic-foot-ulcers.html` | Blog: Diabetic Foot Ulcers | Full article |
| `blog-venous-leg-ulcers.html` | Blog: Venous Leg Ulcers | Full article |
| `blog-pressure-ulcers.html` | Blog: Pressure Ulcers / Bed Sores | Full article |
| `blog-wound-infection-signs.html` | Blog: Wound Infection Signs | Full article |
| `blog-nutrition-wound-healing.html` | Blog: Nutrition for Healing | Full article |
| `blog-4-stages-wound-healing.html` | Blog: 4 Stages of Wound Healing | Full article |
| `blog-first-visit.html` | Blog: What to Expect at First Visit | Full article |
| `blog-mobile-wound-care.html` | Blog: Mobile Wound Care | Full article |
| `blog-wound-care-myths.html` | Blog: Wound Care Myths | Full article |
| `blog-home-wound-care.html` | Blog: Home Wound Care Tips | Full article |
| `blog-preventing-amputations.html` | Blog: Preventing Amputations | Full article |
| `blog-post-surgical-wound-care.html` | Blog: Post-Surgical Wound Care | Full article |

### Local SEO Pages
| File | Page | Description |
|---|---|---|
| `wound-care-aiken-sc.html` | Local SEO: Aiken | City landing page for Aiken wound care searches |
| `wound-care-charleston-sc.html` | Local SEO: Charleston | City landing page for Charleston wound care searches |

### Special / Utility Pages
| File | Purpose | Notes |
|---|---|---|
| `landing.html` | Paid traffic landing page | Custom minimal navbar, no standard menu |
| `partner.html` | Partner overview page | GHL form embed |

### Assets
| File | Description |
|---|---|
| `css/style.css` | Global styles, CSS variables, navbar, hero, buttons, footer, responsive breakpoints |
| `css/components.css` | Service cards, condition cards, quiz styles, healing stages, locations, criteria boxes, form success states |
| `js/main.js` | Navbar scroll, mobile menu, scroll reveal, counter animation, accordion, contact form submission (REST API), wound quiz engine |
| `sitemap.xml` | XML sitemap with 24 pages, priority tiers, image sitemaps |
| `robots.txt` | SEO crawl directives |
| `_headers` | Cache-control and security headers |
| `_redirects` | Redirect rules |

---

## 🔑 Key Features

- **Mobile-first responsive design** — optimized for all screen sizes
- **Interactive 1-minute wound quiz** (6 questions, 4 result tiers with urgency scoring)
- **JSON-LD structured data** — LocalBusiness+MedicalClinic+FAQPage on homepage; MedicalOrganization on team page; FAQPage on faq.html
- **Contact form** via GoHighLevel (GHL) embed — linked to MyPracticeLaunch CRM
- **Full navbar with dropdown menus** — "Our Care" and "Learn" dropdowns; Practitioner Partners link in every page's Our Care dropdown and mobile menu
- **Scroll reveal animations** throughout all pages
- **Animated stat counters** on homepage
- **FAQ accordions** on services, resources, team pages
- **Google Maps embeds** on locations and contact pages
- **All 46 SC counties grid** on locations page
- **AI-optimized copy** — conversational, citable by Google AI Overviews, ChatGPT, Perplexity
- **E-E-A-T signals** — credential chips, author bylines on blog posts, board-certification badges
- **"Last Updated: March 2026"** footer badge on all pages

---

## 📡 API Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `tables/contact_requests` | Save appointment/consultation requests from contact form |

### Data Table: `contact_requests`
| Field | Type | Description |
|---|---|---|
| `first_name` | text | Patient first name |
| `last_name` | text | Patient last name |
| `phone` | text | Phone number |
| `email` | text | Email address |
| `visit_type` | text | `in-clinic` or `home-visit` |
| `address` | text | Address for home visits |
| `condition` | text | Primary wound condition |
| `wound_duration` | text | How long wound has been present |
| `insurance` | text | Insurance type |
| `message` | rich_text | Additional notes |
| `preferred_contact` | text | Phone / text / email |
| `submitted_at` | datetime | Submission timestamp |

---

## 🗺️ Navigation Structure

```
Home (index.html)
├── About Us (about.html)
├── Our Care (dropdown)
│   ├── Services (services.html)
│   ├── Conditions We Treat (conditions.html)
│   ├── Request Home Visit (contact.html#home-visit)
│   ├── Practitioner Partners (practitioner-partners.html)   ← teal accent
│   └── Free Wound Quiz (conditions.html#quiz)               ← teal accent
├── Learn (dropdown)
│   ├── Resources Hub (resources.html)
│   ├── Blog & Articles (blog.html)
│   └── FAQ (faq.html)
├── Blog (blog.html)
├── Locations (locations.html)
├── Contact (contact.html)
└── Refer a Patient (referral.html)                          ← teal accent
```

---

## 🔍 SEO Keywords Targeted

- `wound care Aiken SC`
- `mobile wound care South Carolina`
- `chronic wound treatment at home`
- `diabetic foot ulcer treatment SC`
- `wound care specialist South Carolina`
- `in-home wound care South Carolina`
- `pressure wound treatment at home`
- `wound care near me South Carolina`
- `wound care Charleston SC`

---

## ⚙️ Third-Party Integrations

| Service | Purpose | Domain |
|---|---|---|
| GoHighLevel (MyPracticeLaunch) | Contact & referral forms | `link.mypracticelaunch.com` |
| YouTube | Video embed on homepage & practitioner-partners page | `NRleCd-WoN8` |
| Google Fonts | Inter typeface | `fonts.googleapis.com` |
| Font Awesome 6.4 | Icons | `cdn.jsdelivr.net` |

---

## 🚀 Deployment

To make this site live, go to the **Publish tab** to deploy with one click.
Live URL: **https://scwound.com**

---

## 📝 Recommended Next Steps

1. **Replace Google Maps embed** with accurate coordinates for 511 Grier Court, Aiken SC and 2 Carriage Lane, Charleston SC
2. **Add real team photos** to the team.html page (placeholder icon cards currently displayed)
3. **Connect email notifications** so staff receive form submissions instantly
4. **Add Google Analytics / Tag Manager** for traffic and conversion tracking
5. **Set up Google My Business** and link review profiles to the footer social icons
6. **Add more blog articles** for ongoing SEO (12 published; targeting 25+)
7. **Integrate live chat** (e.g., Tidio or Intercom) for immediate patient inquiries
8. **HIPAA-compliant form submission** service if collecting PHI beyond contact info
9. **Verify GHL SSL** — `link.mypracticelaunch.com` CNAME set to `brand.ludicrous.cloud` in Hover DNS; GHL whitelabel domain re-added; SSL provisioning in progress (~24h)
10. **Validate JSON-LD schema** using Google's Rich Results Test at https://search.google.com/test/rich-results after deploying

