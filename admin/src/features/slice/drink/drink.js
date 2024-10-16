import { createSlice } from "@reduxjs/toolkit";
import { createDrink, deleteDrink, getDrink, updateDrink } from "../../actions/drink/drink";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  drinkData: [],
  errorMessage: "",
  isDeleted:false,
};

// ---------------------------------------------------------------------------------------

export const drinkSlice = createSlice({
  name: "drinkSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createDrink.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createDrink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.drinkData = action.payload.data;
        console.log(state.drinkData)
        toast.success("Drink Added Successfully...",{
          position:"top-center"
        });
      })
      .addCase(createDrink.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(deleteDrink.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.errorMessage = "";
      })
      .addCase(deleteDrink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.errorMessage = "";
        toast.success("Drink Deleted Successfully...",{
          position:"top-center"
        });
      })
      .addCase(deleteDrink.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(updateDrink.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateDrink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.drinkData = action.payload.data;
        toast.success("Drink Updated Successfully...",{
          position:"top-center"
        });
      })
      .addCase(updateDrink.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(getDrink.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getDrink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.drinkData = action.payload.data;
      })
      .addCase(getDrink.rejected, (state, action) => {
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
export const {} = drinkSlice.actions;
export default drinkSlice.reducer;
