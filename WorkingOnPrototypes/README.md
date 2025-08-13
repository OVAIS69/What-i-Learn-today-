# CherryBlossom — Animated UI Starter

A serene, emotionally resonant matchmaking UI inspired by cherry blossoms,
with cosmos.so-style motion: glass panels, floating petals, parallax,
tilting profile cards, and blooming match scores.

## 0) Prereqs
- Node 18+

## 1) Install
```bash
npm install
```

## 2) Dev
```bash
npm run dev
```
Open http://localhost:3000

## 3) What's inside
- Next.js (App Router)
- TailwindCSS
- Framer Motion (micro-interactions)
- GSAP (parallax for petal layers)

## 4) Files
- `app/layout.tsx` — global background + PetalBackground
- `app/page.tsx` — hero, profile grid, chat preview
- `components/PetalBackground.tsx` — floating petals + parallax
- `components/ProfileCard.tsx` — tilt-on-hover, glassmorphism
- `components/MatchScore.tsx` — flower-bloom score animation
- `components/ChatBubble.tsx` — bud-to-bloom chat bubble
- `styles/globals.css` — blossom gradient + grain + glass helper
- Tailwind/Next config files included.

## 5) Customize the vibe
- Colors: tweak `tailwind.config.ts` blossom palette.
- Petal count: adjust array size in `PetalBackground`.
- Motion strength: GSAP mouse parallax factors in `PetalBackground`.

## 6) Next steps (plug in your app)
- Convert sample profiles to real data.
- Add routes: `/discover`, `/profile`, `/events`, `/safety`.
- Wire chat + matching logic.
- Keep the cherry blossom theme persistent everywhere 🌸
