# Luxury Wedding Invitation

A mobile-first animated wedding invitation built with React, Vite and Framer Motion.

## Open in VS Code

1. Download and extract this ZIP.
2. Open the extracted `luxury-wedding-invite` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Personalize it

Edit `src/data.js`:
- `bride`, `groom`
- `dateISO`, `dateText`, `city`
- each event's date, time, venue, dress code and Google Maps URL
- `rsvpPhone` (country code + number, digits only)

Add your own files:
- `public/images/couple.jpg` — main hero photo
- `public/images/couple2.jpg` — optional second photo (reserved for later customization)
- `public/music.mp3` — optional background music

The envelope opens on tap. Music starts only after the visitor taps the envelope, respecting browser autoplay rules. The music button can mute/unmute it.

## Build for deployment

```bash
npm run build
```

The production site is generated in `dist/`. You can deploy the folder using Vercel:

```bash
npm install -g vercel
vercel
vercel --prod
```

## Important

Sunaina and Atul’s names, the 10–11 December 2026 dates, and Sundar Vatika venue have been filled in. Event times are still to be announced. Replace the placeholder RSVP number in `src/data.js` before sharing the invitation. If no hero photo or music file is added, the page still loads with its designed fallback background.
