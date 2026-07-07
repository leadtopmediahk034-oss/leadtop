# Design

## Overview

Leadtop Polaris is a premium B2B marketing-services landing page for domestic Chinese companies evaluating overseas inquiry growth solutions. The visual system should feel like a serious growth consultancy with strong execution capability.

## Color

Mood phrase: export growth command center, white boardroom clarity, deep ink structure, amber signal lights.

```css
:root {
  --bg: oklch(1 0 0);
  --surface: oklch(0.975 0.006 250);
  --surface-strong: oklch(0.94 0.012 250);
  --ink: oklch(0.18 0.035 254);
  --muted: oklch(0.43 0.025 255);
  --primary: oklch(0.64 0.15 74);
  --primary-dark: oklch(0.36 0.09 72);
  --accent: oklch(0.25 0.08 250);
  --accent-soft: oklch(0.92 0.025 250);
  --line: oklch(0.88 0.012 250);
  --white: oklch(1 0 0);
}
```

Color strategy: restrained-to-committed. The page stays mostly white and ink-blue, while amber gold is used for CTAs, key system lines, and emphasis.

## Typography

Use system Chinese font stacks for production reliability:

- Display/body: `Inter, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif`
- Numerals and compact labels use the same family, with weight/size contrast rather than a separate mono font.

Headings should use tight but safe tracking, never below `-0.03em`. Body copy should stay within 65-75ch.

## Layout

- Desktop max content width: 1180px.
- Hero: asymmetric two-column layout, copy on the left and a custom growth-system diagram on the right.
- Sections alternate between full-width white and quiet blue-tinted surfaces.
- Use cards only for repeated modules and proof items; no nested cards.
- CTA form area should feel like a diagnostic console, not a generic contact form.

## Components

- Header: compact sticky navigation with primary CTA.
- Buttons: filled primary amber for main CTA, outlined ink for secondary CTA.
- System diagram: three vertical/horizontal pillars for Traffic, Conversion, Trust connected to inquiry output.
- Comparison table: simple, high-contrast rows.
- FAQ: native details/summary accordions.

## Motion

Subtle reveal animations for hero diagram and section groups. Content must remain visible by default. Respect `prefers-reduced-motion`.
