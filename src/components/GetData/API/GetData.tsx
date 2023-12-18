import axios from "axios";

export const Getdata = async () => {
    try {
        const res = await axios.get("https://fakestoreapi.com/products/1")
        const data = res.data;
    } catch (err) {
        console.log(err)
    }
}