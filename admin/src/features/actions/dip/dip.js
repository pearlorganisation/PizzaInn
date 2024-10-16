import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const createDip = createAsyncThunk(
  "createDip",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/dips`, payload, {
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

export const getDip = createAsyncThunk("getDip",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`/dips`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);

  //updateDip api
  export const updateDip = createAsyncThunk(
    'updateDip',
    async ({id,payload}, { rejectWithValue }) => {
      try {
        const response = await instance.patch(`/dips/${id}`, payload, {
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

//deleteDip api
export const deleteDip = createAsyncThunk(
  'deleteDip',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/dips/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
