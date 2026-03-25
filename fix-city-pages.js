#!/usr/bin/env node

// Run from your project root: node fix-city-pages.js
// This adds Header and Footer imports + components to all city service pages

const fs = require('fs')
const path = require('path')

const serviceDirs = [
  'app/foundation-repair',
  'app/basement-waterproofing',
  'app/drainage',
  'app/crawl-space-encapsulation',
  // Add these as you build them:
  // 'app/crawl-space-waterproofing',
  // 'app/crawl-space-repair',
  // 'app/cocnrete-repair',
]

const cities = [
  'lawrenceville',
  'marietta',
  'roswell',
  'alpharetta',
  'decatur',
  'sandy-springs',
  'stone-mountain',
]

let fixed = 0
let skipped = 0

for (const dir of serviceDirs) {
  for (const city of cities) {
    const filePath = path.join(dir, city, 'page.js')
    
    if (!fs.existsSync(filePath)) {
      continue
    }

    let content = fs.readFileSync(filePath, 'utf-8')

    // Skip if already has Header import
    if (content.includes("import Header from")) {
      console.log(`SKIP (already has Header): ${filePath}`)
      skipped++
      continue
    }

    // 1. Add imports after "import Link from 'next/link'"
    content = content.replace(
      "import Link from 'next/link'",
      "import Link from 'next/link'\nimport Header from '../../components/Header'\nimport Footer from '../../components/Footer'"
    )

    // 2. Add <Header /> after the first <> in the return statement
    // Find the first standalone <> (the fragment opening)
    content = content.replace(
      /return \(\s*\n\s*<>/,
      'return (\n    <>\n      <Header />'
    )

    // 3. Add <Footer /> before the last </> (the fragment closing)
    // Find the last </> and insert Footer before it
    const lastFragmentClose = content.lastIndexOf('</>')
    if (lastFragmentClose !== -1) {
      content = content.slice(0, lastFragmentClose) + '<Footer />\n    </>' + content.slice(lastFragmentClose + 3)
    }

    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`FIXED: ${filePath}`)
    fixed++
  }
}

console.log(`\nDone! Fixed: ${fixed}, Skipped: ${skipped}`)