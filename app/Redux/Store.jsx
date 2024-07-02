import { configureStore } from "@reduxjs/toolkit";
import StudentsSlice from "./StudentsSlice";
import ListSlice from "./ListSlice";
import AddSlice from "./AddSlice";
import CommonSlice from "./CommonSlice";

const Store = configureStore({
  reducer: {
    students: StudentsSlice.reducer,
    list: ListSlice.reducer,
    add: AddSlice.reducer,
    common: CommonSlice,
  },
});

export default Store;
