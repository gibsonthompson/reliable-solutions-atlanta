# Reliable Solutions Atlanta Website

Next.js website for Reliable Solutions Atlanta - Waterproofing & Foundation Repair.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
reliable-solutions-atlanta/
├── app/
│   ├── globals.css      # Global styles + Tailwind
│   ├── layout.js        # Root layout with metadata
│   └── page.js          # Homepage
├── public/
│   └── images/
│       └── logo.png     # Company logo
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── next.config.js       # Next.js configuration
└── package.json
```

## Colors

The site uses Reliable Solutions Atlanta's brand colors:
- Primary Blue: `#115997`
- Dark Blue: `#273373`
- Light Blue: `#84d2f2`
- Medium Blue: `#2692cc`

## Deployment to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Deploy

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## TODO

- [ ] Add real portfolio images
- [ ] Create individual service pages
- [ ] Create About page
- [ ] Create Contact page
- [ ] Create Portfolio page
- [ ] Create Service Area page
- [ ] Set up form handling (e.g., Formspree, EmailJS)
- [ ] Add Google Analytics
- [ ] Add schema markup for SEO
