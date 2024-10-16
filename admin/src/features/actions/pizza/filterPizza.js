import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const createFilter = createAsyncThunk(
  "createFilter",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/pizza/filter`, payload, {
        withCredentials: true,
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getFilter = createAsyncThunk("getFilter",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`/pizza/filter`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);

  //updateFilter api
  export const updateFilter = createAsyncThunk(
    'updateFilter',
    async ({id,payload}, { rejectWithValue }) => {
      try {
        const response = await instance.patch(`/pizza/filter/${id}`, payload, {
          withCredentials: true,
        
        });
        return response;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );

//deleteFilter api
export const deleteFilter = createAsyncThunk(
  'deleteFilter',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/pizza/filter/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
