import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useGithubProfile } from '../github/useGithubProfile'
import { ProfileHeader } from './ProfileHeader'
import { LanguagesByRepo } from './LanguagesByRepo'
import { LanguagesByCommit } from './LanguagesByCommit'
import { CommitsByHour } from './CommitsByHour'
import { StatsCard } from './StatsCard'
import { RepoStatsTable } from './RepoStatsTable'
import { useTheme } from '../theme'
import type { CardTheme } from '../theme'
import { CARD_THEME_NAMES } from '../theme'

export const EmbedChart: React.FC = () => {
  const { username, chartType } = useParams<{
    username: string
    chartType: string
  }>()
  const [searchParams] = useSearchParams()
  const themeParam = searchParams.get('theme') as CardTheme | null

  const { setCardTheme } = useTheme()

  // Apply theme from URL param on mount
  React.useEffect(() => {
    if (themeParam && CARD_THEME_NAMES.includes(themeParam)) {
      setCardTheme(themeParam)
    }
  }, [themeParam, setCardTheme])

  /* Make body transparent so only the component is visible */
  React.useEffect(() => {
    document.body.style.background = 'transparent'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    const root = document.getElementById('app')
    if (root) {
      root.style.background = 'transparent'
    }
    return () => {
      document.body.style.background = ''
      document.body.style.margin = ''
      document.body.style.padding = ''
      if (root) root.style.background = ''
    }
  }, [])

  const { data, loading, error } = useGithubProfile(username)

  if (!username || !chartType) return null

  return (
    <div
      style={{
        display: 'inline-block',
      }}
    >
      {loading && (
        <div style={{ textAlign: 'center', fontSize: 14, color: '#8b949e', padding: 16 }}>
          Loading…
        </div>
      )}
      {error && (
        <div
          style={{
            borderRadius: 12,
            border: '1px solid rgba(127,29,29,0.6)',
            background: 'rgba(127,29,29,0.35)',
            padding: 12,
            fontSize: 14,
            color: '#fca5a5',
          }}
        >
          {error}
        </div>
      )}
      {data && !loading && !error && (
        <>
          {chartType === 'profile-header' && (
            <ProfileHeader
              profile={data.profile}
              weeklyActivity={data.weeklyActivity}
              yearCommitCount={data.yearCommitCount}
              repoCount={data.repos.length}
              totalStars={data.totalStars}
            />
          )}
          {chartType === 'languages-by-repo' && (
            <LanguagesByRepo data={data.languages.byRepoCount} />
          )}
          {chartType === 'languages-by-commit' && (
            <LanguagesByCommit data={data.commitsByLanguage} />
          )}
          {chartType === 'commits-by-hour' && (
            <CommitsByHour hourlyCommits={data.hourlyCommits} />
          )}
          {chartType === 'stats' && (
            <StatsCard
              profile={data.profile}
              totalStars={data.totalStars}
              yearCommitCount={data.yearCommitCount}
              totalRepos={data.repos.length}
              totalIssues={data.totalIssues}
              totalPRs={data.totalPRs}
              contributedTo={data.contributedTo}
            />
          )}
          {chartType === 'repo-table' && (
            <RepoStatsTable repos={data.repos} />
          )}
        </>
      )}
    </div>
  )
}
