# Muhammad Ali — Business Operations & Analytics

A static, responsive portfolio for Muhammad Ali, deployed on GitHub Pages at [muhammadali83.github.io](https://muhammadali83.github.io/).

## Run locally

No build step or package installation is required. Serve the repository root with any static web server, for example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Structure

- `index.html` — semantic page content, SEO metadata, profile details, and structured data.
- `styles.css` — responsive visual system, layout, motion, and reduced-motion support.
- `script.js` — progressive enhancement for the mobile menu, reveal transitions, and pointer interactions.
- `assets/` — existing profile, avatar, and social preview images.

The site is plain HTML, CSS, and JavaScript. It has no build pipeline or framework dependency; paths are relative to the repository root for GitHub Pages compatibility. The Vertex 2 chart illustration is a visual summary of the verified analytics project, not published business data.

## Personalizing visuals

The existing portrait in `assets/profile.jpg` is used in the hero. Replace that file to update the portrait while keeping the same path. The hero uses CSS-generated ambient visuals rather than a third-party video, so it remains lightweight and works without external media requests. For additional verified project links or media, update the relevant project markup in `index.html`.

## Contact

No email address was listed in the original portfolio, so the contact call to action uses the existing LinkedIn profile rather than displaying a guessed address. The existing GitHub, Kaggle, LinkedIn, post links, work, skills, and education details are retained.
