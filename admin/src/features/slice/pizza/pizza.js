import { createSlice } from "@reduxjs/toolkit";

import { postBasePizza , postCheesePizza , postSizePizza , postVegTopping , postMeatTopping, postSaucePizza } from "../../actions/pizza/postCustomization";


import { updateBasePizza ,updateSizePizza, updateCheesePizza  ,updateSaucePizza  ,updateVegTopping ,updateMeatTopping} from "../../actions/pizza/patchCustomization";
import { getBasePizza, getCheesePizza, getMeatTopping, getSaucePizza, getSizePizza, getVegetarianTopping } from "../../actions/pizza/getCustomization";
import { deleteBasePizza , deleteSizePizza , deleteCheesePizza , deleteSaucePizza , deleteVegTopping ,  deleteMeatTopping } from "../../actions/pizza/deleteCustomization";


const initialState = {
  isBaseSuccess:false,
  isSizeSuccess:false,
  isCheeseSuccess:false,
  isSauceSuccess:false,
  isVegToppingSuccess:false,
  isMeatToppingeSuccess:false,
  isBaseLoading: false,
  isSizeLoading:false,
  isCheeseLoading:false,
  isSauceLoading:false,
  isVegToppingLoading:false,
  isMeatToppingeLoading:false,
  
  isError: false,
  base: [],
  size: [],
  vegetarianToppings: [],
  sauce: [],
  cheese: [],
  meatToppings: [],
};

const pizza = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    resetStatus: (state, action) => {
      state.isBaseSuccess = action.payload;
      state.isMeatToppingeSuccess = action.payload;
      state.isVegToppingSuccess = action.payload;
      state.isSauceSuccess = action.payload;
      state.isCheeseSuccess = action.payload;
      state.isSizeSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {




    // ---------------------------------------Customization api's  bases,size,etc---------------------
    // bases get api action and state
    builder.addCase(getBasePizza.pending, (state) => {
      state.isBaseLoading = true
    });
    builder.addCase(getBasePizza.fulfilled, (state, action) => {
      state.base = action.payload.data;
      state.isBaseLoading = false

    });
    builder.addCase(getBasePizza.rejected, (state) => {
      state.isBaseLoading = false
      state.isError = true;
    });

    // bases post api action and state
    builder.addCase(postBasePizza.pending, (state) => {
      state.isBaseLoading = true
    });
    builder.addCase(postBasePizza.fulfilled, (state, action) => {
      state.isBaseLoading = false
      state.isBaseSuccess = true;
    });
    builder.addCase(postBasePizza.rejected, (state) => {
      state.isBaseLoading = false
      state.isError = true;
      
    });

    // updateBasePizza cases
    builder.addCase(updateBasePizza.pending, (state) => {
      state.isBaseLoading = true
    });
    builder.addCase(updateBasePizza.fulfilled, (state, action) => {
      state.isBaseLoading = false
      state.isBaseSuccess = true;
    });
    builder.addCase(updateBasePizza.rejected, (state) => {
      state.isBaseLoading = false
      state.isError = true;
    });

    // deleteBasePizza cases
    builder.addCase(deleteBasePizza.pending, (state) => {
      state.isBaseLoading = true
    });
    builder.addCase(deleteBasePizza.fulfilled, (state, action) => {
      state.isBaseLoading = false
      state.isBaseSuccess = true;
    });
    builder.addCase(deleteBasePizza.rejected, (state) => {
      state.isBaseLoading = false
      state.isError = true;
    });

    // Size get api action and state
    builder.addCase(getSizePizza.pending, (state) => {
      state.isSizeLoading = true;
    });
    builder.addCase(getSizePizza.fulfilled, (state, action) => {
      state.isSizeLoading = false;
      state.size = action.payload.data;
    });
    builder.addCase(getSizePizza.rejected, (state) => {
      state.isSizeLoading = false;
      state.isError = true;
    });

    // size post api action and state
    builder.addCase(postSizePizza.pending, (state) => {
      state.isSizeLoading = true;
    });
    builder.addCase(postSizePizza.fulfilled, (state, action) => {
      state.isSizeLoading = false;
      state.isSizeSuccess = true; 
    });
    builder.addCase(postSizePizza.rejected, (state) => {
      state.isSizeLoading = false;
      state.isError = true;
    });

    // updateSizePizza cases
    builder.addCase(updateSizePizza.pending, (state) => {
      state.isSizeLoading = true;
    });
    builder.addCase(updateSizePizza.fulfilled, (state, action) => {
      state.isSizeLoading = false;
      state.isSizeSuccess = true;
    });
    builder.addCase(updateSizePizza.rejected, (state) => {
      state.isSizeLoading = false;
      state.isError = true;
    });

    // deleteSizePizza cases
    builder.addCase(deleteSizePizza.pending, (state) => {
      state.isSizeLoading = true;
    });
    builder.addCase(deleteSizePizza.fulfilled, (state, action) => {
      state.isSizeLoading = false;
      state.isSizeSuccess = true;
    });
    builder.addCase(deleteSizePizza.rejected, (state) => {
      state.isSizeLoading = false;
      state.isError = true;
    });

    // cheese get api action and state
    builder.addCase(getCheesePizza.pending, (state) => {
      state.isCheeseLoading = true;
    });
    builder.addCase(getCheesePizza.fulfilled, (state, action) => {
      state.isCheeseLoading = false;
      state.cheese = action.payload.data;
    });
    builder.addCase(getCheesePizza.rejected, (state) => {
      state.isCheeseLoading = false;
      state.isError = true;
    });

    // cheese post api action and state
    builder.addCase(postCheesePizza.pending, (state) => {
      state.isCheeseLoading = true;
    });
    builder.addCase(postCheesePizza.fulfilled, (state, action) => {
      state.isCheeseLoading = false;
      state.isCheeseSuccess = true;
    });
    builder.addCase(postCheesePizza.rejected, (state) => {
      state.isCheeseLoading = false;
      state.isError = true;
    });

    // updateCheesePizza cases
    builder.addCase(updateCheesePizza.pending, (state) => {
      state.isCheeseLoading = true;
    });
    builder.addCase(updateCheesePizza.fulfilled, (state, action) => {
      state.isCheeseLoading = false;
      state.isCheeseSuccess = true;

    });
    builder.addCase(updateCheesePizza.rejected, (state) => {
      state.isCheeseLoading = false;
      state.isError = true;
    });

    // deleteCheesePizza cases
    builder.addCase(deleteCheesePizza.pending, (state) => {
      state.isCheeseLoading = true;
    });
    builder.addCase(deleteCheesePizza.fulfilled, (state, action) => {
      state.isCheeseLoading = false;
      state.isCheeseSuccess = true;

    });
    builder.addCase(deleteCheesePizza.rejected, (state) => {
      state.isCheeseLoading = false;
      state.isError = true;
    });

    // Sauce get api action and state
    builder.addCase(getSaucePizza.pending, (state) => {
      state.isSauceLoading = true;
    });
    builder.addCase(getSaucePizza.fulfilled, (state, action) => {
      state.isSauceLoading = false;
      state.sauce = action.payload.data;
    });
    builder.addCase(getSaucePizza.rejected, (state) => {
      state.isSauceLoading = false;
      state.isError = true;
    });

    // Sauce post api action and state
    builder.addCase(postSaucePizza.pending, (state) => {
      state.isSauceLoading = true;
    });
    builder.addCase(postSaucePizza.fulfilled, (state, action) => {
      state.isSauceLoading = false;
      state.isSauceSuccess = true;
    });
    builder.addCase(postSaucePizza.rejected, (state) => {
      state.isSauceLoading = false;
      state.isError = true;
    });

    // updateSaucePizza cases
    builder.addCase(updateSaucePizza.pending, (state) => {
      state.isSauceLoading = true;
    });
    builder.addCase(updateSaucePizza.fulfilled, (state, action) => {
      state.isSauceLoading = false;
      state.isSauceSuccess = true;

    });
    builder.addCase(updateSaucePizza.rejected, (state) => {
      state.isSauceLoading = false;
      state.isError = true;
    });

    // deleteSaucePizza cases
    builder.addCase(deleteSaucePizza.pending, (state) => {
      state.isSauceLoading = true;
    });
    builder.addCase(deleteSaucePizza.fulfilled, (state, action) => {
      state.isSauceLoading = false;
      state.isSauceSuccess = true;

    });
    builder.addCase(deleteSaucePizza.rejected, (state) => {
      state.isSauceLoading = false;
      state.isError = true;
    });


    // Vegetarian Topping get api action and state
    builder.addCase(getVegetarianTopping.pending, (state) => {
      state.isVegToppingLoading = true;
    });
    builder.addCase(getVegetarianTopping.fulfilled, (state, action) => {
      state.isVegToppingLoading = false;
      state.vegetarianToppings = action.payload.data;

    });
    builder.addCase(getVegetarianTopping.rejected, (state) => {
      state.isVegToppingLoading = false;
      state.isError = true;
    });

    // Veg post api action and state
    builder.addCase(postVegTopping.pending, (state) => {
      state.isVegToppingLoading = true;
    });
    builder.addCase(postVegTopping.fulfilled, (state, action) => {
      state.isVegToppingLoading = false;
      state.isVegToppingSuccess = true;
    });
    builder.addCase(postVegTopping.rejected, (state) => {
      state.isVegToppingLoading = false;
      state.isError = true;
    });

    // updateVegPizza cases
    builder.addCase(updateVegTopping.pending, (state) => {
      state.isVegToppingLoading = true;
    });
    builder.addCase(updateVegTopping.fulfilled, (state, action) => {
      state.isVegToppingLoading = false;
      state.isVegToppingSuccess = true;

    });
    builder.addCase(updateVegTopping.rejected, (state) => {
      state.isVegToppingLoading = false;
      state.isError = true;
    });

    // delete veg topping cases
    builder.addCase(deleteVegTopping.pending, (state) => {
      state.isVegToppingLoading = true;
    });
    builder.addCase(deleteVegTopping.fulfilled, (state, action) => {
      state.isVegToppingLoading = false;
      state.isVegToppingSuccess = true;

    });
    builder.addCase(deleteVegTopping.rejected, (state) => {
      state.isVegToppingLoading = false;
      state.isError = true;
    });

    // MeatTopping get api action and state
    builder.addCase(getMeatTopping.pending, (state) => {
      state.isMeatToppingeLoading = true;
    });
    builder.addCase(getMeatTopping.fulfilled, (state, action) => {
      state.isMeatToppingeLoading = false;
      state.meatToppings = action.payload.data;
    });
    builder.addCase(getMeatTopping.rejected, (state) => {
      state.isMeatToppingeLoading = false;
      state.isError = true;
    });

    // MeatTopping post api action and state
    builder.addCase(postMeatTopping.pending, (state) => {
      state.isMeatToppingeLoading = true;
    });
    builder.addCase(postMeatTopping.fulfilled, (state, action) => {
      state.isMeatToppingeLoading = false;
      state.isMeatToppingeSuccess = true;
    });
    builder.addCase(postMeatTopping.rejected, (state) => {
      state.isMeatToppingeLoading = false;
      state.isError = true;
    });

    // updateMeatTopping cases
    builder.addCase(updateMeatTopping.pending, (state) => {
      state.isMeatToppingeLoading = true;
    });
    builder.addCase(updateMeatTopping.fulfilled, (state, action) => {
      state.isMeatToppingeLoading = false;
      state.isMeatToppingeSuccess = true;

    });
    builder.addCase(updateMeatTopping.rejected, (state) => {
      state.isMeatToppingeLoading = false;
      state.isError = true;
    });

    // delete meat topping cases
    builder.addCase(deleteMeatTopping.pending, (state) => {
      state.isMeatToppingeLoading = true;
    });
    builder.addCase(deleteMeatTopping.fulfilled, (state, action) => {
      state.isMeatToppingeLoading = false;
      state.isMeatToppingeSuccess = true;
      
    });
    builder.addCase(deleteMeatTopping.rejected, (state) => {
      state.isMeatToppingeLoading = false;
      state.isError = true;
    });

    // ----------------------------------------------------------------------------------------------------------------
  },
});

export const {resetStatus} = pizza.actions;
export default pizza.reducer;
