import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, IData } from "@/interfaces"

const initialState: ICart = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<IData>) {
            state.products.push({
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                category: action.payload.category,
                image: action.payload.image,
                price: action.payload.price,
                rating: action.payload.rating,
                favorites: action.payload.favorites
            })
        },
        deleteProduct(state, action) {
            // state.products = state.products.filter((product) => product.id !== action.payload.id)
            const indexToRemove = state.products.findIndex(product => product.id === action.payload.id)
            state.products.splice(indexToRemove, 1)
        },
    }
})

export const { setCart, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;