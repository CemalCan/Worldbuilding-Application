# Contributing to Loreforge

Thank you for helping improve Loreforge. This project is currently a dependency-free, offline-first open-source web app that runs directly in the browser.

## Reporting Bugs

When reporting a bug, please include:

- What you expected to happen
- What actually happened
- Steps to reproduce the issue
- Your browser and operating system
- Whether the issue happens with a fresh browser profile or cleared local data

Do not include private worldbuilding data, personal information, secrets, tokens, API keys, or `.env` files in bug reports.

## Suggesting Improvements

Improvement suggestions should focus on the current offline app experience. Please describe the user problem, the proposed change, and why it would make the app easier or safer to use.

## Making Changes

Keep changes small and focused. A good pull request should do one clear thing, avoid unrelated cleanup, and be easy to review.

Before submitting a change:

- Confirm the app still opens from `index.html`
- Avoid adding dependencies unless you explain why they are necessary
- Keep documentation honest and only describe features that exist in the current app
- Do not commit generated local data, exports, logs, credentials, secrets, API keys, tokens, `.env` files, or private data

## Commit Messages

Use short, descriptive commit messages. Prefer this style:

- `docs: update contribution guide`
- `fix: correct category selection`
- `chore: tidy project metadata`
- `feat: add local export option`

Keep the subject line in the imperative mood and focused on the change.
