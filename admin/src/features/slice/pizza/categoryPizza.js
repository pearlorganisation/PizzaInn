import { createSlice } from "@reduxjs/toolkit";

import { createCategory, deleteCategory, getCategory, updateCategory } from "../../actions/pizza/categoryPizza";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  categoryData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const categoryPizzaSlice = createSlice({
  name: "categoryPizzaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.categoryData = action.payload.data;
        toast.success("Category Added Successfully...",{
          position:"top-center"
        });
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.errorMessage = "";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.errorMessage = "";
        toast.success("Category Deleted Successfully...",{
          position:"top-center"
        });
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.categoryData = action.payload.data;
        toast.success("Category Updated Successfully...",{
          position:"top-center"
        });
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(getCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.categoryData = action.payload.data;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = categoryPizzaSlice.actions;
export default categoryPizzaSlice.reducer;
