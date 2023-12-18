'use client'

import { Input } from "@/shared/ui/Input"
import styles from "./Authorize.module.scss"
import { useState } from "react"
import { Button } from "@/shared/ui/Button"

export const Authorize = () => {
    const [inputLogin, setInputLogin] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    return (
        <div className={styles.Authorize}>
            <div className={styles.Glass_body}>
                <h2>Авторизация</h2>
                <div className={styles.Form_body}>
                    <form className={styles.Form}>
                        <Input inputValue={inputLogin} setInputValue={setInputLogin} placeholder="Логин" />
                        <Input inputValue={inputPassword} setInputValue={setInputPassword} placeholder="Пароль" />
                        <Button>Войти</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}