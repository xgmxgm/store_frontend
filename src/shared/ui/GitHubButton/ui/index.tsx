'use client'

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import styles from "./GitHubButton.module.scss"

export const GithubButton = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/profile';

    return (
        <button className={styles.Button} onClick={() => signIn('github', {callbackUrl})}>
            Войдите через GitHub
        </button>
    )
}