import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";


export const getBasePizza = createAsyncThunk("getBasePizza",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`food/customization/base`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);
export const getCheesePizza = createAsyncThunk("getCheesePizza",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`food/customization/cheese`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);
export const getMeatTopping = createAsyncThunk("getMeatTopping",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`food/customization/meatToppings`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);
export const getSaucePizza = createAsyncThunk("getSaucePizza",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`food/customization/sauce`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);

export const getSizePizza = createAsyncThunk("getSizePizza",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`food/customization/size`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);
export const getVegetarianTopping = createAsyncThunk("getVegetarianTopping",    
  async (payload, { rejectWithValue }) => {
  try {
    const {data} = await instance.get(`food/customization/vegetarianToppings`, {
      withCredentials: true,
    });
    return data;

  } catch (e) {
    return rejectWithValue(e);
  }
}
);

 
