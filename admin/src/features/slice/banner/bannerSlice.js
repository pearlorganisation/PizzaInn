// src/features/slices/bannerSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { getBanner, deleteBanner, createBanner, updateBanner } from "../../actions/banner/banner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  bannerData: [],
  isDeleted: false,
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const bannerSlice = createSlice({
  name: "bannerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Get Banners
      .addCase(getBanner.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.bannerData = action.payload.data; // Corrected from sidesData to bannerData
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to fetch banners.";
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      })

      // Handle Delete Banner
      .addCase(deleteBanner.pending, (state) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.errorMessage = "";
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.errorMessage = "";
        // Remove the deleted banner from bannerData
        state.bannerData = state.bannerData.filter(banner => banner._id !== action.payload.id);
        toast.success("Banner Deleted Successfully...", {
          position: "top-center",
        });
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload || "Failed to delete banner.";
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      })

      // Handle Create Banner
      .addCase(createBanner.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.bannerData = action.payload.data; // Assuming the new banner is returned
        toast.success("Banner Created Successfully...", {
          position: "top-center",
        });
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to create banner.";
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      })

      // Handle Update Banner
      .addCase(updateBanner.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.isUpdated = true
        state.scheme = action.payload;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload || "Failed to update banner.";
        toast.error(action?.payload || "Something went wrong", {
          position: "top-center",
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = bannerSlice.actions;
export default bannerSlice.reducer;
