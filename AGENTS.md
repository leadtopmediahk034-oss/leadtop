# Leadtop Repository Workflow

## Git workflow

- Work directly on `main` and push completed commits to `origin/main`.
- Do not create feature, task, Codex, or pull-request branches unless the user explicitly requests one.
- Do not open pull requests for normal project changes unless the user explicitly requests one.
- Before committing or pushing, preserve unrelated user changes and verify that the current branch is `main`.

## Fast frontend iteration

- Use `npm run dev:preview` for local visual work. It always serves `http://127.0.0.1:3001`.
- Reuse an existing dev server and browser tab. Check the URL before starting another process.
- Keep the dev server running throughout one frontend task; do not restart it after every edit.
- Use Next.js hot reload for intermediate checks. Run `npm run build` once, after the final edit.
- For narrow CSS or JSX changes, run `git diff --check` before the final build instead of rebuilding after each patch.
- Prefer one combined file-read/search call over many sequential PowerShell calls.
- On this Windows workspace, run shell commands without login-shell initialization when the tool supports it.
- Inspect only the component, stylesheet, referenced assets, and matching design preview needed for the requested section.

## Browser verification

- Prefer `http://127.0.0.1:3001` over `localhost` to avoid IPv6 resolution delays.
- Reuse the selected in-app browser binding and its current tab across checks.
- If the Browser WebView cannot attach, retry the existing browser connection once. Do not repeatedly restart Next.js unless the HTTP endpoint itself is unavailable.
- Verify only the affected section at desktop and mobile widths; avoid full-page screenshots unless the change affects page-wide rhythm.

## Editing boundaries

- Preserve existing user changes and avoid unrelated refactors.
- Use the existing React, Next.js, CSS Modules, and Phosphor icon patterns.
- Keep reference-alignment fixes scoped to the section named by the user.

## Upload and deployment boundaries

- Do not upload, install, deploy, publish, or send files or generated artifacts to WordPress, hosting platforms, CDNs, or any other external system unless the user explicitly requests that action.
- A request to create or package an artifact authorizes local creation only; it does not authorize uploading or installing it.

## Task efficiency

- Treat each task as one bounded objective. When the objective changes, recommend a new task instead of carrying unrelated context forward.
- Save every analysis deliverable as a Markdown file in the most relevant repository documentation directory, in addition to presenting the analysis in the conversation.
- Do not inspect the entire repository unless the user explicitly requests it.
- Before reading files, identify the smallest relevant file set.
- Combine independent read-only checks into one tool call when practical.
- Do not create a multi-step plan for a narrow, single-file change unless the user asks for one.
- Do not reread unchanged files after an edit; inspect the diff or the affected lines instead.
- Do not repeat a successful build unless code changed afterward.
- Do not return complete command output unless an error requires it.
- Keep progress updates concise and report only decisions, blockers, and verification outcomes.
- Limit screenshots and generated artifacts to those required to verify the affected section.
- For simple Git operations, combine status, branch, remote, and diff checks.
- Use one primary skill per task unless multiple skills are explicitly required.
- Do not install dependencies or change machine configuration during a frontend task unless explicitly requested.

## Verification budget

- Copy-only changes require a diff check only.
- Narrow CSS changes require hot reload and verification of the affected viewport.
- Component changes require affected desktop and mobile checks plus one final build.
- Cross-component logic changes require targeted tests plus one final build.
- Do not run full-page visual verification for section-scoped changes.
