'use client'

import styles from "./Registration.module.scss"
import { FormEventHandler, useEffect, useState } from "react"
import { GoogleButton } from "@/shared/ui/GoogleButton"
import Link from "next/link"

import axios from "@/axios"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ShowButton } from "@/shared/ui/ShowButton"
import { GithubButton } from "@/shared/ui/GitHubButton"

interface IImg {
    imgName: string,
    imgPath: string
}

export const Registration = () => {
    const router = useRouter();

    const [message, setMessage] = useState<string>('');
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showPassR, setShowPassR] = useState<boolean>(false)

    const [img, setImg] = useState()
    const [uploadImg, setUploadImg] = useState<IImg | undefined>()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)

        const reqData = {
            name: formData.get("name"),
            email: formData.get("email"),
            image: uploadImg?.imgPath,
            password: formData.get("password"),
            passwordRepeat: formData.get("passwordRepeat")
        }

        const res = await axios.post("/register", reqData);

        const responce = await signIn('credentials', {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        })

        if (res.data.message) {
            setMessage(res.data.message);
        }

        if (responce && !responce.error) {
            router.push('/profile')
        } else {
            console.log(res)
        }
    }

    const handleImageChange = (e: any) => {
        setImg(e.target.files[0]);
    };

    const sendImg = async () => {
        if (img) {
            const formData = new FormData()
            formData.append("image", img);
            
            const res = await axios.post("/upload", formData)
            const data = res.data;
    
            setUploadImg(data)
        }
    }

    useEffect(() => {
        if (img) {
            sendImg()
        }
    }, [img])

    return (
        <div className={styles.Registration}>
            <div className={styles.Glass_body}>
                <h2>Регистрация</h2>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <GoogleButton />
                    <GithubButton />
                </div>
                <p>или</p>
                <form onSubmit={handleSubmit} className={styles.SignInForm}>
                    <input placeholder="Имя..." className={styles.Input} type="text" name='name' required />
                    <input placeholder="Email..." className={styles.Input} type="email" name='email' required />
                    <div className={styles.Show}>
                        <input placeholder="Пароль..." className={styles.Input} type={ !showPass ? "password" : "text"} name='password' required />
                        <ShowButton showPass={showPass} setShowPass={setShowPass} />
                    </div>
                    <div className={styles.Show}>
                        <input placeholder="Повторите пароль..." className={styles.Input} type={ !showPassR ? "password" : "text"} name='passwordRepeat' required />
                        <ShowButton showPass={showPassR} setShowPass={setShowPassR} />
                    </div>
                    <div className={styles.input__wrapper}>
                        <input type="file" id="input__file" name="imgss" className={`${styles.input} ${styles.input__file}`} accept="image/*,.png,.jpg,.gif,.web" onChange={handleImageChange} />
                        <label htmlFor="input__file" className={styles.input__file_button}>
                            <span className={styles.input__file_icon_wrapper}><img className={styles.input__file_icon} src="/add.svg" alt="" width="25"/></span>
                            <span className={styles.input__file_button_text}>Выберите файл</span>
                        </label>
                    </div>
                    <button className={styles.Button} type='submit'>Войти</button>
                    <Link className={styles.a} href="/signin">Уже есть аккаун</Link>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    )
}