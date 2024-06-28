import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSuccess, signoutSuccess } = UserSlice.actions;

export default UserSlice.reducer;
