/**
 * Vercel Serverless Function: /api/card/[username]/[type]
 *
 * Returns an SVG image that can be embedded in GitHub README files.
 *
 * Usage:
 *   ![Stats](https://github.gu-saurabh.site/api/card/Saurabhtbj1201/stats?theme=dark)
 *
 * Supported types:
 *   - stats
 *   - profile-header
 *   - languages-by-repo
 *   - languages-by-commit
 *   - commits-by-hour
 *   - repo-table
 *
 * Query params:
 *   - theme: default | dark | algolia | aura | aura_dark | dracula
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { fetchGithubData } from '../../lib/github'
import { getTheme } from '../../lib/themes'
import {
    renderStatsCard,
    renderProfileHeader,
    renderLanguagesByRepo,
    renderLanguagesByCommit,
    renderCommitsByHour,
    renderRepoTable,
} from '../../lib/cards'

const CACHE_SECONDS = 1800 // 30 min
const STALE_SECONDS = 3600 // 1 hour stale-while-revalidate

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    try {
        const { username, type } = req.query as {
            username: string
            type: string
        }

        if (!username || !type) {
            return res.status(400).send(errorSvg('Missing username or type'))
        }

        const theme = getTheme(req.query.theme as string)

        const data = await fetchGithubData(username)

        let svg: string

        switch (type) {
            case 'stats':
                svg = renderStatsCard(data, theme)
                break
            case 'profile-header':
                svg = renderProfileHeader(data, theme)
                break
            case 'languages-by-repo':
                svg = renderLanguagesByRepo(data, theme)
                break
            case 'languages-by-commit':
                svg = renderLanguagesByCommit(data, theme)
                break
            case 'commits-by-hour':
                svg = renderCommitsByHour(data, theme)
                break
            case 'repo-table':
                svg = renderRepoTable(data, theme)
                break
            default:
                return res.status(400).send(errorSvg(`Unknown chart type: "${type}"`))
        }

        res.setHeader('Content-Type', 'image/svg+xml')
        res.setHeader(
            'Cache-Control',
            `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`
        )
        return res.status(200).send(svg)
    } catch (err: any) {
        console.error('SVG card error:', err)
        res.setHeader('Content-Type', 'image/svg+xml')
        return res
            .status(500)
            .send(errorSvg(err?.message || 'Internal Server Error'))
    }
}

/**
 * Returns an error SVG so the image itself shows the error.
 */
function errorSvg(message: string): string {
    const esc = (s: string) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120" fill="none">
  <rect x="0.5" y="0.5" width="399" height="119" rx="8" ry="8" fill="#0d1117" stroke="#f85149" stroke-width="1"/>
  <text x="200" y="45" text-anchor="middle" font-size="14" font-weight="700" fill="#f85149" font-family="'Segoe UI', sans-serif">⚠️ Error</text>
  <text x="200" y="75" text-anchor="middle" font-size="12" fill="#8b949e" font-family="'Segoe UI', sans-serif">${esc(message)}</text>
</svg>`
}
