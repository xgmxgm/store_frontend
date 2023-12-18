'use client'

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import styles from "./GoogleButton.module.scss"

export const GoogleButton = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/profile';

    return (
        <button className={styles.Button} onClick={() => signIn('google', {callbackUrl})}>
                Войдите через Google
        </button>
    )
}