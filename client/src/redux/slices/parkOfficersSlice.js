import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../API";

const SLICE_NAME = "parkOfficer";

const getParkOfficers = createAsyncThunk(
  `${SLICE_NAME}/getParkOfficers`,
  async (param, thunkAPI) => {
    try {
      const {
        data: { data: parkOfficers },
      } = await API.getParkOfficers();
      return parkOfficers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/deleteParkOfficer`,
  async (parkOfficerID, thunkAPI) => {
    try {
      await API.deleteParkOfficer(parkOfficerID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const dismissParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/dismissParkOfficer`,
  async (parkOfficerID, thunkAPI) => {
    try {
      await API.dismissParkOfficer(parkOfficerID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/addParkOfficer`,
  async (parkOfficer, thunkAPI) => {
    try {
      await API.addParkOfficer(parkOfficer);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  parkOfficers: [],
  isLoading: false,
  error: null,
};

const parkOfficerSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getParkOfficers.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(getParkOfficers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.parkOfficers = action.payload;
    });
    builder.addCase(getParkOfficers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteParkOfficer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteParkOfficer.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(dismissParkOfficer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(dismissParkOfficer.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(dismissParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addParkOfficer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addParkOfficer.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = parkOfficerSlice;

export {
  getParkOfficers,
  deleteParkOfficer,
  dismissParkOfficer,
  addParkOfficer,
};

export default reducer;
