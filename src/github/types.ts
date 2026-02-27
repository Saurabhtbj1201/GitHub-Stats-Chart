export interface SimpleRepo {
  name: string
  language: string | null
  stars: number
  forks: number
  size: number
  htmlUrl: string
}

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

export interface LanguageAggregates {
  byRepoCount: Record<string, number>
  bySize: Record<string, number>
}

export interface ActivityPoint {
  date: string
  commits: number
}

export interface GithubProfileData {
  profile: GithubUserProfile
  languages: LanguageAggregates
  activity: ActivityPoint[]
  repos: SimpleRepo[]
  yearCommitCount: number
  hourlyCommits: number[]          // 24 elements, index = hour of day
  commitsByLanguage: Record<string, number>
  totalStars: number
  weeklyActivity: WeeklyPoint[]
  totalIssues: number
  totalPRs: number
  contributedTo: number
}

export interface WeeklyPoint {
  label: string   // e.g. "Feb 01"
  count: number
}
