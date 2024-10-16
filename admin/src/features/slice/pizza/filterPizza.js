import { createSlice } from "@reduxjs/toolkit";
import { createFilter, deleteFilter, getFilter, updateFilter } from "../../actions/pizza/filterPizza";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  filterData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const filterPizzaSlice = createSlice({
  name: "filterPizzaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createFilter.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.filterData = action.payload.data;
        console.log(state.filterData)
        toast.success("Filter Added Successfully...",{
          position:"top-center"
        });
      })
      .addCase(createFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(deleteFilter.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.errorMessage = "";
      })
      .addCase(deleteFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.errorMessage = "";
        toast.success("Filter Deleted Successfully...",{
          position:"top-center"
        });
      })
      .addCase(deleteFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(updateFilter.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.filterData = action.payload.data;
        toast.success("Filter Updated Successfully...",{
          position:"top-center"
        });
      })
      .addCase(updateFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(getFilter.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.filterData = action.payload.data;
      })
      .addCase(getFilter.rejected, (state, action) => {
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
export const {} = filterPizzaSlice.actions;
export default filterPizzaSlice.reducer;
