import { forwardRef, ReactNode } from 'react'

import styles from "./BuyButton.module.scss"

interface IProps {
    children: ReactNode,
    onClick?: () => void,
}

export const BuyButton = forwardRef<HTMLButtonElement, IProps>(( props, ref ) => {
    const { children, onClick } = props;

    return (
        <button ref={ref} onClick={onClick} className={styles.Button}>
            {children}
        </button>
    )
})