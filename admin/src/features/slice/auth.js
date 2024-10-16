import { createSlice } from "@reduxjs/toolkit";

import { getAllUsers, logIn, logout } from "../actions/auth";
import { toast } from "sonner";

// -------------------------------------------------------------------------------------------

// initialState -- initial state of authentication
const initialState = {
  isLoading: false,
  errorMessage: "",
  isUserLoggedIn: false,
  userData:[],
};

// -------------------------------------- Slices------------------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearReduxStore:()=>initialState
  },
  extraReducers: (builder) => {
    builder

      // Login cases
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = "";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.isUserLoggedIn = true;
        state.isLogInSuccess = true;
        state.userData= action.payload.data
        toast.success("Login Successfully", {
          position: "top-center",
        });
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
  // Logout lifecycle methods
  .addCase(logout.pending, (state, action) => {
    state.isLoading = true;
    state.errorMessage = "";
  })
  .addCase(logout.fulfilled, (state, action) => {
    state.isLoading = false;
    state.errorMessage = "";

    state.isUserLoggedIn = false;
    localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem("persist:root");
    toast.success("Logout Successfully", {
      position: "top-center",
    });
  })
  .addCase(logout.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.errorMessage = action.payload;
    toast.error(state?.errorMessage, {
      position: "top-right",
    });
  })
  .addCase(getAllUsers.pending, (state, action) => {
    state.isLoading = true;
    state.errorMessage = "";
  })
  .addCase(getAllUsers.fulfilled, (state, action) => {
    state.isLoading = false;
    state.errorMessage = "";
    state.userData =action.payload
  })
  .addCase(getAllUsers.rejected, (state, action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.errorMessage = action.payload;
    toast.error(state?.errorMessage, {
      position: "top-right",
    });
  })
 
  },
});

// ===========================================Exports==================================================
export default authSlice.reducer;
export const {

  clearReduxStore,

} = authSlice.actions;
