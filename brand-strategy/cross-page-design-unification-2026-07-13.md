# Cross-page design unification

## Scope

- Unify homepage, Polaris, and Helios typography around the Helios display scale.
- Replace the homepage capability tabs with a vertical sticky card stack inspired by Paddle's static features interaction.
- Place the Polaris hero copy on the left and limit backdrop blur to a borderless, feathered area behind the copy.
- Use the homepage's complete mega-menu header and full six-column footer as the shared site chrome on the homepage, Polaris, and Helios.
- On Polaris and Helios, homepage-only fragment destinations resolve to `/`, while direct Polaris and Helios page links remain available.
- Use shared `--font-site`, body-size, small-text, and line-height tokens across homepage content, Polaris, and Helios.
- Match homepage `h2` and `h3` typography to Helios, including the Latin and Chinese font stack, size, weight, and line height.
- Load Varela Round through `next/font` at the root layout so Latin headings render with the intended face while Chinese headings share the PingFang SC fallback.

## Interaction model

- Capability cards use native CSS sticky positioning. Each card remains readable while the following card slides over it.
- Mobile and tablet layouts return to a normal one-column document flow.
- Reduced transparency uses a solid copy surface in the Polaris hero.
- The duplicate Polaris product mark inside the hero is removed because the shared site header already carries the Leadtop identity.

## Boundaries

- Existing route slugs, section IDs, form fields, content, and page-specific feature interactions remain unchanged.
- No Vercel deployment is part of this iteration.

## Polaris section flow

- Polaris follows the Helios section-shell contract: one shared 1440px maximum content width with responsive gutters and natural section height.
- Content-heavy sections expand to show their complete contents instead of being compressed into viewport-based heights.
- The B2B diagnosis form uses its own section, separate from FAQ, and proof-card visuals participate in normal card flow to prevent overlap.
- Homepage, Polaris, Helios, and the shared navigation use a 1680px maximum desktop content width.
- Mobile heroes use a compact 560px stage with tighter photographic framing; Polaris and Helios place their copy at the upper left below the shared navigation.
- On desktop, the homepage banner reserves 118px for the partner-media strip so both areas appear within one viewport.
