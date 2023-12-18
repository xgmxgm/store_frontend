'use client';

import { Provider } from "react-redux"
import { store } from "./index"

interface IProps {
    children: React.ReactNode
}

export function Providers({ children }: IProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}