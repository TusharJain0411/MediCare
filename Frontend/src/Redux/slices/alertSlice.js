import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading:false,
  Nav_width:false,
};


const alertSlice = createSlice({
  name: "alert",
  initialState,

  reducers:{
    showLoading:(state)=>{
        state.loading=true;
    },

    hideLoading:(state)=>{
         state.loading=false;
    },

    navExpand:(state)=>{
      state.Nav_width=false;
    },

    navSrink:(state)=>{
      state.Nav_width=true;
    }

  }
});

export const {showLoading,hideLoading,navExpand,navSrink } =
  alertSlice.actions;

export default alertSlice.reducer;