'use client'

import { Button } from "@/shared/ui/Button"
import styles from "./MobileHeader.module.scss"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { motion } from 'framer-motion'

export const MobileHeader = () => {
    const session = useSession();

    const [Burger, setBurger] = useState<boolean>(false);

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
            <div className={styles.Burger} onClick={() => setBurger(!Burger)}>
                <div className={styles.Line}></div>
                <div className={styles.Line}></div>
                <div className={styles.Line}></div>
            </div>
            { Burger &&
                <div className={styles.BurgerMain} onClick={() => setBurger(!Burger)}>
                    <div className={styles.BurgerContent}>
                        <div className={styles.Nav}>
                            <nav className={styles.nav}>
                                <Link className={styles.a} href="/">Главная</Link>
                                <Link className={styles.a} href="/wishlist">Избранное</Link>
                                <Link className={styles.a} href="/cart">Корзина</Link>
                                {session?.data && <Link className={styles.a} href="/profile">Профиль</Link>}
                            </nav>
                        </div>
                        <div className={styles.LogIn}>
                            <h3 className={styles.h3}>{!session.data ? "Авторизация:" : "Выход:"}</h3>
                            { session?.data ?
                                <Link className={styles.a} href="#" onClick={() => signOut({callbackUrl: "/"})}><Button>Выйти</Button></Link> : 
                                <>
                                    <Link className={styles.a} href='/signin'><Button>Войти</Button></Link>
                                    <Link className={styles.a} href='/registration'><Button>Зарегистрироваться</Button></Link>
                                </>
                            }
                        </div>
                        <div className={styles.Email}>
                            <p>{session.data?.user?.name}</p>
                            <h3 className={styles.h3}>ekalkabekov@gmail.com</h3>
                        </div>
                    </div>
                </div>
            }
        </motion.div>
    )
}