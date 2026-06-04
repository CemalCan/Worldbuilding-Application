# Loreforge Manual QA Checklist

Use this checklist to smoke test the current offline Loreforge browser prototype after changes. Start from a clean browser profile when possible, and keep at least one exported JSON file from each test run for import checks.

## Test Setup

- [ ] Open `index.html` directly in a browser.
- [ ] Confirm the app loads without console errors that block use.
- [ ] Confirm existing local data is preserved when testing against a browser profile with saved data.
- [ ] Confirm no network connection is required for the tested flows.

## 1. App Startup

- [ ] Open `index.html`.
- [ ] Verify the default UI language is English.
- [ ] Change the language to Turkish.
- [ ] Verify Turkish labels render correctly.
- [ ] Reload the page and verify the app returns to the expected home or project home state.
- [ ] If no universe exists, verify the app starts on the expected empty or onboarding state.
- [ ] If a universe exists, verify the app opens the expected recent or selected project area.

## 2. Universe and Project Flow

- [ ] Create a new universe.
- [ ] Create a project using a built-in template.
- [ ] Create a project using a custom template.
- [ ] Open the project dashboard.
- [ ] Edit project details.
- [ ] Delete a project.
- [ ] Restore the deleted project from app-level trash.
- [ ] Verify restored project data is still intact.

## 3. Categories

- [ ] Add a new category.
- [ ] Add a category from a template.
- [ ] Reorder categories.
- [ ] Hide a category and confirm it is hidden in normal views.
- [ ] Show the hidden category again.
- [ ] Delete a category.
- [ ] Restore the deleted category from project-level trash.
- [ ] Verify entries in the restored category remain available.

## 4. Entries and Entities

- [ ] Create a character.
- [ ] Create a family.
- [ ] Create a location.
- [ ] Create an event.
- [ ] Edit an entry and save changes.
- [ ] Delete an entry.
- [ ] Restore the deleted entry from project-level trash.
- [ ] Verify entry cards show the expected summary.
- [ ] Switch to list view and verify the same entries appear correctly.
- [ ] Open an entry detail view from both card and list views.

## 5. Linked Fields

- [ ] Link a character to a family.
- [ ] Link a character birthplace to a location.
- [ ] Link a character current location to a location.
- [ ] Create a new linked entry directly from a selector.
- [ ] Verify clickable chips open the linked entries.
- [ ] Delete a linked entry and verify missing or deleted references display safely.
- [ ] Restore the deleted linked entry and verify the reference works again.

## 6. Family Sync and Family Tree

- [ ] Add a character to a family from the character form.
- [ ] Add a member to a family from the family form.
- [ ] Verify family membership is synchronized in both directions.
- [ ] Edit or remove a family membership and verify both sides update.
- [ ] Open Family Tree in English.
- [ ] Switch to Turkish and open Soy Ağacı.
- [ ] Verify family members appear in the tree without broken labels.

## 7. Notes and Idea Inbox

- [ ] Add a note to an entry.
- [ ] Pin a note.
- [ ] Mark a note as a todo note.
- [ ] Mark a note as spoiler or hidden.
- [ ] Verify hidden note content is not shown until revealed.
- [ ] Add a quick idea.
- [ ] Attach an idea to an entry.
- [ ] Attach an idea to a project.
- [ ] Attach an idea to a category.
- [ ] Verify attached ideas remain visible in their target context.

## 8. Timeline

- [ ] Create an event.
- [ ] Add date or chronology data to the event.
- [ ] Open Timeline.
- [ ] Verify the event appears in the expected order.
- [ ] Use timeline filters.
- [ ] Manually reorder timeline items.
- [ ] Reload the page and verify timeline order is preserved.

## 9. Relationship Graph

- [ ] Create relationships through linked fields.
- [ ] Create manual relationships where supported.
- [ ] Open the relationship graph from the project home.
- [ ] Open the relationship graph from an entity detail view.
- [ ] Verify graph nodes are clickable.
- [ ] Verify clicking a node opens or focuses the expected entity.
- [ ] Delete a related entity and verify the graph handles the missing or deleted reference safely.

## 10. Story Planner

- [ ] Create a story.
- [ ] Create a chapter.
- [ ] Create a scene.
- [ ] Link a scene POV character.
- [ ] Link a scene location.
- [ ] Link scene characters.
- [ ] Use the scene board.
- [ ] Change scene status.
- [ ] Reload and verify story, chapter, scene links, and statuses persist.

## 11. Map Board

- [ ] Create a map.
- [ ] Upload a map image.
- [ ] Add a pin.
- [ ] Drag the pin to a new location.
- [ ] Link the pin to an entry.
- [ ] Open the linked entry from the pin if supported.
- [ ] Delete the pin.
- [ ] Restore the pin from project-level trash.
- [ ] Verify restored pin position and entry link remain intact.

## 12. Images

- [ ] Upload an image under 2 MB to an entry.
- [ ] Verify the image appears in the card view.
- [ ] Verify the image appears in the list view.
- [ ] Verify the image appears in the detail view.
- [ ] Adjust image position.
- [ ] Reload and verify image position is preserved.
- [ ] Remove the image.
- [ ] Verify the entry still displays safely without an image.

## 13. Consistency Checker

- [ ] Run the consistency checker.
- [ ] Verify missing references are reported when test data contains a deleted or missing link.
- [ ] Verify family sync findings are reported when test data is intentionally inconsistent.
- [ ] Apply safe fixes.
- [ ] Verify fixed data is updated without deleting unrelated content.
- [ ] Ignore findings if the current UI supports ignoring them.
- [ ] Reload and verify checker results remain consistent.

## 14. Trash

- [ ] Delete a project and verify it appears in app-level trash.
- [ ] Restore the project from app-level trash.
- [ ] Delete project-level items such as entries, categories, notes, timeline items, or map pins.
- [ ] Verify deleted internal items appear in project-level trash.
- [ ] Restore each deleted internal item.
- [ ] Use permanent delete on a disposable item.
- [ ] Verify permanent delete requires confirmation.
- [ ] Verify permanently deleted items do not reappear after reload.

## 15. Import and Export

- [ ] Export universe JSON.
- [ ] Import the exported JSON into a clean browser profile or after clearing test data.
- [ ] Verify projects survive import.
- [ ] Verify entry links survive import.
- [ ] Verify images survive import.
- [ ] Verify notes and idea inbox items survive import.
- [ ] Verify timeline items and ordering survive import.
- [ ] Verify map pins, positions, and entry links survive import.
- [ ] Verify built-in and custom template usage remains compatible.
- [ ] Try importing malformed JSON.
- [ ] Verify malformed import fails safely and does not damage existing data.

## 16. Accessibility and UX Smoke Checks

- [ ] Tab through primary navigation, forms, modals, and action buttons.
- [ ] Confirm focused controls are visible.
- [ ] Select text inside a modal and verify the modal backdrop does not close unexpectedly.
- [ ] Click modal backdrops where closing is expected and verify behavior is consistent.
- [ ] Use back buttons from detail views and tool views.
- [ ] Switch between English and Turkish labels across core views.
- [ ] Verify Turkish characters display correctly, including `ç`, `ğ`, `ı`, `ö`, `ş`, and `ü` where present.
- [ ] Verify no obvious text overlap or clipped labels on common desktop and narrow mobile widths.
- [ ] Verify destructive actions use clear confirmation before permanent deletion.

## Final Pass

- [ ] Reload the app and confirm the last active universe or project state still opens correctly.
- [ ] Export the final test universe JSON.
- [ ] Re-import the final export and confirm the main tested flows still work.
- [ ] Record browser, operating system, date, commit hash, and any failed checklist items.
