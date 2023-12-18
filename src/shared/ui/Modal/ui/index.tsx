import './Modal.scss';

interface Iprops {
    active: boolean,
    setActive: (active: boolean) => void,
    children: React.ReactNode
}

export const Modal = (props: Iprops) => {
    const { active, setActive, children } = props;

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}