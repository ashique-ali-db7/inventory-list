import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./products/productsSlice";
import statusSlice from "./status/statusSlice";

export default configureStore({
  reducer: {
    status: statusSlice, 
    products: productSlice,
  }, 
});
