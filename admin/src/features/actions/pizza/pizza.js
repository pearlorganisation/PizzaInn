import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const createPizza = createAsyncThunk(
  "createPizza",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/pizza`, payload, {
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

export const getPizza = createAsyncThunk("getPizza",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`/pizza`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);

  //updatePizza api
  export const updatePizza = createAsyncThunk(
    'updatePizza',
    async ({id,payload}, { rejectWithValue }) => {
      try {
        const response = await instance.patch(`/pizza/${id}`, payload, {
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

//deletePizza api
export const deletePizza = createAsyncThunk(
  'deletePizza',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/pizza/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
