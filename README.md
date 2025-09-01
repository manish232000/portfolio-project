
# Best Portfolio (HTML, CSS, JS)

A modern, fast, and accessible portfolio website with dark mode, project filters, modal previews, a testimonial slider, contact form, and PWA (installable + offline).

## Features
- ⚡ Performance-first, SEO-ready, semantic HTML
- 🌓 Dark/Light theme with system preference + local storage
- 📱 Fully responsive (mobile/tablet/desktop)
- 🧩 Projects grid with filters and modal details
- 🗂️ Clean, scalable CSS with CSS variables
- ♿ Accessible components (focus styles, aria labels, keyboard friendly)
- 🗓️ Experience timeline
- 💬 Testimonials slider
- ⬆️ Back-to-top button & reveal-on-scroll animations
- 📦 PWA: manifest + service worker + icons (installable & basic offline)
- 📨 Contact form (mailto) with client-side validation

## Getting Started (Local)

1. Download and unzip the project.
2. Open `index.html` in your browser.
3. (Optional) For PWA features like service worker, serve the folder with a local server:
   - Python: `python -m http.server 5173`
   - Node: `npx http-server -p 5173`
4. Visit `http://localhost:5173/`.

## Customize

- Update your **name**, **role**, and **social links** in `index.html` (hero section).
- Replace `assets/img/avatar.svg` with your photo (`avatar.jpg/png`), and update the `<img>` src.
- Add/update projects in `script.js` -> the `projects` array.
- Replace `you@example.com` in `script.js` with your real email for the contact form.
- Put your PDF résumé in `assets/Manish_Singh_Resume.pdf` and keep the same link in `index.html` (or update it).

## Deploy (GitHub Pages)

1. Create a new GitHub repo and push these files.
2. In **Settings → Pages**, set the branch to `main` (root). Save.
3. Your site will be live in a few minutes at `https://<username>.github.io/<repo>/`.

## File Structure
```
stellar-portfolio/
├── assets/
│   ├── icons/
│   │   ├── favicon.png
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── img/
│       ├── avatar.svg
│       ├── hero-bg.svg
│       ├── project-1.svg
│       ├── project-2.svg
│       ├── project-3.svg
│       └── project-4.svg
├── index.html
├── styles.css
├── script.js
├── manifest.webmanifest
├── service-worker.js
└── README.md
```

## Notes
- No build tools required. Pure HTML/CSS/JS.
- Works offline after the first visit (static shell caching).
- You can convert the SVG placeholders to your own images anytime.
