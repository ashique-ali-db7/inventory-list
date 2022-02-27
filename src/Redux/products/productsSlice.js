import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {},
  reducers: {
    update_products: (state, action) => {
        console.log("jkk");
        console.log(action.payload.products);
      state.products = action.payload.products;
    },
  },
});

export const {update_products } = productSlice.actions;

export default productSlice.reducer; //creating reducer of color slice
