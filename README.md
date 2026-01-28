# Paint App

A small React + TypeScript paint app built for a class project. It includes a paint store, a mixing palette, and a canvas where you can draw colored dots.

## Features
- Directory page to navigate between sections
- Paint store to buy primary colors
- Palette to mix/unmix colors and track inventory
- Canvas to draw dots using available paint

## Getting started
```bash
npm install
```

## Run locally
```bash
npm start
```

Then open the dev server URL printed in your terminal.

## Build
```bash
npm run build
```

## Test
```bash
npm test
```

## Lint
```bash
npm run lint
```

## Project structure
- `src/App.tsx` – top-level routing between pages
- `src/Store.tsx` – buy paint colors
- `src/Palette.tsx` – mix/unmix colors
- `src/Canvas.tsx` – draw dots with paint
- `src/paint.ts` – color definitions and mixing logic
