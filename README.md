# ShrikantAI Innovation website

Static site: HTML5, CSS3 and vanilla JavaScript. No build step, no dependencies, no external requests. Works on GitHub Pages.

## Deploy
1. In the `shrikantaitech.github.io` repository, back up the current files (for example, create a branch `old-site`).
2. Copy every file and folder from this project into the repository root, replacing existing files with the same names.
3. Commit and push to the default branch.
4. In Settings > Pages, confirm the source is the default branch, root folder. The site updates within a few minutes.

## Files to replace
`index.html`, `services.html`, `products.html`, `about.html`, `contact.html`, `privacy.html`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `README.md`, and the whole `assets/` folder.
Delete old files that are no longer linked after checking they hold nothing you still need.

## Edit before publishing
- DentalDesk is labelled "In development" on the home page and `products.html`. Change the label if its status is different.
- Add social links to the footer only when you have real URLs.
- Add an Open Graph image (`og:image`) when you have a brand image.

## Testing checklist
- [ ] Every nav and footer link opens the right page or section
- [ ] Mobile menu opens, closes (button, link tap, Escape)
- [ ] Form: empty submit shows errors; valid submit opens WhatsApp with the message
- [ ] No horizontal scroll at 360, 390, 768, 1024, 1440 and 1920 px
- [ ] No console errors
- [ ] Keyboard focus visible on every control
- [ ] "Reduce motion" setting disables animation
