import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const createDessert = createAsyncThunk(
  "createDessert",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/dessert`, payload, {
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

export const getDessert = createAsyncThunk("getDessert",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`/dessert`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);

  //updateDessert api
  export const updateDessert = createAsyncThunk(
    'updateDessert',
    async ({id,payload}, { rejectWithValue }) => {
      try {
        const response = await instance.patch(`/dessert/${id}`, payload, {
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

//deleteDessert api
export const deleteDessert = createAsyncThunk(
  'deleteDessert',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/dessert/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
