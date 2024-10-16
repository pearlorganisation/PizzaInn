import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

//Login Api

export const logIn = createAsyncThunk(
    "user/login",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await instance.post("auth/login", payload, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        return response;
      } catch (error) {

        return rejectWithValue(error);
      }
    }
  );

  // logout -- logout action to call the logout api
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/logout", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const {data} = await instance.get("/auth/", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);