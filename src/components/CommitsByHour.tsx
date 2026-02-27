import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'
import { useTheme } from '../theme'

interface Props {
    hourlyCommits: number[]
    utcOffset?: number
}

export const CommitsByHour: React.FC<Props> = ({
    hourlyCommits,
    utcOffset = 8,
}) => {
    const { colors } = useTheme()

    const hasData = hourlyCommits.some((c) => c > 0)

    const chartData = hourlyCommits.map((count, hour) => ({
        hour: hour.toString(),
        count,
    }))

    // If no data, show sample data with a watermark
    const displayData = hasData
        ? chartData
        : hourlyCommits.map((_, hour) => ({
            hour: hour.toString(),
            count: Math.round(Math.sin((hour - 6) * 0.5) * 3 + 4),
        }))

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
                Commits (UTC +{utcOffset.toFixed(2)})
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

            <div style={{ width: '100%', height: 280, opacity: hasData ? 1 : 0.35 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={displayData} barCategoryGap="18%">
                        <CartesianGrid
                            stroke={colors.gridColor}
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="hour"
                            tick={{ fill: colors.text, fontSize: 13 }}
                            axisLine={{ stroke: colors.gridColor }}
                            tickLine={false}
                            interval={2}
                            label={{
                                value: 'per day hour',
                                position: 'insideBottomRight',
                                offset: -4,
                                fill: colors.subtext,
                                fontSize: 13,
                            }}
                        />
                        <YAxis
                            tick={{ fill: colors.text, fontSize: 13 }}
                            axisLine={false}
                            tickLine={false}
                            width={30}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: colors.tooltipBg,
                                border: `1px solid ${colors.tooltipBorder}`,
                                borderRadius: 6,
                                fontSize: 14,
                                color: colors.title,
                            }}
                            formatter={(value: number | undefined) => [`${value ?? 0} commits`, 'Commits']}
                            labelFormatter={(label) => `Hour ${label}:00`}
                        />
                        <Bar dataKey="count" fill={colors.barFill} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
