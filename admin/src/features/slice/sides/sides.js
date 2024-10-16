import { createSlice } from "@reduxjs/toolkit";
import { createSides, deleteSides, getSides, updateSides } from "../../actions/sides/sides";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  sidesData: [],
  isDeleted:false,
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const sidesSlice = createSlice({
  name: "sidesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createSides.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createSides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.sidesData = action.payload.data;
        console.log(state.sidesData)
        toast.success("Sides Added Successfully...",{
          position:"top-center"
        });
      })
      .addCase(createSides.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(deleteSides.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.errorMessage = "";
      })
      .addCase(deleteSides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.errorMessage = "";
        toast.success("Sides Deleted Successfully...",{
          position:"top-center"
        });
      })
      .addCase(deleteSides.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(updateSides.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateSides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.sidesData = action.payload.data;
        toast.success("Sides Updated Successfully...",{
          position:"top-center"
        });
      })
      .addCase(updateSides.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(getSides.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getSides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.sidesData = action.payload.data;
      })
      .addCase(getSides.rejected, (state, action) => {
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
export const {} = sidesSlice.actions;
export default sidesSlice.reducer;
