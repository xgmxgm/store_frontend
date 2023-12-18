'use client'

import { DesktopHeader } from "../DesktopHeader"
import { MobileHeader } from "../MobileHeader"

export const Header = () => {
    const widthScreen = typeof window !== 'undefined' && window.innerWidth || 0;

    return (
        <>
        { widthScreen >= 740 ? <DesktopHeader /> : <MobileHeader /> }
        </>
    )
}