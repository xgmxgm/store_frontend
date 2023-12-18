'use client'

import { useDispatch, useSelector } from "react-redux"
import styles from "./WishList.module.scss"
import { RootState } from "@/store"
import { BuyButton } from "@/shared/ui/BuyButton"
import { Liked } from "@/shared/ui/Liked"
import { setCart } from "@/store/Slices/cartSlice"
import { IData } from "@/interfaces"
import { motion } from "framer-motion"

export const WishList = () => {
    const datas = useSelector((state: RootState) => state.data.data)

    const dispatch = useDispatch();

    const addInCart = ({ id, title, description, category, rating, image, price, favorites }: IData) => {
        dispatch(setCart({id, title, description, category, rating, image, price, favorites}))
    }

    const favoriteItem = datas.filter((data) => data.favorites === true);

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
        <motion.div initial={'hidden'} animate={'visible'} variants={pVariants} className={styles.WishList}>
            <h2>Избранное</h2>
            <div className={styles.Products}>
                { favoriteItem.length > 0 ?
                    favoriteItem.map((data, index) =>
                    <div key={index} className={styles.Product}>
                        <p>id: {data.id}</p>
                        <p>title: {data.title}</p>
                        <p>category: {data.category}</p>
                        <img src={data.image} className={styles.img} />
                        <h4>price: {data.price}</h4>
                        <div className={styles.Buy}>
                            <BuyButton onClick={() => addInCart({id: data.id, title: data.title, description: data.description, category: data.category, rating: data.rating, image: data.image, price: data.price, favorites: data.favorites})}>В корзину</BuyButton>
                            <Liked id={data.id} title={data.title} category={data.category} description={data.description} image={data.image} price={data.price} rating={data.rating} favorites={data.favorites} />
                        </div>
                    </div>
                    )
                : 
                <div className={styles.NoneProduct}>
                    <p>Нет избранных товаров</p>
                </div>}
            </div>
        </motion.div>
    )
}