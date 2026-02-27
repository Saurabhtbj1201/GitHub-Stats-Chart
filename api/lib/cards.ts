/**
 * SVG card generators for each chart type.
 * Each function returns a pure SVG string.
 */

import type { CardThemeColors } from './themes'
import type { GithubProfileData } from './github'

/* ── helpers ── */
function esc(str: string | null | undefined): string {
    if (!str) return ''
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function formatNum(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
    return n.toLocaleString()
}

function truncate(str: string, max: number): string {
    if (str.length <= max) return str
    return str.slice(0, max - 1) + '…'
}

/* ████████████████ STATS CARD ████████████████ */

export function renderStatsCard(
    data: GithubProfileData,
    t: CardThemeColors
): string {
    const stats = [
        { icon: '⭐', label: 'Total Stars', value: formatNum(data.totalStars) },
        { icon: '🔥', label: `${new Date().getFullYear()} Commits`, value: formatNum(data.yearCommitCount) },
        { icon: '📁', label: 'Total Repos', value: formatNum(data.repos.length) },
        { icon: '👥', label: 'Followers', value: formatNum(data.profile.followers) },
        { icon: '🐛', label: 'Total Issues', value: formatNum(data.totalIssues) },
        { icon: '🔀', label: 'Total PRs', value: formatNum(data.totalPRs) },
        { icon: '🤝', label: 'Contributed to', value: formatNum(data.contributedTo) },
    ]

    const rowH = 32
    const height = 70 + stats.length * rowH + 20

    const rows = stats
        .map((s, i) => {
            const y = 68 + i * rowH
            return `
      <g transform="translate(0, ${y})">
        <text x="30" y="0" font-size="16" fill="${t.text}" dominant-baseline="middle">${s.icon}</text>
        <text x="56" y="0" font-size="14" fill="${t.text}" dominant-baseline="middle" font-family="'Segoe UI', Ubuntu, sans-serif">${esc(s.label)}</text>
        <text x="370" y="0" font-size="15" fill="${t.title}" font-weight="700" dominant-baseline="middle" text-anchor="end" font-family="'Segoe UI', Ubuntu, sans-serif">${esc(s.value)}</text>
      </g>`
        })
        .join('')

    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="${height}" viewBox="0 0 400 ${height}" fill="none">
  <style>
    @keyframes fadeIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
    .stat-row { animation: fadeIn 0.6s ease forwards; opacity: 0; }
    ${stats.map((_, i) => `.stat-row:nth-child(${i + 1}) { animation-delay: ${i * 0.1}s; }`).join(' ')}
  </style>
  <rect x="0.5" y="0.5" width="399" height="${height - 1}" rx="8" ry="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
  <text x="24" y="38" font-size="18" font-weight="700" fill="${t.title}" font-family="'Segoe UI', Ubuntu, sans-serif">${esc(data.profile.name || data.profile.login)}'s GitHub Stats</text>
  <line x1="24" y1="52" x2="376" y2="52" stroke="${t.gridColor}" stroke-width="1"/>
  ${rows}
</svg>`
}

/* ████████████████ PROFILE HEADER ████████████████ */

export function renderProfileHeader(
    data: GithubProfileData,
    t: CardThemeColors
): string {
    const p = data.profile
    const name = esc(p.name || p.login)
    const login = esc(p.login)
    const bio = esc(truncate(p.bio || '', 80))
    const joinYear = new Date(p.createdAt).getFullYear()
    const yearsAgo = new Date().getFullYear() - joinYear

    const infoLines: string[] = []
    if (p.location) infoLines.push(`📍 ${esc(p.location)}`)
    if (p.company) infoLines.push(`🏢 ${esc(p.company)}`)
    if (p.blog) infoLines.push(`🔗 ${esc(p.blog.replace(/^https?:\/\//, ''))}`)

    const statItems = [
        { label: 'followers', value: p.followers },
        { label: 'following', value: p.following },
        { label: 'repos', value: data.repos.length },
        { label: 'stars', value: data.totalStars },
    ]

    let height = 200
    if (bio) height += 20
    if (infoLines.length > 0) height += infoLines.length * 20

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" height="${height}" viewBox="0 0 500 ${height}" fill="none">
  <rect x="0.5" y="0.5" width="499" height="${height - 1}" rx="8" ry="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>

  <!-- Avatar (circular clip) -->
  <defs>
    <clipPath id="avatar-clip"><circle cx="60" cy="60" r="35"/></clipPath>
  </defs>
  <circle cx="60" cy="60" r="37" stroke="${t.areaStroke}" stroke-width="2.5" fill="none"/>
  <image x="25" y="25" width="70" height="70" href="${esc(p.avatarUrl)}" clip-path="url(#avatar-clip)" preserveAspectRatio="xMidYMid slice"/>

  <!-- Name & Username -->
  <text x="115" y="45" font-size="20" font-weight="700" fill="${t.title}" font-family="'Segoe UI', Ubuntu, sans-serif">${name}</text>
  <text x="115" y="68" font-size="13" fill="${t.areaStroke}" font-family="'Segoe UI', Ubuntu, sans-serif">@${login}</text>

  <!-- Bio -->
  ${bio ? `<text x="115" y="90" font-size="12" fill="${t.text}" font-family="'Segoe UI', Ubuntu, sans-serif">${bio}</text>` : ''}

  <!-- Info lines -->
  ${infoLines.map((line, i) => `<text x="25" y="${(bio ? 120 : 105) + i * 20}" font-size="12" fill="${t.text}" font-family="'Segoe UI', Ubuntu, sans-serif">${line}</text>`).join('\n  ')}

  <!-- Stats row -->
  <g transform="translate(0, ${height - 55})">
    <line x1="24" y1="0" x2="476" y2="0" stroke="${t.gridColor}" stroke-width="1"/>
    ${statItems.map((s, i) => `
    <g transform="translate(${25 + i * 115}, 28)">
      <text x="0" y="0" font-size="16" font-weight="700" fill="${t.title}" font-family="'Segoe UI', Ubuntu, sans-serif">${formatNum(s.value)}</text>
      <text x="0" y="18" font-size="11" fill="${t.subtext}" font-family="'Segoe UI', Ubuntu, sans-serif">${s.label}</text>
    </g>`).join('')}
  </g>

  <!-- Joined badge -->
  <text x="476" y="68" text-anchor="end" font-size="11" fill="${t.subtext}" font-family="'Segoe UI', Ubuntu, sans-serif">Joined ${joinYear} (${yearsAgo}y ago)</text>
</svg>`
}

/* ████████████████ LANGUAGES BY REPO (Pie chart as horizontal bar) ████████████████ */

export function renderLanguagesByRepo(
    data: GithubProfileData,
    t: CardThemeColors
): string {
    const entries = Object.entries(data.languagesByRepo)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)
    const total = entries.reduce((s, [, v]) => s + v, 0)

    const barW = 340
    const rowH = 36
    const height = 80 + entries.length * rowH + 20

    // Stacked progress bar at top
    let barX = 25
    const progressBars = entries.map(([, v], i) => {
        const w = (v / total) * barW
        const svg = `<rect x="${barX}" y="52" width="${Math.max(w, 2)}" height="10" rx="5" fill="${t.chartColors[i % t.chartColors.length]}"/>`
        barX += w
        return svg
    }).join('\n  ')

    const rows = entries.map(([name, value], i) => {
        const pct = ((value / total) * 100).toFixed(1)
        const y = 88 + i * rowH
        const color = t.chartColors[i % t.chartColors.length]
        return `
    <g transform="translate(0, ${y})">
      <circle cx="35" cy="0" r="6" fill="${color}"/>
      <text x="50" y="1" font-size="13" fill="${t.text}" dominant-baseline="middle" font-family="'Segoe UI', Ubuntu, sans-serif">${esc(name)}</text>
      <text x="365" y="1" font-size="13" fill="${t.title}" font-weight="600" dominant-baseline="middle" text-anchor="end" font-family="'Segoe UI', Ubuntu, sans-serif">${pct}%</text>
    </g>`
    }).join('')

    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="${height}" viewBox="0 0 400 ${height}" fill="none">
  <rect x="0.5" y="0.5" width="399" height="${height - 1}" rx="8" ry="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
  <text x="24" y="35" font-size="16" font-weight="700" fill="${t.title}" font-family="'Segoe UI', Ubuntu, sans-serif">Top Languages by Repo</text>
  <!-- progress bar background -->
  <rect x="25" y="52" width="${barW}" height="10" rx="5" fill="${t.gridColor}"/>
  ${progressBars}
  ${rows}
</svg>`
}

/* ████████████████ LANGUAGES BY COMMIT ████████████████ */

export function renderLanguagesByCommit(
    data: GithubProfileData,
    t: CardThemeColors
): string {
    const raw = data.commitsByLanguage
    let entries = Object.entries(raw)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6)

    const hasData = entries.length > 0
    if (!hasData) {
        entries = [
            ['JavaScript', 40], ['TypeScript', 25], ['Python', 18],
            ['HTML', 10], ['CSS', 7],
        ]
    }

    const total = entries.reduce((s, [, v]) => s + v, 0)
    const barW = 340
    const rowH = 36
    const height = 80 + entries.length * rowH + 20

    let barX = 25
    const progressBars = entries.map(([, v], i) => {
        const w = (v / total) * barW
        const svg = `<rect x="${barX}" y="52" width="${Math.max(w, 2)}" height="10" rx="5" fill="${t.chartColors[i % t.chartColors.length]}"/>`
        barX += w
        return svg
    }).join('\n  ')

    const rows = entries.map(([name, value], i) => {
        const pct = ((value / total) * 100).toFixed(1)
        const y = 88 + i * rowH
        const color = t.chartColors[i % t.chartColors.length]
        return `
    <g transform="translate(0, ${y})">
      <circle cx="35" cy="0" r="6" fill="${color}"/>
      <text x="50" y="1" font-size="13" fill="${t.text}" dominant-baseline="middle" font-family="'Segoe UI', Ubuntu, sans-serif">${esc(name)}</text>
      <text x="365" y="1" font-size="13" fill="${t.title}" font-weight="600" dominant-baseline="middle" text-anchor="end" font-family="'Segoe UI', Ubuntu, sans-serif">${pct}%</text>
    </g>`
    }).join('')

    const noDataLabel = !hasData
        ? `<text x="200" y="${height - 12}" text-anchor="middle" font-size="11" fill="${t.subtext}" font-family="'Segoe UI', Ubuntu, sans-serif" font-style="italic">No recent push events — preview data</text>`
        : ''

    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="${height}" viewBox="0 0 400 ${height}" fill="none">
  <rect x="0.5" y="0.5" width="399" height="${height - 1}" rx="8" ry="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
  <text x="24" y="35" font-size="16" font-weight="700" fill="${t.title}" font-family="'Segoe UI', Ubuntu, sans-serif">Top Languages by Commit</text>
  <rect x="25" y="52" width="${barW}" height="10" rx="5" fill="${t.gridColor}"/>
  ${progressBars}
  ${rows}
  ${noDataLabel}
</svg>`
}

/* ████████████████ COMMITS BY HOUR (Bar chart) ████████████████ */

export function renderCommitsByHour(
    data: GithubProfileData,
    t: CardThemeColors
): string {
    const hours = data.hourlyCommits
    const hasData = hours.some(c => c > 0)
    const displayData = hasData
        ? hours
        : hours.map((_, h) => Math.round(Math.sin((h - 6) * 0.5) * 3 + 4))

    const max = Math.max(...displayData, 1)

    const width = 500
    const height = 240
    const chartX = 45
    const chartY = 50
    const chartW = width - chartX - 20
    const chartH = 140
    const barW = chartW / 24 - 2

    const bars = displayData.map((count, i) => {
        const barH = (count / max) * chartH
        const x = chartX + i * (chartW / 24) + 1
        const y = chartY + chartH - barH
        return `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="2" fill="${t.barFill}" opacity="${hasData ? 1 : 0.35}"/>`
    }).join('\n  ')

    // X-axis labels (every 3 hours)
    const xLabels = [0, 3, 6, 9, 12, 15, 18, 21].map(h => {
        const x = chartX + h * (chartW / 24) + barW / 2
        return `<text x="${x}" y="${chartY + chartH + 18}" font-size="11" fill="${t.text}" text-anchor="middle" font-family="'Segoe UI', Ubuntu, sans-serif">${h}</text>`
    }).join('\n  ')

    // Y-axis ticks
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map(pct => {
        const y = chartY + chartH * (1 - pct)
        const val = Math.round(max * pct)
        return `
    <line x1="${chartX}" y1="${y}" x2="${chartX + chartW}" y2="${y}" stroke="${t.gridColor}" stroke-width="0.5" stroke-dasharray="4,4"/>
    <text x="${chartX - 6}" y="${y + 4}" font-size="10" fill="${t.subtext}" text-anchor="end" font-family="'Segoe UI', Ubuntu, sans-serif">${val}</text>`
    }).join('')

    const noDataLabel = !hasData
        ? `<text x="${width / 2}" y="${height - 8}" text-anchor="middle" font-size="11" fill="${t.subtext}" font-family="'Segoe UI', Ubuntu, sans-serif" font-style="italic">No recent push events — preview data</text>`
        : ''

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="8" ry="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
  <text x="24" y="32" font-size="16" font-weight="700" fill="${t.title}" font-family="'Segoe UI', Ubuntu, sans-serif">Commits by Hour</text>
  ${yTicks}
  ${bars}
  ${xLabels}
  <text x="${chartX + chartW}" y="${chartY + chartH + 18}" font-size="10" fill="${t.subtext}" text-anchor="end" font-family="'Segoe UI', Ubuntu, sans-serif">per day hour</text>
  ${noDataLabel}
</svg>`
}

/* ████████████████ REPO TABLE ████████████████ */

export function renderRepoTable(
    data: GithubProfileData,
    t: CardThemeColors
): string {
    const topRepos = [...data.repos]
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 6)

    const rowH = 30
    const headerH = 35
    const width = 500
    const height = 75 + headerH + topRepos.length * rowH + 15

    const headerRow = `
    <rect x="25" y="64" width="${width - 50}" height="${headerH}" rx="4" fill="${t.gridColor}"/>
    <text x="40" y="${64 + headerH / 2 + 1}" font-size="11" font-weight="700" fill="${t.subtext}" dominant-baseline="middle" text-anchor="start" font-family="'Segoe UI', Ubuntu, sans-serif" letter-spacing="0.08em">REPO</text>
    <text x="230" y="${64 + headerH / 2 + 1}" font-size="11" font-weight="700" fill="${t.subtext}" dominant-baseline="middle" text-anchor="start" font-family="'Segoe UI', Ubuntu, sans-serif" letter-spacing="0.08em">LANGUAGE</text>
    <text x="370" y="${64 + headerH / 2 + 1}" font-size="11" font-weight="700" fill="${t.subtext}" dominant-baseline="middle" text-anchor="end" font-family="'Segoe UI', Ubuntu, sans-serif" letter-spacing="0.08em">⭐ STARS</text>
    <text x="456" y="${64 + headerH / 2 + 1}" font-size="11" font-weight="700" fill="${t.subtext}" dominant-baseline="middle" text-anchor="end" font-family="'Segoe UI', Ubuntu, sans-serif" letter-spacing="0.08em">🍴 FORKS</text>`

    const rows = topRepos.map((repo, i) => {
        const y = 64 + headerH + i * rowH
        const bg = i % 2 === 0 ? '' : `<rect x="25" y="${y}" width="${width - 50}" height="${rowH}" fill="${t.gridColor}" opacity="0.4"/>`
        return `
    ${bg}
    <text x="40" y="${y + rowH / 2 + 1}" font-size="13" fill="${t.areaStroke}" font-weight="500" dominant-baseline="middle" font-family="'Segoe UI', Ubuntu, sans-serif">${esc(truncate(repo.name, 25))}</text>
    <text x="230" y="${y + rowH / 2 + 1}" font-size="12" fill="${t.text}" dominant-baseline="middle" font-family="'Segoe UI', Ubuntu, sans-serif">${esc(repo.language || '—')}</text>
    <text x="370" y="${y + rowH / 2 + 1}" font-size="13" fill="${t.title}" font-weight="600" dominant-baseline="middle" text-anchor="end" font-family="'Segoe UI', Ubuntu, sans-serif">${repo.stars.toLocaleString()}</text>
    <text x="456" y="${y + rowH / 2 + 1}" font-size="13" fill="${t.title}" font-weight="600" dominant-baseline="middle" text-anchor="end" font-family="'Segoe UI', Ubuntu, sans-serif">${repo.forks.toLocaleString()}</text>`
    }).join('')

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="8" ry="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
  <text x="24" y="32" font-size="16" font-weight="700" fill="${t.title}" font-family="'Segoe UI', Ubuntu, sans-serif">Highlighted Repositories</text>
  <text x="24" y="52" font-size="12" fill="${t.subtext}" font-family="'Segoe UI', Ubuntu, sans-serif">Top public repos by stars</text>
  ${headerRow}
  ${rows}
</svg>`
}
