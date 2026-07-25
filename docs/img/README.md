# docs/img — preview screenshots (currently none, on purpose)

The previous screenshots (`DASHBOARD.png`, `WTB.png`) were removed on 2026-07-25 (audit
finding AR-08: they were frozen at 2026-07-17 while the pages they previewed kept changing —
a "live data" section with a stale image). The READMEs now link straight to the live pages.

## How to add the next screenshots (exact recipe)

1. Open the **rendered** page on GitHub (not the raw file):
   - dashboard → `observatory/usage/DASHBOARD.md` — capture the **"At a glance" + "The most
     expensive things"** blocks;
   - project drilldown → `observatory/usage/per-project/poker-who-s-the-boss.md` — capture
     the sessions table.
2. Screenshot with `Win+Shift+S`, crop to the content (no browser chrome).
3. Save EXACTLY as `docs/img/DASHBOARD.png` and `docs/img/WTB.png` (same names: the git
   history of each file then tells when the preview was last refreshed).
4. Re-add the image embeds in `README.md` and `ITALIANO/README.md` right above the
   corresponding "open the live page" links, and commit images + READMEs together.
5. **Rule to keep**: refresh the screenshots in the same session that regenerates the
   dashboard, or don't show numbers in a preview image at all — an image with stale numbers
   under a "live data" heading is worse than no image. Images must stay committed (not
   gitignored): GitHub only renders images that live in the repo; they may contain only
   already-published, redacted data.
