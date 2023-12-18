'use client';

import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slices/dataSlice"
import cartReducer from "./Slices/cartSlice"

export const store = configureStore({
    reducer: {
        data: dataReducer,
        cart: cartReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>