import { forwardRef, ReactNode } from 'react'

import styles from "./Button.module.scss"

interface IProps {
    children: ReactNode,
    onClick?: () => void,
    disabled?: boolean,
}

export const Button = forwardRef<HTMLButtonElement, IProps>(( props, ref ) => {
    const { children, onClick, disabled } = props;

    return (
        <button disabled={disabled} ref={ref} onClick={onClick} className={styles.Button}>
            {children}
        </button>
    )
})