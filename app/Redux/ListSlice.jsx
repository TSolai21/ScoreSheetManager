import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: false,
  isLoading: false,
  isError: false,
};

export const fetchStudent = createAsyncThunk("fetchStudent", async (userId) => {
  try {
    const response = await fetch("api/students" + userId + "");
    return response.json();
  } catch (err) {
    throw new Error(err.message);
  }
});
export const removeStudent = createAsyncThunk(
  "removeStudent",
  async (userId) => {
    try {
      const response = await fetch("api/students" + userId + "");
      return response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

const ListSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = false;
    },
    resetError: (state) => {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStudent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchStudent.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default ListSlice;
