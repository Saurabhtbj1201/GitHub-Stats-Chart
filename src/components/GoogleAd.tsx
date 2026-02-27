import React, { useEffect, useRef } from 'react'

declare global {
    interface Window {
        adsbygoogle: unknown[]
    }
}

interface Props {
    /** AdSense ad slot ID, e.g. "1234567890" */
    adSlot: string
    /** Ad format: auto | rectangle | horizontal | vertical */
    adFormat?: string
    /** Whether to use full-width responsive mode */
    fullWidthResponsive?: boolean
    /** Extra inline style for the wrapper */
    style?: React.CSSProperties
}

/**
 * Google AdSense display ad component.
 *
 * Usage:
 *   <GoogleAd adSlot="YOUR_AD_SLOT_ID" />
 *
 * ⚠ Make sure the AdSense script is loaded in index.html with your publisher ID.
 */
export const GoogleAd: React.FC<Props> = ({
    adSlot,
    adFormat = 'auto',
    fullWidthResponsive = true,
    style,
}) => {
    const adRef = useRef<HTMLModElement>(null)
    const pushed = useRef(false)

    useEffect(() => {
        if (pushed.current) return
        try {
            ; (window.adsbygoogle = window.adsbygoogle || []).push({})
            pushed.current = true
        } catch {
            // AdSense may fail in dev or ad-blocked environments — that's fine
        }
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                overflow: 'hidden',
                ...style,
            }}
        >
            <ins
                className="adsbygoogle"
                ref={adRef}
                style={{ display: 'block', width: '100%' }}
                data-ad-client="ca-pub-9261420035824805"    /* ← Replace with your publisher ID */
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
            />
        </div>
    )
}
