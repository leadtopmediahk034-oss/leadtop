# Legacy service page restoration

## Scope

Seven WordPress service pages were restored into the current Next.js application under the same service slugs:

- `/services/websitedesign`
- `/services/mediabuy`
- `/services/ads`
- `/services/ui`
- `/services/socialmedia`
- `/services/incubation`
- `/services/consultation`

## Content mapping

Each page preserves the original page proposition, descriptive copy, service lists, process steps, performance figures, related-service links, and final consultation CTA. Obvious legacy input errors were normalized, including duplicated words, misspelled platform names, broken punctuation, and the phrase `长夜模式调研`, which was restored as `商业模式调研` based on context.

## Asset mapping

Service-specific source images were downloaded from the legacy WordPress uploads directory into `public/leadtop/services-legacy/`. Common legacy footer artwork, QR codes, logos, and repeated decorative group images were intentionally excluded because the current shared navigation and footer remain authoritative.

The creative-design page retains all eight legacy visual examples. Other pages retain their original hero, platform, strategy, training, or consultation images as appropriate.

## Integration

The pages use a shared data-driven service template, static route generation, route-specific metadata, local Open Graph images, shared `SiteHeader` and `SiteFooter`, and the existing warm-white, navy, orange, 8px-card visual language. Solutions navigation, footer service links, and About-page service cards now point to the restored routes.
