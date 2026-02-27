import React, { useState, useCallback } from 'react'
import { useTheme } from '../theme'

interface Props {
    /** embed route segment like "profile-header" */
    chartType: string
    /** GitHub username */
    username: string
    /** chart title for display */
    title: string
    children: React.ReactNode
}

const IconCheck = ({ color }: { color: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

const IconLink = ({ color }: { color: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
)

const IconImage = ({ color }: { color: string }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
)

export const CardWrapper: React.FC<Props> = ({
    chartType,
    username,
    title,
    children,
}) => {
    const { colors, cardTheme } = useTheme()
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const baseUrl = typeof window !== 'undefined'
        ? `${window.location.origin}`
        : ''

    const embedUrl = `${baseUrl}/embed/${username}/${chartType}?theme=${cardTheme}`
    const markdownImg = `![${title}](${embedUrl})`

    const copyToClipboard = useCallback(
        (text: string, fieldName: string) => {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedField(fieldName)
                setTimeout(() => setCopiedField(null), 2000)
            })
        },
        [],
    )

    const buttonStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        fontSize: 12,
        fontWeight: 500,
        borderRadius: 6,
        border: `1px solid ${colors.border}`,
        background: colors.bg,
        color: colors.text,
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
    }

    const copiedStyle: React.CSSProperties = {
        ...buttonStyle,
        borderColor: '#22c55e',
        color: '#22c55e',
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ borderRadius: '10px 10px 0 0', overflow: 'hidden' }}>
                {children}
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 12px',
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    borderTop: 'none',
                    borderRadius: '0 0 10px 10px',
                    flexWrap: 'wrap',
                }}
            >
                {/* embed link display */}
                <div
                    style={{
                        flex: 1,
                        fontSize: 11,
                        color: colors.subtext,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: 'monospace',
                        minWidth: 100,
                    }}
                    title={embedUrl}
                >
                    {embedUrl}
                </div>

                {/* copy link */}
                <button
                    style={copiedField === 'link' ? copiedStyle : buttonStyle}
                    onClick={() => copyToClipboard(embedUrl, 'link')}
                    title="Copy embed link"
                    onMouseEnter={(e) => {
                        if (copiedField !== 'link') {
                            e.currentTarget.style.borderColor = colors.areaStroke
                            e.currentTarget.style.color = colors.title
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (copiedField !== 'link') {
                            e.currentTarget.style.borderColor = colors.border
                            e.currentTarget.style.color = colors.text
                        }
                    }}
                >
                    {copiedField === 'link' ? (
                        <><IconCheck color="#22c55e" /> Copied!</>
                    ) : (
                        <><IconLink color={colors.text} /> Copy Link</>
                    )}
                </button>

                {/* copy markdown */}
                <button
                    style={copiedField === 'md' ? copiedStyle : buttonStyle}
                    onClick={() => copyToClipboard(markdownImg, 'md')}
                    title="Copy markdown image tag"
                    onMouseEnter={(e) => {
                        if (copiedField !== 'md') {
                            e.currentTarget.style.borderColor = colors.areaStroke
                            e.currentTarget.style.color = colors.title
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (copiedField !== 'md') {
                            e.currentTarget.style.borderColor = colors.border
                            e.currentTarget.style.color = colors.text
                        }
                    }}
                >
                    {copiedField === 'md' ? (
                        <><IconCheck color="#22c55e" /> Copied!</>
                    ) : (
                        <><IconImage color={colors.text} /> Copy Markdown</>
                    )}
                </button>
            </div>
        </div>
    )
}
