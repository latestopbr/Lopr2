# Web Dev Cost Estimator

An interactive, glassmorphic cost estimator for web development projects. Walks a client through a 4-step wizard (project type, scale & scope, features, delivery speed) with a real-time itemized price breakdown, an exportable/printable summary, and a "Book Kickoff Call" lead capture form.

## Stack

- React 19 + TypeScript, built with Vite
- Tailwind CSS v4
- Framer Motion for step transitions, micro-interactions, and the animated price counter
- anime.js for decorative flourishes
- React Three Fiber + drei for the mouse-reactive 3D wireframe/particle background
- canvas-confetti for the booking confirmation

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run oxlint

## Notes

- The 3D background is lazy-loaded and skipped entirely for users with `prefers-reduced-motion` set, falling back to a static gradient.
- The "Book Kickoff Call" form has no backend yet — submissions are simulated in `src/lib/submitBooking.ts`, which is written as the single seam where a real endpoint (Formspree, EmailJS, a serverless function) can be dropped in later.
