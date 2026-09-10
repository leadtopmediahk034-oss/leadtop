# Blog article scroll UI release result

- Date: 2026-09-10 (Asia/Shanghai)
- Approved scope: remove the article-end CTA, keep the desktop article table of contents visible while scrolling, add a sticky mobile table-of-contents bar, and make the shared site header hide on downward scroll and return on upward scroll.
- Production commit: `5040652`
- Production URL: <https://www.leadtopmedia.com/blog/38-2>

## Backup and rollback

- Pre-change backup: `.codex-backups/blog-article-scroll-ui-20260910-163117/`
- Baseline commit: `5cdcbfd`
- Scope: the five source files changed by this release plus a pre-change patch.
- Restore method: copy the backed-up files to their recorded repository paths, or revert production commit `5040652` after reviewing the revert diff.
- Retention: preserved because this release has only immediate functional validation and no long-term behavioral or conversion measurement window.

## Changes released

- Removed the article CTA containing “让下一次全球增长 更清晰”.
- Moved the desktop table of contents into a full-height rail so its sticky positioning remains active through the article body.
- Added a collapsed-by-default mobile table-of-contents bar that stays near the top of the viewport and moves upward when the shared header is hidden.
- Added direction-aware scrolling behavior to the shared site header: downward scrolling hides it, upward scrolling or returning near the top reveals it.
- Kept the header visible while a navigation menu is open or receives keyboard focus.
- Added reduced-motion handling for the header transition.

## Validation evidence

- `git diff --check`: passed.
- `npm run build`: passed; 21 pages generated successfully, including `/blog/38-2` and all service routes.
- Local desktop check at 1440 × 900: the table of contents stayed at approximately 32 px from the viewport top; the shared header hid on downward scroll and returned on upward scroll; the removed CTA was absent.
- Local mobile check at 390 × 844: the mobile table of contents rendered collapsed, expanded to show all four headings, stayed at approximately 12 px while the header was hidden, and moved below the restored header without overlap.
- Shared-header regression check: `/`, `/blog`, `/cases`, and `/services/ads` all switched to the hidden state on downward scroll; opening the mobile menu restored the header.
- Production HTML check: HTTP 200; `mobileTocShell` and `tocRail` were present; the removed CTA phrase and `articleCta` were absent.
- Production route checks: `/blog`, `/cases`, `/services/ads`, and `/blog/38-2?release=5040652` returned HTTP 200. The first `/` request had a transient TLS connection error during the batch request and does not contradict the successful deployment or route-specific checks.
- Production browser UI attachment timed out twice, so production interaction evidence is limited to public HTTP/HTML checks; full scrolling interaction was verified locally against the production build source.

## Files changed

- `app/blog/Blog.module.css`
- `app/blog/[slug]/ArticleToc.jsx`
- `app/blog/[slug]/page.jsx`
- `components/LeadtopHomepage.module.css`
- `components/SiteChrome.jsx`
- `docs/blog-article-scroll-ui-preparation-2026-09-10.md`
- `docs/blog-article-scroll-ui-result-2026-09-10.md`

## Remaining content note

The published test post still uses the existing untitled/placeholder CMS content. This release changes presentation and scrolling behavior only; it does not rewrite or publish article content.
