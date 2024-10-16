import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const createCategory = createAsyncThunk(
  "createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/pizza/category`, payload, {
        withCredentials: true,
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getCategory = createAsyncThunk("getCategory",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`/pizza/category`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);

  //updateCategory api
  export const updateCategory = createAsyncThunk(
    'updateCategory',
    async ({id,payload}, { rejectWithValue }) => {
      try {
        const response = await instance.patch(`/pizza/category/${id}`, payload, {
          withCredentials: true,
        
        });
        return response;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );

//deleteCategory api
export const deleteCategory = createAsyncThunk(
  'deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/pizza/category/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
