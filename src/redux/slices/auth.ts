import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  sex: string;
  fullName: string;
  email: string;
  photoProfile: string;
  coverImage: string;
  bio: string;
}

export interface AuthState {
  user: User;
}

// DATA AWALNYA KITA BIKIN KOSONG/ ATAU SECARA DEFAULT KOSONG
const initialState: AuthState = {
  user: {
    id: 0,
    fullName: "",
    email: "",
    sex: "",
    photoProfile: "",
    coverImage: "",
    bio: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_USER: (state, action: { payload: User }) => {
      state.user = action.payload;
    },
  },
});

export const { SET_USER } = authSlice.actions;

export default authSlice.reducer;