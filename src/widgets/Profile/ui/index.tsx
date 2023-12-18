import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next"

import styles from "./Profile.module.scss"

export const Profile = async () => {
    const session = await getServerSession(authConfig);

    return (
        <>
            <div className={styles.Profile}>
                <h2>Профиль {session?.user?.name}</h2>
                <h2>Почта: {session?.user?.email}</h2>
                { session?.user?.image && <img className={styles.img} src={session.user.image} alt="profile image" /> }
            </div>
        </>
    )
}