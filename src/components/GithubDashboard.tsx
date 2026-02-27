import React from 'react'
import { useGithubProfile } from '../github/useGithubProfile'
import { ProfileHeader } from './ProfileHeader'
import { LanguagesByRepo } from './LanguagesByRepo'
import { LanguagesByCommit } from './LanguagesByCommit'
import { CommitsByHour } from './CommitsByHour'
import { StatsCard } from './StatsCard'
import { RepoStatsTable } from './RepoStatsTable'
import { CardWrapper } from './CardWrapper'
import { GoogleAd } from './GoogleAd'
import { useTheme } from '../theme'

interface Props {
  username?: string
}

export const GithubDashboard: React.FC<Props> = ({ username }) => {
  const { data, loading, error } = useGithubProfile(username)
  const { siteTheme } = useTheme()

  const mutedText = siteTheme === 'dark' ? '#94a3b8' : '#64748b'
  const cardBorder = siteTheme === 'dark' ? '#1e293b' : '#e2e8f0'
  const errorBg = siteTheme === 'dark' ? 'rgba(127,29,29,0.35)' : '#fef2f2'
  const errorBorder = siteTheme === 'dark' ? 'rgba(127,29,29,0.6)' : '#fecaca'
  const errorText = siteTheme === 'dark' ? '#fca5a5' : '#b91c1c'

  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1 }}>
      {!username && (
        <section
          style={{
            borderRadius: 16,
            border: `2px dashed ${cardBorder}`,
            padding: '40px 24px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
            Start by entering a GitHub username
          </h2>
          <p style={{ marginTop: 8, fontSize: 14, color: mutedText }}>
            We'll analyse public repositories, languages, and activity to build
            rich visualizations.
          </p>
        </section>
      )}

      {username && loading && (
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            borderRadius: 16,
            border: `1px solid ${cardBorder}`,
            padding: 32,
            fontSize: 14,
            color: mutedText,
          }}
        >
          Loading GitHub data…
        </div>
      )}

      {username && error && (
        <div
          style={{
            borderRadius: 16,
            border: `1px solid ${errorBorder}`,
            background: errorBg,
            padding: 16,
            fontSize: 14,
            color: errorText,
          }}
        >
          {error}
        </div>
      )}

      {username && data && !loading && !error && (
        <>
          {/* ── Profile Header (full width) ── */}
          <CardWrapper
            chartType="profile-header"
            username={username}
            title={`${username}'s Profile`}
          >
            <ProfileHeader
              profile={data.profile}
              weeklyActivity={data.weeklyActivity}
              yearCommitCount={data.yearCommitCount}
              repoCount={data.repos.length}
              totalStars={data.totalStars}
            />
          </CardWrapper>

          {/* ── Ad: below profile header ── */}
          <GoogleAd adSlot="YOUR_AD_SLOT_1" adFormat="horizontal" />

          {/* ── 2×2 chart grid ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}
          >
            {/* Row 1 */}
            <CardWrapper
              chartType="languages-by-repo"
              username={username}
              title={`${username}'s Top Languages by Repo`}
            >
              <LanguagesByRepo data={data.languages.byRepoCount} />
            </CardWrapper>
            <CardWrapper
              chartType="languages-by-commit"
              username={username}
              title={`${username}'s Top Languages by Commit`}
            >
              <LanguagesByCommit data={data.commitsByLanguage} />
            </CardWrapper>
            {/* Row 2 */}
            <CardWrapper
              chartType="commits-by-hour"
              username={username}
              title={`${username}'s Commits by Hour`}
            >
              <CommitsByHour hourlyCommits={data.hourlyCommits} />
            </CardWrapper>
            <CardWrapper
              chartType="stats"
              username={username}
              title={`${username}'s Stats`}
            >
              <StatsCard
                profile={data.profile}
                totalStars={data.totalStars}
                yearCommitCount={data.yearCommitCount}
                totalRepos={data.repos.length}
                totalIssues={data.totalIssues}
                totalPRs={data.totalPRs}
                contributedTo={data.contributedTo}
              />
            </CardWrapper>
          </div>

          {/* ── Ad: between charts and repo table ── */}
          <GoogleAd adSlot="YOUR_AD_SLOT_2" adFormat="auto" />

          {/* ── repos table ── */}
          <CardWrapper
            chartType="repo-table"
            username={username}
            title={`${username}'s Highlighted Repos`}
          >
            <RepoStatsTable repos={data.repos} />
          </CardWrapper>
        </>
      )}
    </main>
  )
}
