"use client";

import { configureStore } from "@reduxjs/toolkit";
import CommonSlice from "./CommonSlice";

const store = configureStore({
  reducer: {
    common: CommonSlice,
  },
});

export default store;
