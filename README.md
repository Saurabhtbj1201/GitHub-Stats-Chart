<div align="center">

<img src="public/logo.png" alt="GitHub Visualize Logo" width="120" />

# 🚀 GitHub Visualize

### Beautiful, Shareable Visual Insights from Any GitHub Profile

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-github.gu--saurabh.site-38bdf8?style=for-the-badge)](https://github.gu-saurabh.site)
[![GitHub Stars](https://img.shields.io/github/stars/Saurabhtbj1201/Github-Visualize?style=for-the-badge&color=f59e0b)](https://github.com/Saurabhtbj1201/Github-Visualize/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<br />

> _Explore top languages, commit activity, repository stats, and more — all in one stunning dashboard._

<br />

[**Try It Now →**](https://github.gu-saurabh.site) · [Report Bug](https://github.com/Saurabhtbj1201/Github-Visualize/issues) · [Request Feature](https://github.com/Saurabhtbj1201/Github-Visualize/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **6 Stunning Themes** | Default, Dark, Algolia, Aura, Aura Dark, Dracula — switch instantly |
| 👤 **Profile Header** | Avatar, bio, followers, weekly activity heatmap & yearly commits |
| 📊 **Languages by Repo** | Pie chart breakdown of your most-used languages across repositories |
| 💾 **Languages by Commit** | See which languages dominate your actual commit history |
| ⏰ **Commits by Hour** | Bar chart revealing your peak coding hours |
| 📈 **Stats Card** | Stars, PRs, issues, repos, contributions — all at a glance |
| 📋 **Repo Table** | Highlighted repositories with stars, forks, and language info |
| 🖼️ **SVG Image Cards** | Server-rendered SVG cards that work anywhere — GitHub READMEs, websites, blogs |
| 🔗 **Embeddable Cards** | Every chart has one-click **Copy Link**, **Copy Markdown**, & **Copy SVG** |
| 🌗 **Light / Dark Mode** | Full site-level theme toggle with smooth transitions |
| 📱 **Responsive** | Looks great on desktop, tablet, and mobile |

---

## 🖼️ Component Previews

<div align="center">

### 👤 Profile Header
<img src="https://github.gu-saurabh.site/api/card/Saurabhtbj1201/profile-header?theme=default" alt="Saurabhtbj1201's Profile" />

### 📊 Top Languages by Repo
<img src="https://github.gu-saurabh.site/api/card/Saurabhtbj1201/languages-by-repo?theme=default" alt="Saurabhtbj1201's Top Languages by Repo" />

### 💾 Top Languages by Commit
<img src="https://github.gu-saurabh.site/api/card/Saurabhtbj1201/languages-by-commit?theme=default" alt="Saurabhtbj1201's Top Languages by Commit" />

### ⏰ Commits by Hour
<img src="https://github.gu-saurabh.site/api/card/Saurabhtbj1201/commits-by-hour?theme=default" alt="Saurabhtbj1201's Commits by Hour" />

### 📈 Stats Card
<img src="https://github.gu-saurabh.site/api/card/Saurabhtbj1201/stats?theme=default" alt="Saurabhtbj1201's Stats" />

### 📋 Highlighted Repos
<img src="https://github.gu-saurabh.site/api/card/Saurabhtbj1201/repo-table?theme=default" alt="Saurabhtbj1201's Highlighted Repos" />

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Saurabhtbj1201/Github-Visualize.git
cd Github-Visualize

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser and start visualizing!

### Production Build

```bash
npm run build
npm run preview
```

---

## 🖼️ SVG Cards for GitHub README

Every card is available as a **server-rendered SVG image** — no JavaScript, no iframes. Just paste the URL in your README and it works everywhere!

### Quick Copy-Paste

```markdown
<!-- Stats Card -->
![My GitHub Stats](https://github.gu-saurabh.site/api/card/YOUR_USERNAME/stats?theme=dark)

<!-- Profile Header -->
![My Profile](https://github.gu-saurabh.site/api/card/YOUR_USERNAME/profile-header?theme=dark)

<!-- Top Languages by Repo -->
![Languages](https://github.gu-saurabh.site/api/card/YOUR_USERNAME/languages-by-repo?theme=dark)

<!-- Top Languages by Commit -->
![Languages by Commit](https://github.gu-saurabh.site/api/card/YOUR_USERNAME/languages-by-commit?theme=dark)

<!-- Commits by Hour -->
![Commits by Hour](https://github.gu-saurabh.site/api/card/YOUR_USERNAME/commits-by-hour?theme=dark)

<!-- Highlighted Repos -->
![Repos](https://github.gu-saurabh.site/api/card/YOUR_USERNAME/repo-table?theme=dark)
```

### Available Card Types

| Card Type | SVG API Path |
|---|---|
| Profile Header | `/api/card/:username/profile-header` |
| Languages by Repo | `/api/card/:username/languages-by-repo` |
| Languages by Commit | `/api/card/:username/languages-by-commit` |
| Commits by Hour | `/api/card/:username/commits-by-hour` |
| Stats Card | `/api/card/:username/stats` |
| Repo Table | `/api/card/:username/repo-table` |

### Theme Parameter

Add `?theme=` to customize the look:

| Theme | Preview |
|---|---|
| `default` | Light theme with clean colors |
| `dark` | GitHub dark theme |
| `algolia` | Deep blue Algolia-inspired |
| `aura` | Purple-tinted Aura theme |
| `aura_dark` | Darker variant of Aura |
| `dracula` | Classic Dracula color scheme |

**Example with theme:**
```markdown
![Stats](https://github.gu-saurabh.site/api/card/YOUR_USERNAME/stats?theme=dracula)
```

### How It Works

The `/api/card/` endpoint is a **Vercel Serverless Function** that:
1. Fetches your GitHub data via the GitHub API
2. Generates a beautiful **pure SVG** image server-side
3. Returns it with `Content-Type: image/svg+xml`
4. Caches results for 30 minutes for fast loading

This means the images render natively on GitHub, no JavaScript or iframes required! ✅

---

## 🔗 Interactive Embed (for Websites)

For websites and blogs that support iframes, you can also use the interactive embed:

```html
<iframe src="https://github.gu-saurabh.site/embed/YOUR_USERNAME/stats?theme=dark"
  width="400" height="400" frameborder="0"></iframe>
```

---

## 🏗️ Tech Stack

<div align="center">

| Technology | Purpose |
|:---:|---|
| ⚛️ **React 19** | UI library |
| 🟦 **TypeScript** | Type safety |
| ⚡ **Vite 7** | Lightning-fast dev & build |
| 📊 **Recharts** | Charts & visualizations |
| 🧭 **React Router v7** | Client-side routing |
| 🎨 **Tailwind CSS** | Utility-first styling |
| 🔗 **Axios** | GitHub API requests |
| 🌐 **Vercel** | Deployment & hosting |
| 🖼️ **SVG API** | Server-side card generation |

</div>

---

## 📁 Project Structure

```
Github-Visualize/
├── api/
│   ├── card/
│   │   └── [username]/
│   │       └── [type].ts       # Serverless SVG card endpoint
│   ├── lib/
│   │   ├── cards.ts            # SVG card generators
│   │   ├── github.ts           # Server-side GitHub data fetcher
│   │   └── themes.ts           # Card theme definitions
│   └── tsconfig.json           # TypeScript config for API
├── public/
│   ├── favicon.ico             # Browser favicon
│   ├── logo.png                # App logo & OG image
│   ├── robots.txt              # SEO crawl rules
│   └── sitemap.xml             # Sitemap for search engines
├── src/
│   ├── components/
│   │   ├── CardWrapper.tsx     # Embeddable card with copy buttons
│   │   ├── CommitsByHour.tsx   # Hourly commit bar chart
│   │   ├── EmbedChart.tsx      # Standalone embed renderer
│   │   ├── GithubDashboard.tsx # Main dashboard layout
│   │   ├── GoogleAd.tsx        # Google AdSense component
│   │   ├── LanguagesByCommit.tsx # Language pie (by commits)
│   │   ├── LanguagesByRepo.tsx # Language pie (by repos)
│   │   ├── ProfileHeader.tsx   # Profile card with activity graph
│   │   ├── RepoStatsTable.tsx  # Repository highlights table
│   │   └── StatsCard.tsx       # Key metrics overview
│   ├── github/
│   │   └── useGithubProfile.ts # GitHub API hook
│   ├── App.tsx                 # Router & site shell
│   ├── main.tsx                # React entry point
│   ├── theme.tsx               # Theme system (6 card themes)
│   └── style.css               # Global styles
├── index.html                  # SEO-optimized HTML entry
├── vercel.json                 # Vercel deployment config
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Import Project**
3. Select your `Github-Visualize` repository
4. Vercel auto-detects Vite — just click **Deploy** ✅

The included `vercel.json` handles:
- ✅ SPA client-side routing rewrites
- ✅ SVG card API route (`/api/card/`) for GitHub README images
- ✅ Permissive iframe headers for embed routes
- ✅ Long-term cache headers for static assets

### Custom Domain

Point your custom domain (e.g. `github.gu-saurabh.site`) in **Vercel → Settings → Domains**.

### GitHub Token (Optional)

For higher API rate limits, add a `GITHUB_TOKEN` environment variable in your Vercel project settings:
1. Go to **Vercel → Project → Settings → Environment Variables**
2. Add `GITHUB_TOKEN` with a GitHub personal access token (read-only scope)

---

## 🔧 Configuration

### Google AdSense

The project includes a ready-to-use `GoogleAd` component. To activate ads:

1. Your publisher ID is already set in `index.html` and `GoogleAd.tsx`
2. Replace `YOUR_AD_SLOT_1` and `YOUR_AD_SLOT_2` in `GithubDashboard.tsx` with real AdSense ad slot IDs
3. AdSense will start serving ads once your site is approved

### GitHub API

The app uses the public GitHub API. For higher rate limits, you can add a personal access token in the `useGithubProfile.ts` hook (client-side) or as a `GITHUB_TOKEN` env var (server-side SVG cards).

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer
<div align="center">

### © Made with ❤️ by Saurabh Kumar. All Rights Reserved 2025

<!-- Profile Section with Photo and Follow Button -->
<a href="https://github.com/Saurabhtbj1201">
  <img src="https://github.com/Saurabhtbj1201.png" width="100" style="border-radius: 50%; border: 3px solid #0366d6;" alt="Saurabh Profile"/>
</a>

### [Saurabh Kumar](https://github.com/Saurabhtbj1201)

<a href="https://github.com/Saurabhtbj1201">
  <img src="https://img.shields.io/github/followers/Saurabhtbj1201?label=Follow&style=social" alt="GitHub Follow"/>
</a>

### 🔗 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/saurabhtbj1201)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/saurabhtbj1201)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/saurabhtbj1201)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/saurabh.tbj)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://gu-saurabh.site)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/9798024301)

---

<p align="center">

  <strong>Made with ❤️ by Saurabh Kumar</strong>
  <br>
  ⭐ Star this repo if you find it helpful!
</p>

![Repo Views](https://komarev.com/ghpvc/?username=Saurabhtbj1201&style=flat-square&color=red)

</div>

---

<div align="center">
