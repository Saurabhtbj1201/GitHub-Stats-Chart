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

export const LanguagesByRepo: React.FC<Props> = ({ data: rawData }) => {
    const { colors } = useTheme()

    const entries = Object.entries(rawData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, value]) => ({ name, value }))

    const total = entries.reduce((s, e) => s + e.value, 0)

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
                    margin: '0 0 20px',
                    fontSize: 19,
                    fontWeight: 700,
                    color: colors.title,
                }}
            >
                Top Languages by Repo
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
                    {entries.map((e, i) => (
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

                {/* donut */}
                <div style={{ width: 200, height: 200, flexShrink: 0, marginLeft: 'auto' }}>
                    <PieChart width={200} height={200}>
                        <Pie
                            data={entries}
                            dataKey="value"
                            nameKey="name"
                            cx={100}
                            cy={100}
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            strokeWidth={0}
                        >
                            {entries.map((e, i) => (
                                <Cell
                                    key={e.name}
                                    fill={colors.chartColors[i % colors.chartColors.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number | undefined) => {
                                const v = value ?? 0
                                return `${v} repo${v !== 1 ? 's' : ''} (${((v / total) * 100).toFixed(1)}%)`
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
