import { useEffect, useState } from 'react'
import type {
  ActivityPoint,
  GithubProfileData,
  GithubUserProfile,
  LanguageAggregates,
  SimpleRepo,
  WeeklyPoint,
} from './types'

interface GithubProfileState {
  data: GithubProfileData | null
  loading: boolean
  error: string | null
}

export function useGithubProfile(username?: string | null): GithubProfileState {
  const [state, setState] = useState<GithubProfileState>({
    data: null,
    loading: false,
    error: null,
  })

  useEffect(() => {
    if (!username) {
      setState({ data: null, loading: false, error: null })
      return
    }

    const controller = new AbortController()

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        /* ── 1. Profile ── */
        const profileRes = await fetch(
          `https://api.github.com/users/${username}`,
          { signal: controller.signal },
        )
        if (!profileRes.ok) {
          throw new Error(
            profileRes.status === 404
              ? `User "${username}" not found on GitHub.`
              : `Failed to load GitHub profile (status ${profileRes.status}).`,
          )
        }
        const profileJson = await profileRes.json()
        const profile: GithubUserProfile = {
          login: profileJson.login,
          name: profileJson.name,
          avatarUrl: profileJson.avatar_url,
          publicRepos: profileJson.public_repos,
          createdAt: profileJson.created_at,
          email: profileJson.email,
          followers: profileJson.followers ?? 0,
          following: profileJson.following ?? 0,
          bio: profileJson.bio,
          location: profileJson.location,
          company: profileJson.company,
          blog: profileJson.blog || null,
          twitterUsername: profileJson.twitter_username || null,
          htmlUrl: profileJson.html_url,
        }

        /* ── 2. Repos ── */
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { signal: controller.signal },
        )
        if (!reposRes.ok) {
          throw new Error(
            `Failed to load repositories (status ${reposRes.status}).`,
          )
        }
        const reposJson: any[] = await reposRes.json()
        const repos: SimpleRepo[] = reposJson.map((repo) => ({
          name: repo.name,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          size: repo.size,
          htmlUrl: repo.html_url,
        }))

        /* ── 3. Events (public, up to 300) ── */
        let allEvents: any[] = []
        try {
          const eventsRes = await fetch(
            `https://api.github.com/users/${username}/events/public?per_page=100`,
            { signal: controller.signal },
          )
          if (eventsRes.ok) {
            allEvents = await eventsRes.json()
          }
        } catch {
          // events are optional
        }

        /* ── 4. Search API for issues, PRs, contributed-to ── */
        let totalIssues = 0
        let totalPRs = 0
        let contributedTo = 0

        try {
          // Total issues authored
          const issuesRes = await fetch(
            `https://api.github.com/search/issues?q=author:${username}+type:issue&per_page=1`,
            { signal: controller.signal },
          )
          if (issuesRes.ok) {
            const issuesData = await issuesRes.json()
            totalIssues = issuesData.total_count ?? 0
          }
        } catch { /* optional */ }

        try {
          // Total PRs authored
          const prsRes = await fetch(
            `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`,
            { signal: controller.signal },
          )
          if (prsRes.ok) {
            const prsData = await prsRes.json()
            totalPRs = prsData.total_count ?? 0
          }
        } catch { /* optional */ }

        try {
          // Contributed-to: repos this user has pushed to (excluding own repos)
          const contribRes = await fetch(
            `https://api.github.com/search/issues?q=author:${username}+type:pr+-user:${username}&per_page=1`,
            { signal: controller.signal },
          )
          if (contribRes.ok) {
            const contribData = await contribRes.json()
            contributedTo = contribData.total_count ?? 0
          }
        } catch { /* optional */ }

        /* ── build language aggregates ── */
        const languages: LanguageAggregates = buildLanguageAggregates(repos)

        /* ── build a repo→language map for events ── */
        const repoLangMap: Record<string, string> = {}
        for (const r of repos) {
          if (r.language) repoLangMap[r.name] = r.language
        }

        /* ── hourly commits & commits-by-language & extract email ── */
        const hourlyCommits = new Array(24).fill(0) as number[]
        const commitsByLanguage: Record<string, number> = {}
        let totalPushCommits = 0
        let extractedEmail: string | null = null

        const pushEvents = allEvents.filter((e: any) => e.type === 'PushEvent')
        for (const ev of pushEvents) {
          const commits: any[] = ev.payload?.commits ?? []
          const count: number = ev.payload?.size ?? commits.length ?? 1
          totalPushCommits += count

          const hour = new Date(ev.created_at).getHours()
          hourlyCommits[hour] += count

          // extract email from first commit authored by this user
          if (!extractedEmail && commits.length > 0) {
            for (const c of commits) {
              if (c.author?.email && !c.author.email.includes('noreply.github.com')) {
                extractedEmail = c.author.email
                break
              }
            }
          }

          // best-effort repo name extraction  "owner/repo" → "repo"
          const repoFullName: string = ev.repo?.name ?? ''
          const repoShortName = repoFullName.includes('/')
            ? repoFullName.split('/').pop()!
            : repoFullName
          const lang = repoLangMap[repoShortName]
          if (lang) {
            commitsByLanguage[lang] = (commitsByLanguage[lang] ?? 0) + count
          }
        }

        // use extracted email if profile email is null
        if (!profile.email && extractedEmail) {
          profile.email = extractedEmail
        }

        /* ── weekly activity (aggregate events by week) ── */
        const weeklyActivity = buildWeeklyActivity(allEvents)

        /* ── activity points (daily) ── */
        const activity = buildDailyActivity(allEvents)

        /* ── totals ── */
        const totalStars = repos.reduce((s, r) => s + r.stars, 0)
        const yearCommitCount = totalPushCommits

        const data: GithubProfileData = {
          profile,
          languages,
          activity,
          repos,
          yearCommitCount,
          hourlyCommits,
          commitsByLanguage,
          totalStars,
          weeklyActivity,
          totalIssues,
          totalPRs,
          contributedTo,
        }

        setState({ data, loading: false, error: null })
      } catch (err: any) {
        if (controller.signal.aborted) return
        setState({
          data: null,
          loading: false,
          error: err?.message ?? 'Failed to load GitHub data.',
        })
      }
    }

    load()
    return () => {
      controller.abort()
    }
  }, [username])

  return state
}

/* ─── helpers ─── */

function buildLanguageAggregates(repos: SimpleRepo[]): LanguageAggregates {
  const byRepoCount: Record<string, number> = {}
  const bySize: Record<string, number> = {}
  for (const repo of repos) {
    if (!repo.language) continue
    const lang = repo.language
    byRepoCount[lang] = (byRepoCount[lang] ?? 0) + 1
    bySize[lang] = (bySize[lang] ?? 0) + repo.size
  }
  return { byRepoCount, bySize }
}

function buildDailyActivity(events: any[]): ActivityPoint[] {
  const map: Record<string, number> = {}
  for (const ev of events) {
    if (ev.type !== 'PushEvent') continue
    const day = (ev.created_at as string).slice(0, 10)
    const count = ev.payload?.size ?? ev.payload?.commits?.length ?? 1
    map[day] = (map[day] ?? 0) + count
  }
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, commits]) => ({ date, commits }))
}

function buildWeeklyActivity(events: any[]): WeeklyPoint[] {
  const map: Record<string, number> = {}
  for (const ev of events) {
    if (ev.type !== 'PushEvent') continue
    const d = new Date(ev.created_at)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(d)
    monday.setDate(diff)
    const key = monday.toISOString().slice(0, 10)
    const count = ev.payload?.size ?? ev.payload?.commits?.length ?? 1
    map[key] = (map[key] ?? 0) + count
  }

  const keys = Object.keys(map).sort()
  if (keys.length === 0) return []

  const result: WeeklyPoint[] = []
  const start = new Date(keys[0]!)
  const end = new Date(keys[keys.length - 1]!)

  const cursor = new Date(start)
  while (cursor <= end) {
    const k = cursor.toISOString().slice(0, 10)
    const month = cursor.toLocaleString('en', { month: 'short' })
    const dayNum = cursor.getDate().toString().padStart(2, '0')
    result.push({ label: `${month} ${dayNum}`, count: map[k] ?? 0 })
    cursor.setDate(cursor.getDate() + 7)
  }

  return result
}
