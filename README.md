# Carolina Wound Care — Website

A modern, professional, mobile-first static website for **Carolina Wound Care / South Carolina Wound Care**, a specialized wound care clinic in Aiken, SC offering both in-clinic and true mobile in-home visits.

---

## 🌐 Project Overview

**Brand Colors:** Teal `#2A9D8F` · Gray `#9AA5B4` · White `#FFFFFF`
**Phone:** 866-540-8090
**Address:** 511 Grier Court, Aiken, SC 29803
**Service Area:** All 46 South Carolina counties (mobile visits)

---

## ✅ Completed Pages & Features

### Pages
| File | Page | Description |
|---|---|---|
| `index.html` | Home | Hero, trust strip, stats, features, how-it-works, services preview, conditions preview, in-home value prop, testimonials (6), insurance, locations preview, CTAs |
| `about.html` | About Us | Mission, who we are, values (6), what makes us different, locations map |
| `services.html` | Services | Debridement, grafts/biologics, specialized dressings, personalized care plans, in-clinic vs in-home compare, FAQ accordion |
| `conditions.html` | Conditions We Treat | 5 full condition deep-dives (diabetic, venous, arterial, pressure, post-surgical, sacral), "Is This For You" criteria grid, 1-minute interactive wound quiz |
| `resources.html` | Resources | 4 Stages of Healing (detailed), nutrition tips (6), wound care glossary (9 terms), FAQ accordion, urgent warning banner |
| `locations.html` | Locations & Mobile Care | Aiken clinic details + Google Maps embed, mobile service hero, how mobile visits work (4 steps), facility types (6), all 46 SC counties grid |
| `contact.html` | Contact | Appointment form with visit-type selector, contact info panel, hours, insurance checker, map, form submits to REST API |

### Assets
| File | Description |
|---|---|
| `css/style.css` | Global styles, CSS variables, navbar, hero, buttons, footer, responsive breakpoints |
| `css/components.css` | Service cards, condition cards, quiz styles, healing stages, locations, criteria boxes, form success states |
| `js/main.js` | Navbar scroll, mobile menu, scroll reveal, counter animation, accordion, contact form submission (REST API), wound quiz engine |

---

## 🔑 Key Features

- **Mobile-first responsive design** — optimized for all screen sizes
- **Interactive 1-minute wound quiz** (6 questions, 4 result tiers with urgency scoring)
- **Contact form** with visit type toggle (in-clinic / home visit), HIPAA notice, saves to REST API
- **Scroll reveal animations** throughout all pages
- **Animated stat counters** on homepage
- **FAQ accordions** on services and resources pages
- **Google Maps embed** on locations and contact pages
- **SEO-optimized** meta tags, semantic HTML, canonical URLs
- **ARIA accessibility** labels and roles throughout

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

## 🔍 SEO Keywords Targeted

- `wound care Aiken SC`
- `mobile wound care South Carolina`
- `chronic wound treatment at home`
- `diabetic foot ulcer treatment SC`
- `wound care specialist South Carolina`
- `in-home wound care South Carolina`
- `pressure wound treatment at home`

---

## 🗺️ Navigation Structure

```
Home (index.html)
├── About Us (about.html)
├── Services (services.html)
│   ├── #debridement
│   ├── #grafts
│   ├── #dressings
│   └── #careplans
├── Conditions We Treat (conditions.html)
│   ├── #diabetic
│   ├── #venous
│   ├── #arterial
│   ├── #pressure
│   ├── #surgical
│   ├── #sacral
│   └── #quiz (1-Minute Wound Assessment Quiz)
├── Resources (resources.html)
├── Locations & Mobile Care (locations.html)
└── Contact (contact.html)
```

---

## 🚀 Deployment

To make this site live, go to the **Publish tab** to deploy with one click.

---

## 📝 Recommended Next Steps

1. **Replace Google Maps embed** with accurate coordinates for 511 Grier Court, Aiken SC
2. **Add real team photos** to the About page team section
3. **Connect email notifications** so staff receive form submissions instantly
4. **Add Google Analytics / Tag Manager** for traffic and conversion tracking
5. **Set up Google My Business** and link review profiles to the footer social icons
6. **Add blog/articles section** for ongoing SEO content (wound care tips, patient education)
7. **Integrate live chat** (e.g., Tidio or Intercom) for immediate patient inquiries
8. **HIPAA-compliant form submission** service if collecting PHI beyond contact info
