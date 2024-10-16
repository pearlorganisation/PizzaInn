import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../services/axiosInterceptor";



export const deleteBasePizza = createAsyncThunk(
    "deleteBasePizza",
    async (id) => {
      try {
        const res = await instance.delete(`/food/customization/base/${id}`);
        return res.data;
      } catch (error) {
        throw new Error("Failed to delete base pizza");
      }
    }
  );
  
  export const deleteCheesePizza = createAsyncThunk(
    "deleteCheesePizza",
    async (id) => {
      try {
        const res = await instance.delete(`/food/customization/cheese/${id}`);
        return res.data;
      } catch (error) {
        throw new Error("Failed to delete cheese pizza");
      }
    }
  );
  
  export const deleteMeatTopping = createAsyncThunk(
    "deleteMeatTopping",
    async (id) => {
      try {
        const res = await instance.delete(`/food/customization/meatToppings/${id}`);
        return res.data;
      } catch (error) {
        throw new Error("Failed to delete meat topping");
      }
    }
  );
  
  export const deleteSaucePizza = createAsyncThunk(
    "deleteSaucePizza",
    async (id) => {
      try {
        const res = await instance.delete(`/food/customization/sauce/${id}`);
        return res.data;
      } catch (error) {
        throw new Error("Failed to delete sauce pizza");
      }
    }
  );
  
  export const deleteSizePizza = createAsyncThunk(
    "deleteSizePizza",
    async (id) => {
      try {
        const res = await instance.delete(`/food/customization/size/${id}`);
        return res.data;
      } catch (error) {
        throw new Error("Failed to delete size pizza");
      }
    }
  );
  
  export const deleteVegTopping = createAsyncThunk(
    "deleteVegTopping",
    async (id) => {
      try {
        const res = await instance.delete(`/food/customization/vegetarianToppings/${id}`);
        return res.data;
      } catch (error) {
        throw new Error("Failed to delete vegetarian topping");
      }
    }
  );