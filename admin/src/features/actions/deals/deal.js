import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const getDeal = createAsyncThunk(
  "getDeal",
  async (payload, { rejectWithValue }) => {
    console.log("pay",payload)
    try {
      const response = await instance.get(`/deals`, {
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createDeal = createAsyncThunk(
  "createDeal",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await instance.post(`/deals`, payload, {
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateDeal = createAsyncThunk(
  "updateDeal",
  async ({id,formData}, { rejectWithValue }) => {
    try {
      console.log('sdfsdf',id);

      const response = await instance.patch(`/deals/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const deleteDeal = createAsyncThunk(
  "deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`/deals/${id}`, {
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);