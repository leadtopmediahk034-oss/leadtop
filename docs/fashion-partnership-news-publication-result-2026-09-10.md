# Fashion partnership test news — publication result

- Published: 2026-09-10 17:32:14 CST
- WordPress post ID: `40`
- WordPress status: `publish`
- Slug: `fashion-brand-marketing-partnership-test`
- Public URL: <https://www.leadtopmedia.com/blog/fashion-brand-marketing-partnership-test>
- Featured media ID: `41`

## Publication outcome

- Published only post ID `40`; its title, copy, excerpt, category, author, and featured-media relationship were preserved.
- Retained the `[测试稿]` title prefix and visible disclosure that the partner name and cooperation details are placeholders.
- No other WordPress post or media record was modified.
- A repository documentation deployment was used to clear the pre-publication Vercel 404 static cache because no configured content-revalidation webhook was available to the operator.

## Validation evidence

- WordPress server-side readback reported status `publish`, the intended slug, publication timestamp, and featured media ID `41`.
- WordPress REST API returned post ID `40` as a published post with the complete body.
- Public article URL returned HTTP 200.
- Public `/blog` returned HTTP 200 and included the new article slug.
- Featured image returned HTTP 200 with `image/png` content type.
- Public HTML contained the title, excerpt, featured image, descriptive alt text, four article H2 sections, article table of contents, canonical URL, and Open Graph image.
- Public HTML did not contain a `noindex` robots directive.
- The public article was opened in a visible in-app browser tab with the expected page title. Deeper automated browser attachment timed out, so live mobile interaction was not re-measured in this release; the same responsive article template had passed desktop and 390 × 844 checks in the immediately preceding template release.

## Backup and rollback

- Pre-publish snapshot: `.codex-backups/fashion-partnership-publish-20260910-173140/pre-publish-snapshot.md`.
- Content source: `docs/drafts/fashion-brand-marketing-partnership-test.md`.
- Image source: `docs/drafts/images/fashion-brand-marketing-partnership-test.png`.
- Rollback: set only WordPress post ID `40` back to `draft`; retain media ID `41` and all existing content.
- Backup retained because this is a test article and has no performance validation window.

## Remaining editorial requirement

Before treating this page as a real partnership announcement, replace the unnamed partner and placeholder scope with customer-approved facts, complete a final factual/legal review, and remove the test disclosure only after that approval.
