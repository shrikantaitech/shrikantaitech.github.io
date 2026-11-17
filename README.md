# ShrikantAI Innovation — Website

A custom corporate website for ShrikantAI Innovation, built with plain HTML5, CSS3, and vanilla JavaScript only — no frameworks, no build step, no paid services. It deploys for free on GitHub Pages.

## Project structure

```
shrikantai-website/
├── index.html
├── services.html
├── about.html
├── contact.html
├── privacy.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── images/
```

## Before you deploy

All canonical/OG URLs, `sitemap.xml`, and `robots.txt` are already set to `https://shrikantaitech.github.io/` — this only works if the repository is named **exactly** `shrikantaitech.github.io` (your GitHub username + `.github.io`). This special name makes it a **user page**, which GitHub serves at the root domain with no extra sub-path. If you ever rename the repo or change account, these URLs need updating to match.

## Deploying to GitHub Pages (Windows)

### 1. Create a GitHub account and repository

1. Go to [github.com](https://github.com) and sign in (or create a free account) as **shrikantaitech**.
2. Click the **+** icon in the top-right corner and choose **New repository**.
3. Name it **exactly** `shrikantaitech.github.io` — this exact name is what makes GitHub publish it at the root domain `https://shrikantaitech.github.io/` instead of a sub-path.
4. Set visibility to **Public** (required for free GitHub Pages).
5. Do **not** tick "Add a README file" — you already have one.
6. Click **Create repository**.

### 2. Upload the website files

**Easiest option — no Git installation needed:**

1. On your new repository's page, click **uploading an existing file** (or **Add file → Upload files**).
2. On your computer, open the `shrikantai-website` folder.
3. Select **all files and folders inside it** (not the outer folder itself) — `index.html`, `services.html`, `about.html`, `contact.html`, `privacy.html`, `favicon.svg`, `robots.txt`, `sitemap.xml`, `README.md`, and the `assets` folder.
4. Drag them into the GitHub upload box in your browser (GitHub will preserve the `assets/css`, `assets/js`, and `assets/images` folder structure automatically).
5. Scroll down, add a commit message such as "Initial website upload," and click **Commit changes**.

**Alternative — using Git for Windows**, if you prefer the command line:

1. Install [Git for Windows](https://git-scm.com/download/win).
2. Open **Git Bash** and run:
   ```
   cd path\to\shrikantai-website
   git init
   git add .
   git commit -m "Initial website upload"
   git branch -M main
   git remote add origin https://github.com/shrikantaitech/shrikantaitech.github.io.git
   git push -u origin main
   ```

### 3. Enable GitHub Pages

1. In your repository, click the **Settings** tab.
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. For a user-page repo named `shrikantaitech.github.io`, GitHub usually publishes it automatically at `https://shrikantaitech.github.io/` within a minute or two, often without needing to pick a source branch — but check **Settings → Pages** and set **Branch: main, / (root)** if it isn't already live.

### 4. Configure the website URL

The files already point to `https://shrikantaitech.github.io/`, so as long as the repo is named exactly `shrikantaitech.github.io` under the **shrikantaitech** account, there's nothing else to change. If you later move to a custom domain, update the canonical/OG URLs in each HTML file plus `sitemap.xml` and `robots.txt` to match, then re-upload or push.

### 5. Test the deployed website

1. Visit your GitHub Pages URL in a browser.
2. Click through **Home → Services → About → Contact → Privacy Policy** and confirm every link works.
3. On Contact, fill in the form and submit it — it should open WhatsApp with your message pre-filled.
4. Resize your browser window (or open the site on your phone) to check the mobile menu and layout.
5. Open your browser's developer console (press F12) and check there are no red errors.

## Making future edits

Edit the HTML/CSS/JS files directly, then re-upload (or `git add . && git commit -m "update" && git push`) to publish changes. GitHub Pages updates automatically within a minute or two of each push.
