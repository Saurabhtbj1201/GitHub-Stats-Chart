import React from 'react'
import type { GithubUserProfile } from '../github/types'
import { useTheme } from '../theme'

interface Props {
    profile: GithubUserProfile
    totalStars: number
    yearCommitCount: number
    totalRepos: number
    totalIssues: number
    totalPRs: number
    contributedTo: number
}

/* ── Professional SVG icons ── */
const IconStar = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)
const IconCommit = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <line x1="1.05" y1="12" x2="7" y2="12" />
        <line x1="17" y1="12" x2="22.95" y2="12" />
    </svg>
)
const IconRepo = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
)
const IconFollowers = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)
const IconIssue = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
)
const IconPR = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M13 6h3a2 2 0 0 1 2 2v7" />
        <line x1="6" y1="9" x2="6" y2="21" />
    </svg>
)
const IconContrib = ({ color }: { color: string }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 21V9a9 9 0 0 0 9 9" />
    </svg>
)

export const StatsCard: React.FC<Props> = ({
    profile,
    totalStars,
    yearCommitCount,
    totalRepos,
    totalIssues,
    totalPRs,
    contributedTo,
}) => {
    const { colors } = useTheme()

    const stats: { icon: React.ReactNode; label: string; value: string }[] = [
        {
            icon: <IconStar color={colors.areaStroke} />,
            label: 'Total Stars',
            value: formatNum(totalStars),
        },
        {
            icon: <IconCommit color={colors.areaStroke} />,
            label: `${new Date().getFullYear()} Commits`,
            value: formatNum(yearCommitCount),
        },
        {
            icon: <IconRepo color={colors.areaStroke} />,
            label: 'Total Repos',
            value: formatNum(totalRepos),
        },
        {
            icon: <IconFollowers color={colors.areaStroke} />,
            label: 'Followers',
            value: formatNum(profile.followers),
        },
        {
            icon: <IconIssue color={colors.areaStroke} />,
            label: 'Total Issues',
            value: formatNum(totalIssues),
        },
        {
            icon: <IconPR color={colors.areaStroke} />,
            label: 'Total PRs',
            value: formatNum(totalPRs),
        },
        {
            icon: <IconContrib color={colors.areaStroke} />,
            label: 'Contributed to',
            value: formatNum(contributedTo),
        },
    ]

    return (
        <div
            style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                padding: '28px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 28,
            }}
        >
            {/* stats list */}
            <div style={{ flex: 1 }}>
                <h3
                    style={{
                        margin: '0 0 18px',
                        fontSize: 22,
                        fontWeight: 700,
                        color: colors.title,
                    }}
                >
                    Stats
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                fontSize: 15,
                                color: colors.text,
                            }}
                        >
                            <span style={{ flexShrink: 0, display: 'flex' }}>{s.icon}</span>
                            <span style={{ flex: 1 }}>{s.label}</span>
                            <span
                                style={{
                                    fontWeight: 700,
                                    fontSize: 17,
                                    color: colors.title,
                                    minWidth: 50,
                                    textAlign: 'right',
                                }}
                            >
                                {s.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* github octocat silhouette */}
            <div style={{ flexShrink: 0, opacity: 1 }}>
                <svg
                    width="300"
                    height="300"
                    viewBox="0 0 16 16"
                    fill={colors.title}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
            2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
            0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
            0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68
            0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44
            1.1.16 1.92.08 2.12.51.56.82 1.27.82
            2.15 0 3.07-1.87 3.75-3.65
            3.95.29.25.54.73.54 1.48 0 1.07-.01
            1.93-.01 2.2 0 .21.15.46.55.38A8.013
            8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    />
                </svg>
            </div>
        </div>
    )
}

function formatNum(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
    return n.toLocaleString()
}
