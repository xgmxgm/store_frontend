import styles from "./Loading.module.scss"

export const Loading = () => {
    return (
        <>
            <div className={styles.loader__div}>
                <span className={styles.loader}></span>
            </div>
        </>
    )
}