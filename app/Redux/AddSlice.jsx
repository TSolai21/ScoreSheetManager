import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const addStudent = createAsyncThunk("addStudent", async (method) => {
  try {
    const response = await fetch("api/students", method);
    return response.json();
  } catch (err) {
    throw new Error(err.message);
  }
});

export const editStudent = createAsyncThunk("editStudent", async (data) => {
  try {
    const response = await fetch("api/students" + data.id + "", data.method);
    return response.json();
  } catch (err) {
    throw new Error(err.message);
  }
});

const AddSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    resetData: (state, action) => {
      //   state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.isLoading = false;
      //   state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(addStudent.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default AddSlice;
