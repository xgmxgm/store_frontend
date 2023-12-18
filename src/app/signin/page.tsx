import { GoogleButton } from "@/shared/ui/GoogleButton/ui"
import styles from "./Signin.module.scss"
import { SignInForm } from "@/widgets/SignInForm"
import { GithubButton } from "@/shared/ui/GitHubButton"

export default async function Signin() {
    return (
        <>
            <div className={styles.SignIn}>
                <h1>Войти</h1>
                <div className={styles.ServiceLogin}>
                    <GoogleButton />
                    <GithubButton />
                </div>
                <p>или</p>
                <SignInForm />
            </div>
        </>
    )
}