'use client'

import { useDispatch, useSelector } from "react-redux"
import styles from "./Cart.module.scss"
import { RootState } from "@/store"
import { BuyButton } from "@/shared/ui/BuyButton"
import { deleteProduct } from "@/store/Slices/cartSlice"
import axios from "@/axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { IPayment } from "@/interfaces"
import { Modal } from "@/shared/ui/Modal"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"

export const Cart = () => {
    const dataCart = useSelector((state: RootState) => state.cart.products)

    const session = useSession();

    const route = useRouter();

    const [payment, setPayment] = useState<IPayment>({
        id: "",
        status: "",
        amount: {
            value: "",
            currency: ""
        },
        recipient: {
            account_id: "",
            gateway_id: ""
        },
        payment_method: {
            type: "",
            id: "",
            saved: false,
        },
        "created_at": "",
        confirmation: {
            type: "",
            return_url: "",
            confirmation_url: ""
        },
        test: true,
        paid: false,
        refundable: false,
        metadata: {
            email: ""
        }
    })

    const [modal, setModal] = useState<boolean>(false);
    const [priceVal, setPriceVal] = useState<number>(0)
    const [productAmount, setProductAmount] = useState<number>(0)

    const dispatch = useDispatch();

    const deleteOneProduct = (id: number) => {
        dispatch(deleteProduct({id}))
    }

    const GetPaymentURL = async () => {
        let value = 0

        const priceArr = dataCart.map((product) => product.price);

        for (let i = 0; i < priceArr.length; i++) {
            value += priceArr[i]
        }

        setPriceVal(value);

        const postData = {
            value,
            email: session?.data?.user?.email || ''
        }

        const res = await axios.post("/payment/create", postData)
        const data: IPayment = res.data.payment;
        setPayment(data)
        localStorage.setItem("paymentId", data.id)
        localStorage.setItem("paymentValue", data.amount.value)
    }

    useEffect(() => {
        let value = 0
        let amount = 0

        const priceArr = dataCart.map((product) => product.price);

        for (let i = 0; i < priceArr.length; i++) {
            value += priceArr[i]
            amount += 1
        }

        setPriceVal(value);
        setProductAmount(amount);
    })

    useEffect(() => {
        localStorage.setItem("paymentId", JSON.stringify(payment.id))
        localStorage.setItem("paymentValue", JSON.stringify(payment.amount.value))
        localStorage.setItem("test", "test_value")
        if (payment.confirmation.confirmation_url) {
            route.push(payment.confirmation.confirmation_url)
        }
    }, [payment])

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
        <motion.div initial={'hidden'} animate={'visible'} variants={pVariants} className={styles.Cart}>
            <h2>Корзина</h2>
            <Modal active={modal} setActive={setModal}>
                <h2>Вы уверены ?</h2>
                <div>
                    <h4>Сумма: {Math.round(priceVal)}</h4>
                    <h4>Кол-во продуктов: {productAmount}</h4>
                </div>
                <BuyButton onClick={() => GetPaymentURL()}>Купить</BuyButton>
            </Modal>
            {dataCart.length > 0 && <BuyButton onClick={() => setModal(!modal)}>Купить</BuyButton>}
            <div className={styles.Products}>
                { dataCart.length > 0 ?
                    dataCart.map((data, index) =>
                    <div key={index} className={styles.Product}>
                        <p>id: {data.id}</p>
                        <p>title: {data.title}</p>
                        <p>category: {data.category}</p>
                        <img src={data.image} className={styles.img} />
                        <h4>price: {data.price}</h4>
                        <BuyButton onClick={() => deleteOneProduct(data.id)}>Удалить</BuyButton>
                    </div>
                    )
                : "Корзина пуста"}
            </div>
        </motion.div>
    )
}