import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";

export const postBasePizza = createAsyncThunk(
  "postBasePizza",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/food/customization/base`, payload);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const postCheesePizza = createAsyncThunk(
  "postCheesePizza",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/food/customization/cheese`, payload);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const postMeatTopping = createAsyncThunk(
  "postMeatTopping",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/food/customization/meatToppings`, payload);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const postSaucePizza = createAsyncThunk(
  "postSaucePizza",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/food/customization/sauce`, payload);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const postSizePizza = createAsyncThunk("postSizePizza", 
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/food/customization/size`, payload);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const postVegTopping = createAsyncThunk(
  "postVegTopping",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/food/customization/vegetarianToppings`, payload);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
