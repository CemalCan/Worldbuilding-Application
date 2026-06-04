# Release Checklist

## Version

* [ ] VERSION is updated.
* [ ] CHANGELOG.md has the correct release section.
* [ ] README.md describes the current implemented features.

## Validation

* [ ] `node --check app.js` passes.
* [ ] `git diff --check` passes.
* [ ] Working tree is clean.
* [ ] Main branch is up to date with origin/main.

## Manual QA

* [ ] App opens by loading `index.html`.
* [ ] English default UI works.
* [ ] Turkish language setting works.
* [ ] Universe creation wizard works.
* [ ] Built-in templates work.
* [ ] Add from template works.
* [ ] Category editing and reorder work.
* [ ] Entity creation/editing works.
* [ ] Linked fields work.
* [ ] Family sync and family tree work.
* [ ] Timeline works.
* [ ] Notes and idea inbox work.
* [ ] Story planner works.
* [ ] Map board and pins work.
* [ ] Relationship graph works.
* [ ] Consistency checker works.
* [ ] Trash restore/permanent delete works.
* [ ] JSON export/import works.

## Public repository

* [ ] README.md is accurate.
* [ ] LICENSE exists.
* [ ] SECURITY.md exists.
* [ ] CONTRIBUTING.md exists.
* [ ] MANUAL_QA.md exists.
* [ ] CHANGELOG.md exists.
* [ ] No secrets, API keys, tokens, `.env`, or private data are committed.

## Release

* [ ] Create git tag `v0.1.0`.
* [ ] Push tag to origin.
* [ ] Create GitHub release notes from CHANGELOG.md.
