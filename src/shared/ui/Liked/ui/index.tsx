import Image from "next/image"
import styles from "./Liked.module.scss"

import heart from "../../../../../public/heart-svgrepo-com.svg"
import heart_active from "../../../../../public/heart-svgrepo-active.svg"
import { useDispatch } from "react-redux"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { IData } from "@/interfaces"
import { setFavorites } from "@/store/Slices/dataSlice"

export const Liked = ({ id, favorites }: IData) => {
    const dispatch: ThunkDispatch<IData, void, AnyAction> = useDispatch()

    return (
        <div className={styles.Liked}>
            <Image onClick={() => dispatch(setFavorites({id}))} src={!favorites ? heart : heart_active} width={30} height={30} alt="heart" />
        </div>
    )
}