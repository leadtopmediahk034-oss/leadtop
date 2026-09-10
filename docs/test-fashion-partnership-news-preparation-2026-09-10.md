# Test fashion partnership news — stage 9 preparation

- Prepared: 2026-09-10 (Asia/Shanghai)
- SOP stage: Stage 9 — content production and page optimization
- Applicable gate: content facts, imagery, page fields, and publication state must be reviewed before public release.
- Current authorization: preparation and read-only inspection only.

## Requested outcome

Create a WordPress backend article about Leadtop reaching a marketing cooperation with a clothing brand, accompanied by a suitable generated image.

## Safe working assumption

No clothing-brand name, contract terms, campaign markets, channels, dates, spokesperson quotes, or measurable results were supplied. The first version will therefore be an unmistakable test draft rather than a public claim:

- Working title: `[测试稿] Leadtop 与服装品牌开启海外数字营销合作`
- Partner reference: `某服装品牌（待替换）`
- No invented statistics, customer quotes, contract value, performance results, or named third-party endorsement.
- WordPress state: `草稿`; public publishing is outside this prepared scope.

## Proposed content package

- Chinese news article, approximately 700–1,000 Chinese characters.
- Structure: announcement summary; cooperation background; planned marketing scope; phased approach; expected collaboration direction; closing note.
- Excerpt: 60–100 Chinese characters that clearly labels the item as a test draft.
- Slug: `fashion-brand-marketing-partnership-test`.
- Category: retain the currently available `未分类` category unless a suitable existing category appears in the authenticated editor.
- One original hero/featured image at 1200 × 630, optimized for web delivery.
- Visual direction: premium editorial fashion campaign planning scene, warm cream and restrained orange accents aligned with Leadtop’s site palette, apparel rack and campaign mood boards, no recognizable logo, no embedded words, no identifiable real person.
- Featured-image alt text: `服装品牌与数字营销团队共同规划海外推广合作的创意工作场景`.

## Existing evidence and constraints

- The public article template reads WordPress title, excerpt, featured image, category, headings, and article body.
- The public WordPress REST endpoint currently exposes only the default `未分类` category in the unauthenticated response.
- The existing test article demonstrates that a missing title, excerpt, and featured image produces an incomplete front-end page; this draft will fill all three fields.
- The backend post endpoint requires authentication, so the final field set must be confirmed inside the logged-in WordPress editor.

## Systems and data affected

- WordPress post collection on `cms.leadtopmedia.com`: one new draft post only.
- WordPress media library: one generated image upload only.
- Local repository: this preparation record and, after execution, a result record. No production frontend source change is planned.

## Backup and rollback plan

- Immediately before the first WordPress write, record a timestamped baseline of the visible post list and media list in `.codex-backups/` without storing credentials.
- Keep the generated source image locally before upload.
- The new content remains a draft, providing a native recoverable version and preventing public exposure.
- Rollback: move only the newly created draft and its newly uploaded image to the WordPress trash after resolving their exact IDs; do not touch existing posts or shared media.
- Backups and baseline evidence will be retained after task completion.

## Acceptance criteria

- Draft title, excerpt, body, slug, category, and featured image are populated.
- Heading hierarchy uses one page title followed by H2 sections without skipped levels.
- Copy clearly identifies placeholder facts and contains no fabricated commercial proof.
- Hero image is 1200 × 630, has no fake logo/text, renders correctly, and has descriptive alt text.
- Draft preview works on desktop and mobile without empty hero/title fields.
- No public publish action occurs in this stage.

## Ordered execution after approval

1. Capture the pre-write WordPress post/media baseline.
2. Draft and review the Chinese article against the factual boundaries above.
3. Generate and inspect the 1200 × 630 hero image, then optimize it for web use.
4. Create a new WordPress draft and populate all article fields.
5. Upload the image, add alt text, and set it as the featured image.
6. Save the draft and verify its preview at desktop and mobile widths.
7. Record the new post/media IDs, validation evidence, rollback method, and unresolved placeholders in a result document.

Execution starts only after the user enters `开始优化` for this prepared scope.
