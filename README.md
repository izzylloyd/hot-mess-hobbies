# Hot Mess Hobbies

Website for Hot Mess Hobbies, LLC — the umbrella site for Izzy's passions-turned-side-hustles (currently: tropical enclosed terrariums and football cards, with more to come).

## Structure

```
index.html            Home page
terrariums.html        Terrarium shop
football-cards.html    Football card shop
about.html              LLC / brand story
contact.html            Contact form
css/styles.css          All site styling (colors, fonts, layout)
js/main.js              Mobile nav toggle + contact form handling
images/                  Placeholder graphics — swap for real photos
```

## Running it locally

No build step needed — it's plain HTML/CSS/JS. Just open `index.html` in a browser, or serve it locally:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## To do before launch

- [ ] Swap placeholder images in `images/` for real terrarium and football card photos
- [ ] Update placeholder listings (names/prices) on `terrariums.html` and `football-cards.html`
- [ ] Set up a real inbox for `hello@hotmesshobbies.com` (or swap in whatever address you want to use — update it in every page footer + contact.html)
- [ ] Decide on hosting (GitHub Pages / Netlify) and point the GoDaddy domain at it
- [ ] Optional: wire up the contact form to an actual email service (e.g. Formspree) since it's currently just a placeholder
