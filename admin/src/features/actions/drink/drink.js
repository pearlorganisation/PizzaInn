import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const createDrink = createAsyncThunk(
  "createDrink",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/drinks`, payload, {
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

export const getDrink = createAsyncThunk("getDrink",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`/drinks`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);

  //updateDrink api
  export const updateDrink = createAsyncThunk(
    'updateDrink',
    async ({id,payload}, { rejectWithValue }) => {
      try {
        const response = await instance.patch(`/drinks/${id}`, payload, {
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

//deleteDrink api
export const deleteDrink = createAsyncThunk(
  'deleteDrink',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/drinks/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
