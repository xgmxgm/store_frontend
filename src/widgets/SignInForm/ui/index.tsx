'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, type FormEventHandler } from "react";

import styles from "./SignInForm.module.scss"
import Link from "next/link";

export const SignInForm = () => {
    const router = useRouter();

    const [message, setMessage] = useState<string>('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)

        const res = await signIn('credentials', {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        })


        if (res && !res.error) {
            router.push('/profile')
        } else {
            setMessage(res?.error!)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.SignInForm}>
            <input placeholder="Email..." className={styles.Input} type="email" name='email' required />
            <input placeholder="Пароль..." className={styles.Input} type="password" name='password' required />
            <button className={styles.Button} type='submit'>Войти</button>
            <Link className={styles.a} href='/registration'>Нет аккаунта</Link>
            <p>{message}</p>
        </form>
    )
}