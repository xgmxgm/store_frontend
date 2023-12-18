import styles from "./Input.module.scss";

interface IProps {
    inputValue: string,
    setInputValue: (InputValue: string) => void,
    placeholder?: string,
}

export const Input = ({ inputValue, setInputValue, placeholder }: IProps) => {
    return (
        <div className={styles.Input__main}>
            <input
                className={styles.Input}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}