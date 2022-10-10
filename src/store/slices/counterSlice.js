import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.count += action.payload
    }
  }
})

export const { incrementByAmount } = productsSlice.actions
export default productsSlice.reducer
