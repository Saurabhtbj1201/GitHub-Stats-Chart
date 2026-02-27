import React, { createContext, useContext, useState, useCallback } from 'react'

/* ───────── site theme (light / dark) ───────── */
export type SiteTheme = 'light' | 'dark'

/* ───────── card themes ───────── */
export type CardTheme =
    | 'default'
    | 'dark'
    | 'algolia'
    | 'aura'
    | 'aura_dark'
    | 'dracula'

export interface CardThemeColors {
    bg: string
    border: string
    title: string
    text: string
    subtext: string
    chartColors: string[]
    areaFill: string
    areaStroke: string
    barFill: string
    gridColor: string
    tooltipBg: string
    tooltipBorder: string
}

export const CARD_THEMES: Record<CardTheme, CardThemeColors> = {
    default: {
        bg: '#ffffff',
        border: '#d1d5db',
        title: '#1f2937',
        text: '#374151',
        subtext: '#6b7280',
        chartColors: [
            '#cf3400ff', '#0fde00ff', '#ff6200ff', '#ff0099ff', '#00aad8ff',
            '#ff0000ff', '#854d0e', '#4c1d95',
        ],
        areaFill: 'rgba(75, 160, 158, 0.6)',
        areaStroke: '#4a9e9c',
        barFill: '#4a9e9c',
        gridColor: '#e5e7eb',
        tooltipBg: '#ffffff',
        tooltipBorder: '#d1d5db',
    },
    dark: {
        bg: '#0d1117',
        border: '#30363d',
        title: '#c9d1d9',
        text: '#8b949e',
        subtext: '#484f58',
        chartColors: [
            '#f78166', '#79c0ff', '#d2a8ff', '#7ee787', '#ffa657',
            '#ff7b72', '#ffd700', '#ff6b9d',
        ],
        areaFill: 'rgba(35,134,54,0.35)',
        areaStroke: '#3fb950',
        barFill: '#238636',
        gridColor: '#21262d',
        tooltipBg: '#161b22',
        tooltipBorder: '#30363d',
    },
    algolia: {
        bg: '#050f2c',
        border: '#122d57',
        title: '#ffffff',
        text: '#9ca3af',
        subtext: '#6b7280',
        chartColors: [
            '#f97316', '#3b82f6', '#a855f7', '#22c55e', '#eab308',
            '#ec4899', '#06b6d4', '#f43f5e',
        ],
        areaFill: 'rgba(37,99,235,0.35)',
        areaStroke: '#3b82f6',
        barFill: '#3b82f6',
        gridColor: '#0d1f4b',
        tooltipBg: '#0a1836',
        tooltipBorder: '#0d1f4b',
    },
    aura: {
        bg: '#15141b',
        border: '#2d2b38',
        title: '#bdbdbd',
        text: '#6d6d6d',
        subtext: '#4d4d4d',
        chartColors: [
            '#a277ff', '#61ffca', '#ffca85', '#ff6767', '#82e2ff',
            '#f694ff', '#7ee787', '#ffd700',
        ],
        areaFill: 'rgba(162,119,255,0.35)',
        areaStroke: '#a277ff',
        barFill: '#a277ff',
        gridColor: '#2d2b38',
        tooltipBg: '#1c1b24',
        tooltipBorder: '#2d2b38',
    },
    aura_dark: {
        bg: '#110f18',
        border: '#262430',
        title: '#e0def2',
        text: '#8a86a0',
        subtext: '#5c5875',
        chartColors: [
            '#82e2ff', '#a277ff', '#61ffca', '#ff6767', '#ffca85',
            '#f694ff', '#7ee787', '#ffd700',
        ],
        areaFill: 'rgba(130,226,255,0.35)',
        areaStroke: '#82e2ff',
        barFill: '#82e2ff',
        gridColor: '#262430',
        tooltipBg: '#16141e',
        tooltipBorder: '#262430',
    },
    dracula: {
        bg: '#282a36',
        border: '#44475a',
        title: '#f8f8f2',
        text: '#f8f8f2',
        subtext: '#bd93f9',
        chartColors: [
            '#ff79c6', '#bd93f9', '#50fa7b', '#ffb86c', '#8be9fd',
            '#f1fa8c', '#ff5555', '#6272a4',
        ],
        areaFill: 'rgba(80,250,123,0.35)',
        areaStroke: '#50fa7b',
        barFill: '#50fa7b',
        gridColor: '#44475a',
        tooltipBg: '#21222c',
        tooltipBorder: '#44475a',
    },
}

export const CARD_THEME_NAMES: CardTheme[] = [
    'default',
    'dark',
    'algolia',
    'aura',
    'aura_dark',
    'dracula',
]

/* ───────── context ───────── */
interface ThemeContextType {
    siteTheme: SiteTheme
    toggleSiteTheme: () => void
    cardTheme: CardTheme
    setCardTheme: (t: CardTheme) => void
    colors: CardThemeColors
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = (): ThemeContextType => {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
    return ctx
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [siteTheme, setSiteTheme] = useState<SiteTheme>('dark')
    const [cardTheme, setCardTheme] = useState<CardTheme>('default')

    const toggleSiteTheme = useCallback(
        () => setSiteTheme((p) => (p === 'dark' ? 'light' : 'dark')),
        [],
    )

    const colors = CARD_THEMES[cardTheme]

    return (
        <ThemeContext.Provider
            value={{ siteTheme, toggleSiteTheme, cardTheme, setCardTheme, colors }}
        >
            {children}
        </ThemeContext.Provider>
    )
}
