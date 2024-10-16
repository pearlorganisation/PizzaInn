import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const cretaeCategory = createAsyncThunk(
  "cretaeCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/sides/category`, payload, {
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
    const {data} = await instance.get(`/sides/category`, {
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
        const response = await instance.patch(`/sides/category/${id}`, payload, {
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
        `/sides/category/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
