import { createSlice } from "@reduxjs/toolkit";
import { createDeal, deleteDeal, getDeal, updateDeal } from "../../actions/deals/deal";
import { toast } from "sonner";
import { redirect } from "react-router-dom";

const initialState = {
    isLoading: false,
    isSuccess: false,
    dealData: [],
    errorMessage: "",
    isDeleted:false,
};



export const dealsSlice =  createSlice({

    name:"dealsSlice",
    initialState,
    reducers:{
      clearIsSuccess: (state)=>{
        state.isSuccess= false,
        state.isDeleted = false
      }
    },
    extraReducers : (builder) => {

        builder
        .addCase(createDeal.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.errorMessage = "";
          })
        .addCase(createDeal.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.errorMessage = "";
            state.dealData = action.payload;
            console.log(state.dealData)
            toast.success("Deal Created Successfully...",{
              position:"top-center"
            });
            
        })
        .addCase(createDeal.rejected,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = action.payload;
            toast.error(action?.payload || "Something went wrong",{
              position:"top-center"
            })
        })

        .addCase(getDeal.pending, (state, action) => {
            state.isLoading = true;
          
            state.errorMessage = "";
          })
        .addCase(getDeal.fulfilled,(state,action)=>{
            state.isLoading = false;
        
            state.errorMessage = "";
            state.dealData = action.payload;
            console.log(state.dealData)
        })
        .addCase(getDeal.rejected,(state,action)=>{
            state.isLoading = false;
            state.errorMessage = action.payload;
            toast.error(action?.payload || "Something went wrong",{
              position:"top-center"
            })
            
        })

        .addCase(updateDeal.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.errorMessage = "";
          })
        .addCase(updateDeal.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.errorMessage = "";
            // state.dealData = action.payload.data;
            console.log(state.dealData)
            toast.success("Deal Updated Successfully...",{
              position:"top-center"
            });
        })
        .addCase(updateDeal.rejected,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = action.payload;
            toast.error(action?.payload || "Something went wrong",{
              position:"top-center"
            })
        })

        .addCase(deleteDeal.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.errorMessage = "";
          })
        .addCase(deleteDeal.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isDeleted = true;
            state.errorMessage = 
            toast.success("DealData Deleted Successfully...",{
              position:"top-center"
            });

        })
        .addCase(deleteDeal.rejected,(state,action)=>{
            state.isLoading = false;
            state.isDeleted = false;
            state.errorMessage = action.payload;
            toast.error(action?.payload || "Something went wrong",{
              position:"top-center"
            })

        })
    
        
    }
    

})



export default dealsSlice.reducer;
export const {clearIsSuccess} = dealsSlice.actions


