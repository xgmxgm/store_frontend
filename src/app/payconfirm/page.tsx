'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation";

import axios from "@/axios"
import styles from "./payconfirm.module.scss"

export default function PayConfirmPage () {
    const route = useRouter();

    const PayConfirm = async () => {
        try {
            const reqData = {
                paymentId: localStorage.getItem("paymentId"),
                value: localStorage.getItem("paymentValue")
            }
    
            const res = await axios.post("/payment/confirm", reqData);
            const data = res.data.pay
            localStorage.removeItem("paymentId")
            localStorage.removeItem("paymentValue")
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        PayConfirm()
        route.push('/');
    })

    return (
        <>
            <div className={styles.PayConfirm}>
                <h2>Редирект...</h2>
            </div>
        </>
        )
}