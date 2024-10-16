import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";

export const updateBasePizza = createAsyncThunk(
  "updateBasePizza",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`food/customization/base/${data._id}`, data);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateCheesePizza = createAsyncThunk(
  "updateCheesePizza",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`food/customization/cheese/${data._id}`, data);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateMeatTopping = createAsyncThunk(
  "updateMeatTopping",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data)
      const response = await instance.patch(`food/customization/meatToppings/${data._id}`, data);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateSaucePizza = createAsyncThunk(
  "updateSaucePizza",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`food/customization/sauce/${data._id}`, data);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateSizePizza = createAsyncThunk(
  "updateSizePizza",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`food/customization/size/${data._id}`, data);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateVegTopping = createAsyncThunk(
  "updateVegTopping",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`food/customization/vegetarianToppings/${data._id}`, data);
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
