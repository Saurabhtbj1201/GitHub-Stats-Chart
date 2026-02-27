/**
 * Card theme definitions for SVG generation.
 * Mirrors the client-side theme.tsx.
 */

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
    areaStroke: string
    barFill: string
    gridColor: string
}

export const CARD_THEMES: Record<CardTheme, CardThemeColors> = {
    default: {
        bg: '#ffffff',
        border: '#d1d5db',
        title: '#1f2937',
        text: '#374151',
        subtext: '#6b7280',
        chartColors: [
            '#cf3400', '#0fde00', '#ff6200', '#ff0099', '#00aad8',
            '#ff0000', '#854d0e', '#4c1d95',
        ],
        areaStroke: '#4a9e9c',
        barFill: '#4a9e9c',
        gridColor: '#e5e7eb',
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
        areaStroke: '#3fb950',
        barFill: '#238636',
        gridColor: '#21262d',
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
        areaStroke: '#3b82f6',
        barFill: '#3b82f6',
        gridColor: '#0d1f4b',
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
        areaStroke: '#a277ff',
        barFill: '#a277ff',
        gridColor: '#2d2b38',
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
        areaStroke: '#82e2ff',
        barFill: '#82e2ff',
        gridColor: '#262430',
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
        areaStroke: '#50fa7b',
        barFill: '#50fa7b',
        gridColor: '#44475a',
    },
}

export const VALID_THEMES = Object.keys(CARD_THEMES) as CardTheme[]

export function getTheme(name?: string | null): CardThemeColors {
    if (name && VALID_THEMES.includes(name as CardTheme)) {
        return CARD_THEMES[name as CardTheme]
    }
    return CARD_THEMES.default
}
