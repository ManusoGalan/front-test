import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/counterSlice'

const store = configureStore({
    reducer: {
        products: productsReducer
    }
})

export default store