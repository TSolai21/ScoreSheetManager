"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
};

const CommonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSideBarOpen: (state, action) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});
export const { setSideBarOpen } = CommonSlice.actions;
export default CommonSlice.reducer;
