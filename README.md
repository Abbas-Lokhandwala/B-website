# For Aarefa — Midnight Birthday Website ❤️

**Countdown:** December 24, 2026, 00:00 IST (UTC 2026-12-23 18:30).

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally http://localhost:5173/. Use `?preview=1` during local development to see the birthday page immediately. This preview does **not** work on published GitHub Pages.

## Audio

`public/music/bg1.mp3` is the countdown soundtrack and `public/music/bg2.mp3` is the birthday soundtrack. The ZIP includes two original instrumental tracks from the previous version as temporary tracks. Replace these two MP3 files with your own, preserving the names. No audio playback buttons are shown. All modern mobile browsers can block autoplay without the visitor interacting; the website automatically attempts playback on load and retries on the first touch/click/key. There is no reliable code-only workaround for browser policies.

## Photos

Your supplied photos are in `public/images/i1.jpg`, `i2.jpg`, `i3.jpg`. Portrait frames are responsive; on small screens each image is displayed without cropping. Captions and messages can be updated in `src/content.js`.

## Deploy to GitHub Pages

Create a GitHub repo, push the **contents** of this folder, open Settings > Pages > Build and deployment > Source: GitHub Actions. The included `.github/workflows/deploy.yml` handles deployment. Vite automatically picks the repository base path during CI.

Keep in mind that photos published through GitHub Pages are public to people with the link and may be discoverable.
