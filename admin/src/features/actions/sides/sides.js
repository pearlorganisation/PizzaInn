import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const createSides = createAsyncThunk(
  "createSides",
  async (data) => {
    const response = await instance.post(
      "/sides",
      data
    );
    console.log(response.data, "res");
    return response;
  }
);

export const getSides = createAsyncThunk("getSides", async () => {
  const {data} = await instance.get(
    "/sides"
  );
  console.log(data, "res");
  return data;
});

  //updateSides api
  export const updateSides = createAsyncThunk(
    'updateSides',
    async ({id,payload}, { rejectWithValue }) => {
      try {
        const response = await instance.patch(`/sides/${id}`, payload, {
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

//deleteSides api
export const deleteSides = createAsyncThunk(
  'deleteSides',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/sides/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
