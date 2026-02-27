/**
 * Server-side GitHub data fetcher for SVG card generation.
 * Mirrors the client-side useGithubProfile hook.
 */

export interface GithubUserProfile {
    login: string
    name: string | null
    avatarUrl: string
    publicRepos: number
    createdAt: string
    email: string | null
    followers: number
    following: number
    bio: string | null
    location: string | null
    company: string | null
    blog: string | null
    twitterUsername: string | null
    htmlUrl: string
}

export interface SimpleRepo {
    name: string
    language: string | null
    stars: number
    forks: number
    size: number
    htmlUrl: string
}

export interface GithubProfileData {
    profile: GithubUserProfile
    repos: SimpleRepo[]
    yearCommitCount: number
    hourlyCommits: number[]
    commitsByLanguage: Record<string, number>
    totalStars: number
    totalIssues: number
    totalPRs: number
    contributedTo: number
    languagesByRepo: Record<string, number>
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''

function headers(): Record<string, string> {
    const h: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'github-visualize-svg',
    }
    if (GITHUB_TOKEN) h.Authorization = `Bearer ${GITHUB_TOKEN}`
    return h
}

export async function fetchGithubData(
    username: string
): Promise<GithubProfileData> {
    /* 1. Profile */
    const profileRes = await fetch(
        `https://api.github.com/users/${username}`,
        { headers: headers() }
    )
    if (!profileRes.ok) {
        throw new Error(
            profileRes.status === 404
                ? `User "${username}" not found`
                : `GitHub API error (${profileRes.status})`
        )
    }
    const pj = await profileRes.json()
    const profile: GithubUserProfile = {
        login: pj.login,
        name: pj.name,
        avatarUrl: pj.avatar_url,
        publicRepos: pj.public_repos,
        createdAt: pj.created_at,
        email: pj.email,
        followers: pj.followers ?? 0,
        following: pj.following ?? 0,
        bio: pj.bio,
        location: pj.location,
        company: pj.company,
        blog: pj.blog || null,
        twitterUsername: pj.twitter_username || null,
        htmlUrl: pj.html_url,
    }

    /* 2. Repos */
    const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        { headers: headers() }
    )
    const reposJson: any[] = reposRes.ok ? await reposRes.json() : []
    const repos: SimpleRepo[] = reposJson.map((r: any) => ({
        name: r.name,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        size: r.size,
        htmlUrl: r.html_url,
    }))

    /* 3. Events */
    let allEvents: any[] = []
    try {
        const eventsRes = await fetch(
            `https://api.github.com/users/${username}/events/public?per_page=100`,
            { headers: headers() }
        )
        if (eventsRes.ok) allEvents = await eventsRes.json()
    } catch { /* optional */ }

    /* 4. Search API */
    let totalIssues = 0, totalPRs = 0, contributedTo = 0
    try {
        const ir = await fetch(
            `https://api.github.com/search/issues?q=author:${username}+type:issue&per_page=1`,
            { headers: headers() }
        )
        if (ir.ok) totalIssues = (await ir.json()).total_count ?? 0
    } catch { }
    try {
        const pr = await fetch(
            `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`,
            { headers: headers() }
        )
        if (pr.ok) totalPRs = (await pr.json()).total_count ?? 0
    } catch { }
    try {
        const cr = await fetch(
            `https://api.github.com/search/issues?q=author:${username}+type:pr+-user:${username}&per_page=1`,
            { headers: headers() }
        )
        if (cr.ok) contributedTo = (await cr.json()).total_count ?? 0
    } catch { }

    /* Build aggregates */
    const languagesByRepo: Record<string, number> = {}
    for (const r of repos) {
        if (r.language) languagesByRepo[r.language] = (languagesByRepo[r.language] ?? 0) + 1
    }

    const repoLangMap: Record<string, string> = {}
    for (const r of repos) {
        if (r.language) repoLangMap[r.name] = r.language
    }

    const hourlyCommits = new Array(24).fill(0) as number[]
    const commitsByLanguage: Record<string, number> = {}
    let totalPushCommits = 0

    const pushEvents = allEvents.filter((e: any) => e.type === 'PushEvent')
    for (const ev of pushEvents) {
        const commits: any[] = ev.payload?.commits ?? []
        const count: number = ev.payload?.size ?? commits.length ?? 1
        totalPushCommits += count
        const hour = new Date(ev.created_at).getHours()
        hourlyCommits[hour] += count

        const repoFullName: string = ev.repo?.name ?? ''
        const repoShortName = repoFullName.includes('/')
            ? repoFullName.split('/').pop()!
            : repoFullName
        const lang = repoLangMap[repoShortName]
        if (lang) commitsByLanguage[lang] = (commitsByLanguage[lang] ?? 0) + count
    }

    const totalStars = repos.reduce((s, r) => s + r.stars, 0)

    return {
        profile,
        repos,
        yearCommitCount: totalPushCommits,
        hourlyCommits,
        commitsByLanguage,
        totalStars,
        totalIssues,
        totalPRs,
        contributedTo,
        languagesByRepo,
    }
}
