import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from 'recharts'
import { useTheme } from '../theme'

interface Props {
    data: Record<string, number>
}

const SAMPLE_DATA = [
    { name: 'JavaScript', value: 40 },
    { name: 'TypeScript', value: 25 },
    { name: 'Python', value: 18 },
    { name: 'HTML', value: 10 },
    { name: 'CSS', value: 7 },
]

export const LanguagesByCommit: React.FC<Props> = ({ data: rawData }) => {
    const { colors } = useTheme()

    const entries = Object.entries(rawData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, value]) => ({ name, value }))

    const hasData = entries.length > 0
    const displayEntries = hasData ? entries : SAMPLE_DATA
    const total = displayEntries.reduce((s, e) => s + e.value, 0)

    return (
        <div
            style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                padding: '24px 28px',
                position: 'relative',
            }}
        >
            <h3
                style={{
                    margin: '0 0 20px',
                    fontSize: 19,
                    fontWeight: 700,
                    color: colors.title,
                }}
            >
                Top Languages by Commit
            </h3>

            {!hasData && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                        background: `${colors.bg}dd`,
                        borderRadius: 10,
                        padding: '12px 24px',
                        fontSize: 13,
                        color: colors.subtext,
                        fontWeight: 500,
                        textAlign: 'center',
                        border: `1px solid ${colors.border}`,
                        backdropFilter: 'blur(4px)',
                    }}
                >
                    No recent push events — chart shows preview
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: hasData ? 1 : 0.35 }}>
                {/* legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
                    {displayEntries.map((e, i) => (
                        <div
                            key={e.name}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                fontSize: 15,
                                color: colors.text,
                            }}
                        >
                            <span
                                style={{
                                    width: 14,
                                    height: 14,
                                    borderRadius: 3,
                                    background: colors.chartColors[i % colors.chartColors.length],
                                    flexShrink: 0,
                                }}
                            />
                            {e.name}
                        </div>
                    ))}
                </div>

                {/* donut - direct PieChart to avoid ResponsiveContainer sizing issues */}
                <div style={{ width: 200, height: 200, flexShrink: 0, marginLeft: 'auto' }}>
                    <PieChart width={200} height={200}>
                        <Pie
                            data={displayEntries}
                            dataKey="value"
                            nameKey="name"
                            cx={100}
                            cy={100}
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            strokeWidth={0}
                        >
                            {displayEntries.map((e, i) => (
                                <Cell
                                    key={e.name}
                                    fill={colors.chartColors[i % colors.chartColors.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number | undefined) => {
                                const v = value ?? 0
                                return `${v} commit${v !== 1 ? 's' : ''} (${((v / total) * 100).toFixed(1)}%)`
                            }}
                            contentStyle={{
                                background: colors.tooltipBg,
                                border: `1px solid ${colors.tooltipBorder}`,
                                borderRadius: 6,
                                fontSize: 13,
                                color: colors.title,
                            }}
                        />
                    </PieChart>
                </div>
            </div>
        </div>
    )
}
