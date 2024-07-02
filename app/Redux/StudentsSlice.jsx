import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  currentPage: 1,
  itemsPerPage: 5,
  searchTerm: "",
};

export const fetchStudents = createAsyncThunk("fetchStudents", async () => {
  try {
    const response = await fetch("api/students");
    return response.json();
  } catch (err) {
    throw new Error(err.message);
  }
});
export const fetchStudent = createAsyncThunk("fetchStudent", async (userId) => {
  try {
    const response = await fetch("api/students/" + userId + "");
    return response.json();
  } catch (err) {
    throw new Error(err.message);
  }
});

const StudentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    updateData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default StudentsSlice;
