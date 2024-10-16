import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const createFilter = createAsyncThunk(
  "createFilter",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/sides/filter`, payload, {
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
    const {data} = await instance.get(`/sides/filter`, {
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
        const response = await instance.patch(`/sides/filter/${id}`, payload, {
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
        `/sides/filter/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

