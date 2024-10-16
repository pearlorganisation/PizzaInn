import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const createCategory = createAsyncThunk(
  "createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/dessert/category`, payload, {
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
    const {data} = await instance.get(`/dessert/category`, {
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
        const response = await instance.patch(`/dessert/category/${id}`, payload, {
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
        `/dessert/category/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
