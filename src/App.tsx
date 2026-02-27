import { useState } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import { GithubDashboard } from './components/GithubDashboard'
import { EmbedChart } from './components/EmbedChart'
import {
  ThemeProvider,
  useTheme,
  CARD_THEME_NAMES,
} from './theme'
import type { CardTheme } from './theme'

/** Full site shell with header + dashboard */
function DashboardPage() {
  const [params] = useSearchParams()
  const initialUsername = params.get('user') || 'Saurabhtbj1201'
  const [username, setUsername] = useState(initialUsername)

  const {
    siteTheme,
    toggleSiteTheme,
    cardTheme,
    setCardTheme,
  } = useTheme()

  const isDark = siteTheme === 'dark'

  /* ── site-level palette ── */
  const siteBg = isDark ? '#0f172a' : '#f1f5f9'
  const siteText = isDark ? '#f1f5f9' : '#0f172a'
  const headerBg = isDark ? '#1e293b' : '#ffffff'
  const inputBg = isDark ? '#0f172a' : '#f8fafc'
  const inputBorder = isDark ? '#334155' : '#cbd5e1'
  const mutedText = isDark ? '#94a3b8' : '#64748b'

  return (
    <div
      style={{
        minHeight: '100vh',
        background: siteBg,
        color: siteText,
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* ━━━━ Header ━━━━ */}
        <header
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 16,
            padding: '16px 20px',
            borderRadius: 14,
            background: headerBg,
            border: `1px solid ${inputBorder}`,
            boxShadow: isDark
              ? '0 4px 24px rgba(0,0,0,0.35)'
              : '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          {/* title */}
          <div style={{ flex: '1 1 200px' }}>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 700,
                background: 'linear-gradient(90deg, #38bdf8, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              GitHub Visualize
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: mutedText }}>
              Beautiful, shareable insights from any GitHub profile.
            </p>
          </div>

          {/* username input */}
          <form
            style={{ display: 'flex', gap: 8 }}
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              const val = (fd.get('username') as string)?.trim()
              if (val) setUsername(val)
            }}
          >
            <input
              name="username"
              defaultValue={initialUsername}
              placeholder="GitHub username"
              style={{
                width: 180,
                padding: '8px 12px',
                fontSize: 13,
                borderRadius: 8,
                border: `1px solid ${inputBorder}`,
                background: inputBg,
                color: siteText,
                outline: 'none',
              }}
            />

            {/* card theme selector */}
            <select
              value={cardTheme}
              onChange={(e) => setCardTheme(e.target.value as CardTheme)}
              style={{
                padding: '8px 12px',
                fontSize: 13,
                borderRadius: 8,
                border: `1px solid ${inputBorder}`,
                background: inputBg,
                color: siteText,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {CARD_THEME_NAMES.map((t) => (
                <option key={t} value={t}>
                  🎨 {t.replace('_', ' ')}
                </option>
              ))}
            </select>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 8,
                border: 'none',
                background: '#0ea5e9',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Visualize
            </button>
          </form>

          {/* site theme toggle */}
          <button
            type="button"
            onClick={toggleSiteTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: `1px solid ${inputBorder}`,
              background: inputBg,
              color: siteText,
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              fontSize: 18,
              transition: 'transform 0.3s',
            }}
          >
            {isDark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </header>

        {/* ━━━━ Dashboard content ━━━━ */}
        <GithubDashboard key={username} username={username || undefined} />
      </div>
    </div>
  )
}

/** Top-level router — embed route renders OUTSIDE the site shell */
function AppInner() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route
        path="/embed/:username/:chartType"
        element={<EmbedChart />}
      />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
