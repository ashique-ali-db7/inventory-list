import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: { status: "null" },
  reducers: {
    update_status: (state, action) => {
      state.status = action.payload.status;
    },
  },
});

export const { update_status } = statusSlice.actions;

export default statusSlice.reducer; //creating reducer of color slice
