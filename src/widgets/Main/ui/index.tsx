'use client'

import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import styles from "./Main.module.scss"
import { FetchAllDatas } from "@/store/Slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { IData } from "@/interfaces";
import { RootState } from "@/store";
import { BuyButton } from "@/shared/ui/BuyButton";
import { setCart } from "@/store/Slices/cartSlice";
import { Liked } from "@/shared/ui/Liked";
import { Loading } from "@/widgets/Loading";

export const Main = () => {
    const dispatch: ThunkDispatch<IData, void, AnyAction> = useDispatch();

    const datas = useSelector((state: RootState) => state.data.data);

    const CartData = useSelector((state: RootState) => state.cart.products);

    const [initialCartData, setInitialCartData] = useState<IData[]>(CartData);

    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<null | boolean>(null);

    const addInCart = ({ id, title, description, category, rating, image, price, favorites }: IData) => {
        dispatch(setCart({id, title, description, category, rating, image, price, favorites}))
    }

    useEffect(() => {
        if (CartData.length > initialCartData.length) {
            setInitialCartData(CartData)
            setMessage("Добавлена в корзину")
            setTimeout(() => {
                setMessage('')
            }, 4000)
        }
        if (CartData.length < initialCartData.length) {
            setInitialCartData(CartData)
            setMessage("Удалено из корзины")
            setTimeout(() => {
                setMessage('')
            }, 4000)
        }
    }, [CartData])

    useEffect(() => {
        if (datas.length == 0) {
            setIsLoading(true);
            dispatch(FetchAllDatas()).finally(() => {
                setIsLoading(false);
            })
        }
    }, [])

    const pVariants = {
        hidden: {
            x: -2000,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        }
    }

    return (
        <>
            <motion.div initial={'hidden'} animate={'visible'} variants={pVariants} className={styles.Main}>
                <h2>Главная</h2>
                <h3 className={message && styles.Message}>{message}</h3>
                <div className={styles.Products}>
                { !isLoading ?
                    datas.map((data, index) =>
                    <div key={index} className={styles.Product}>
                        <p>id: {data.id}</p>
                        <p>title: {data.title}</p>
                        <p>category: {data.category}</p>
                        <img className={styles.img} src={data.image} />
                        <h4>price: {data.price}</h4>
                        <div className={styles.Buy}>
                            <BuyButton onClick={() => addInCart({id: data.id, title: data.title, description: data.description, category: data.category, rating: data.rating, image: data.image, price: data.price, favorites: data.favorites})}>В корзину</BuyButton>
                            <Liked id={data.id} title={data.title} category={data.category} description={data.description} image={data.image} price={data.price} rating={data.rating} favorites={data.favorites} />
                        </div>
                    </div>
                    )
                : <Loading />}
                </div>
            </motion.div>
        </>
    )
}