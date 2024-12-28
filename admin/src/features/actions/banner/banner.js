// src/features/actions/banner/banner.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";

// Fetch All Banners
export const getBanner = createAsyncThunk(
  "banner/getBanner",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/banner");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch banners.");
    }
  }
);

// Delete a Banner
export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      await instance.delete(`/banner/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to delete banner.");
    }
  }
);

// Create a Banner
export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to create banner.");
    }
  }
);

// Update a Banner
export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async ({ id, formData }, { rejectWithValue }) => {
    console.log(formData)
    try {
      const response = await instance.patch(`/banner/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to update banner.");
    }
  }
);
