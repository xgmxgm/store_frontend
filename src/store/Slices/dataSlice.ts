import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { IData } from "@/interfaces";
import { datas } from "@/data/datas"

export const FetchAllDatas = createAsyncThunk("data/fetch", async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products')
        const data = response.data;

        return data
    } catch (err) {
        console.log(err)
        return datas
    }
})

interface DataPayload {
    data: IData[];
}

const initialState = {
    data: [],
} as DataPayload

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData(state, action: PayloadAction<IData>) {
            state.data.push({
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                category: action.payload.category,
                image: action.payload.image,
                price: action.payload.price,
                rating: action.payload.rating,
                favorites: false,
            })
        },
        setFavorites(state, action) {
            const productId = action.payload.id;

            const product = state.data.find((product) => product.id === productId);
        
            if (product) {
                product.favorites = !product.favorites;
                state.data = [...state.data];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(FetchAllDatas.fulfilled, (state, action) => {
            return {
                ...state,
                data: action.payload
            }
        })
    }
});

export const { setData, setFavorites } = dataSlice.actions;
export default dataSlice.reducer;