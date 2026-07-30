# Pihu's Birthday Mission

A cinematic browser game and interactive scrapbook built as a birthday surprise.

## Run it

Open `index.html` directly in a browser, or use VS Code Live Server.

## Personalization checklist

The main editable data is near the bottom of `index.html` inside the `memories` array.

Each memory contains:

- `date`
- `title`
- `text`
- `photo` placeholder text

Current sequence:

1. Where it all began
2. A day worth replaying
3. Your song
4. A cuddle / home memory
5. The final message for today

The intro dialogue lives inside the `scenes` array.

The final birthday letter is in the HTML section with class `letter`.

## Add music

Create an `assets` folder and add your song as:

`assets/our-song.mp3`

The music button already works once that file exists.

## Add photos

For the personalized version, add images under `assets/photos`.

Recommended filenames:

- `memory-1.jpg`
- `memory-2.jpg`
- `memory-3.jpg`
- `memory-4.jpg`
- `memory-5.jpg`
- `ending.jpg`

## Deploy quickly

This is a static site and can be deployed through GitHub Pages, Netlify, or Vercel without a build command.
