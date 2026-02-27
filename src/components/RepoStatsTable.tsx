import React from 'react'
import type { SimpleRepo } from '../github/types'
import { useTheme } from '../theme'

interface Props {
  repos: SimpleRepo[]
}

export const RepoStatsTable: React.FC<Props> = ({ repos }) => {
  const { colors } = useTheme()
  const topByStars = [...repos]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 7)

  return (
    <div
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        padding: '24px 28px',
      }}
    >
      <h3
        style={{
          margin: '0 0 6px',
          fontSize: 19,
          fontWeight: 700,
          color: colors.title,
        }}
      >
        Highlighted Repositories
      </h3>
      <p style={{ margin: '0 0 16px', fontSize: 14, color: colors.subtext }}>
        Top public repos by stars
      </p>

      <div
        style={{
          overflow: 'hidden',
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 15,
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ background: colors.gridColor }}>
              <Th colors={colors}>Repo</Th>
              <Th colors={colors}>Language</Th>
              <Th colors={colors} align="right">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.subtext} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  Stars
                </span>
              </Th>
              <Th colors={colors} align="right">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.subtext} strokeWidth="2"><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" /><line x1="12" y1="12" x2="12" y2="15" /></svg>
                  Forks
                </span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {topByStars.map((repo, idx) => (
              <tr
                key={repo.name}
                style={{
                  background:
                    idx % 2 === 0 ? 'transparent' : colors.gridColor + '60',
                }}
              >
                <td style={{ padding: '10px 16px' }}>
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: colors.areaStroke, textDecoration: 'none', fontWeight: 500 }}
                  >
                    {repo.name}
                  </a>
                </td>
                <td style={{ padding: '10px 16px', color: colors.text }}>
                  {repo.language ?? '—'}
                </td>
                <td
                  style={{
                    padding: '10px 16px',
                    textAlign: 'right',
                    color: colors.title,
                    fontWeight: 600,
                  }}
                >
                  {repo.stars.toLocaleString()}
                </td>
                <td
                  style={{
                    padding: '10px 16px',
                    textAlign: 'right',
                    color: colors.title,
                    fontWeight: 600,
                  }}
                >
                  {repo.forks.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Th: React.FC<{
  colors: any
  align?: string
  children: React.ReactNode
}> = ({ colors, align, children }) => (
  <th
    style={{
      padding: '12px 16px',
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: colors.subtext,
      textAlign: (align as any) ?? 'left',
    }}
  >
    {children}
  </th>
)
