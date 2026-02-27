import React from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'
import type { GithubUserProfile, WeeklyPoint } from '../github/types'
import { useTheme } from '../theme'

interface Props {
    profile: GithubUserProfile
    weeklyActivity: WeeklyPoint[]
    yearCommitCount: number
    repoCount: number
    totalStars?: number
}

/* ── SVG icons ── */
const IconContributions = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
)
const IconRepo = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
)
const IconCalendar = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)
const IconMail = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
)
const IconLocation = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
)
const IconCompany = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
)
const IconFollowers = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)
const IconStar = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)
const IconLink2 = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
)
const IconTwitter = ({ color }: { color: string }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

export const ProfileHeader: React.FC<Props> = ({
    profile,
    weeklyActivity,
    yearCommitCount,
    repoCount,
    totalStars = 0,
}) => {
    const { colors } = useTheme()
    const joinedYears =
        new Date().getFullYear() - new Date(profile.createdAt).getFullYear()
    const joinedDate = new Date(profile.createdAt).toLocaleDateString('en', {
        month: 'short',
        year: 'numeric',
    })

    return (
        <div
            style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                padding: '24px 28px',
                display: 'flex',
                gap: 24,
                flexWrap: 'wrap',
                alignItems: 'flex-start',
            }}
        >
            {/* ─── left: avatar + profile info ─── */}
            <div style={{ flex: '1 1 340px', minWidth: 280, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                {/* Avatar */}
                <img
                    src={profile.avatarUrl}
                    alt={profile.login}
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: '50%',
                        border: `3px solid ${colors.areaStroke}`,
                        flexShrink: 0,
                    }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Name & login */}
                    <h2
                        style={{
                            margin: 0,
                            fontSize: 22,
                            fontWeight: 700,
                            color: colors.title,
                            lineHeight: 1.3,
                        }}
                    >
                        {profile.name || profile.login}
                    </h2>
                    {profile.name && (
                        <a
                            href={profile.htmlUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                fontSize: 14,
                                color: colors.areaStroke,
                                textDecoration: 'none',
                                fontWeight: 500,
                            }}
                        >
                            @{profile.login}
                        </a>
                    )}

                    {/* Bio */}
                    {profile.bio && (
                        <p
                            style={{
                                margin: '8px 0 0',
                                fontSize: 13,
                                color: colors.text,
                                lineHeight: 1.5,
                            }}
                        >
                            {profile.bio}
                        </p>
                    )}

                    {/* Details grid */}
                    <div
                        style={{
                            marginTop: 12,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 7,
                            fontSize: 13,
                            color: colors.text,
                        }}
                    >
                        {/* Location & Company row */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {profile.location && (
                                <Row icon={<IconLocation color={colors.areaStroke} />}>
                                    {profile.location}
                                </Row>
                            )}
                            {profile.company && (
                                <Row icon={<IconCompany color={colors.areaStroke} />}>
                                    {profile.company}
                                </Row>
                            )}
                        </div>

                        {/* Email */}
                        {profile.email && (
                            <Row icon={<IconMail color={colors.areaStroke} />}>
                                <a href={`mailto:${profile.email}`} style={{ color: colors.areaStroke, textDecoration: 'none' }}>
                                    {profile.email}
                                </a>
                            </Row>
                        )}

                        {/* Blog / Website */}
                        {profile.blog && (
                            <Row icon={<IconLink2 color={colors.areaStroke} />}>
                                <a
                                    href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: colors.areaStroke, textDecoration: 'none' }}
                                >
                                    {profile.blog.replace(/^https?:\/\//, '')}
                                </a>
                            </Row>
                        )}

                        {/* Twitter */}
                        {profile.twitterUsername && (
                            <Row icon={<IconTwitter color={colors.areaStroke} />}>
                                <a
                                    href={`https://twitter.com/${profile.twitterUsername}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: colors.areaStroke, textDecoration: 'none' }}
                                >
                                    @{profile.twitterUsername}
                                </a>
                            </Row>
                        )}

                        {/* Key stats row */}
                        <div
                            style={{
                                marginTop: 4,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 14,
                                fontSize: 13,
                            }}
                        >
                            <Row icon={<IconFollowers color={colors.areaStroke} />}>
                                <strong style={{ color: colors.title }}>{profile.followers}</strong> followers
                                <span style={{ color: colors.subtext, margin: '0 2px' }}>·</span>
                                <strong style={{ color: colors.title }}>{profile.following}</strong> following
                            </Row>
                            <Row icon={<IconStar color={colors.areaStroke} />}>
                                <strong style={{ color: colors.title }}>{totalStars}</strong> stars
                            </Row>
                        </div>

                        {/* Contributions + repos + joined */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 2 }}>
                            <Row icon={<IconContributions color={colors.areaStroke} />}>
                                <strong style={{ color: colors.title }}>{yearCommitCount}</strong> contributions ({new Date().getFullYear()})
                            </Row>
                            <Row icon={<IconRepo color={colors.areaStroke} />}>
                                <strong style={{ color: colors.title }}>{repoCount}</strong> repos
                            </Row>
                            <Row icon={<IconCalendar color={colors.areaStroke} />}>
                                Joined {joinedDate} ({joinedYears}y ago)
                            </Row>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── right: area chart ─── */}
            <div style={{ flex: '2 1 380px', minWidth: 300, height: 195 }}>
                <p
                    style={{
                        margin: '0 0 6px',
                        textAlign: 'right',
                        fontSize: 13,
                        color: colors.subtext,
                        fontWeight: 500,
                    }}
                >
                    contributions in the last year
                </p>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyActivity}>
                        <defs>
                            <linearGradient id="profileArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={colors.areaStroke} stopOpacity={0.5} />
                                <stop offset="100%" stopColor={colors.areaStroke} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke={colors.gridColor} strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: colors.subtext, fontSize: 11 }}
                            axisLine={{ stroke: colors.gridColor }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: colors.subtext, fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            width={30}
                        />
                        <Tooltip
                            contentStyle={{
                                background: colors.tooltipBg,
                                border: `1px solid ${colors.tooltipBorder}`,
                                borderRadius: 6,
                                fontSize: 13,
                                color: colors.title,
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="count"
                            stroke={colors.areaStroke}
                            fill="url(#profileArea)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const Row: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({
    icon,
    children,
}) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ flexShrink: 0, display: 'flex' }}>{icon}</span>
        <span>{children}</span>
    </div>
)
