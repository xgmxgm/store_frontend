'use client'

import { Button } from "@/shared/ui/Button"
import styles from "./Header.module.scss"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { motion } from 'framer-motion'

export const DesktopHeader = () => {
    const session = useSession();

    const pVariants = {
        hidden: {
            y: -1000,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <motion.div initial={'hidden'} animate={'visible'} variants={pVariants} className={styles.Header}>
            <div className={styles.Logo}>
                <h2 className={styles.h2}>Store</h2>
            </div>
            <div className={styles.Nav}>
                <nav className={styles.nav}>
                    <Link className={styles.a} href="/">Главная</Link>
                    <Link className={styles.a} href="/wishlist">Избранное</Link>
                    <Link className={styles.a} href="/cart">Корзина</Link>
                    {session?.data && <Link className={styles.a} href="/profile">Профиль</Link>}
                </nav>
            </div>
            <div className={styles.LogIn}>
                { session?.data ?
                    <Link className={styles.a} href="#" onClick={() => signOut({callbackUrl: "/"})}><Button>Выйти</Button></Link> : 
                    <>
                        <Link className={styles.a} href='/registration'><Button>Зарегистрироваться</Button></Link>
                        <Link className={styles.a} href='/signin'><Button>Войти</Button></Link>
                    </>
                }
            </div>
        </motion.div>
    )
}