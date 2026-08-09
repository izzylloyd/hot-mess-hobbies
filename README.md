# Hot Mess Hobbies

Website for Hot Mess Hobbies, LLC — the umbrella site for Izzy's passions-turned-side-hustles (currently: tropical enclosed terrariums and football cards, with more to come).

Built with [Eleventy](https://www.11ty.dev/) — a static site generator. Pages are built from shared templates + data, so a new hobby means adding data, not hand-copying HTML.

## Structure

```
src/
  _data/
    site.json          Site-wide info (name, email, tagline)
    ventures.json       One entry per hobby/venture — powers the homepage grid AND generates each venture's page
  _includes/
    base.njk             Shared layout: header, nav, footer
  index.njk               Home page
  venture.njk              Template that generates terrariums.html + football-cards.html from ventures.json
  about.njk                LLC / brand story
  contact.njk               Contact form
  css/styles.css            All site styling (colors, fonts, layout)
  js/main.js                Mobile nav toggle + contact form handling
  images/                    Placeholder graphics — swap for real photos
eleventy.config.js        Build config
_site/                     Generated output (not committed — this is what gets deployed)
```

### Adding a new hobby/venture

Add a new object to `src/_data/ventures.json` with the same shape as the existing entries (terrariums, football-cards). Eleventy will automatically:
- Add it to the homepage "Current Ventures" grid
- Add it to the nav
- Generate a `<slug>.html` page for it with its product listing

No HTML editing required.

## Running it locally

```
npm install
npm start
```

Then visit `http://localhost:8080` (Eleventy prints the exact URL). Pages live-reload on save.

To build the static output without serving it:

```
npm run build
```

Output goes to `_site/` — that's the folder to deploy.

## To do before launch

- [ ] Swap placeholder images in `src/images/` for real terrarium and football card photos
- [ ] Update placeholder listings (names/prices) in `src/_data/ventures.json`
- [ ] Set up a real inbox for `hello@hotmesshobbies.com` (or swap in whatever address you want to use — update it once in `src/_data/site.json`)
- [ ] Decide on hosting (GitHub Pages / Netlify) and point the GoDaddy domain at it — hosting will need to run `npm run build` and deploy the `_site/` folder
- [ ] Optional: wire up the contact form to an actual email service (e.g. Formspree) since it's currently just a placeholder
