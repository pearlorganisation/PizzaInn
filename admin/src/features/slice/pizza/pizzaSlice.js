import { createSlice } from "@reduxjs/toolkit";
import { createPizza, deletePizza, getPizza, updatePizza } from "../../actions/pizza/pizza";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  pizzaData: [],
  isDeleted:false,
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const pizzaSlice = createSlice({
  name: "pizzaSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createPizza.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createPizza.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.pizzaData = action.payload.data;
        console.log(state.pizzaData)
        toast.success("Pizza Added Successfully...",{
          position:"top-center"
        });
      })
      .addCase(createPizza.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(deletePizza.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.errorMessage = "";
      })
      .addCase(deletePizza.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.errorMessage = "";
        toast.success("Pizza Deleted Successfully...",{
          position:"top-center"
        });
      })
      .addCase(deletePizza.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(updatePizza.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updatePizza.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.pizzaData = action.payload.data;
        toast.success("Pizza Updated Successfully...",{
          position:"top-center"
        });
      })
      .addCase(updatePizza.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(action?.payload || "Something went wrong",{
          position:"top-center"
        });
      })
      .addCase(getPizza.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getPizza.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.pizzaData = action.payload.data;
      })
      .addCase(getPizza.rejected, (state, action) => {
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
export const {} = pizzaSlice.actions;
export default pizzaSlice.reducer;
