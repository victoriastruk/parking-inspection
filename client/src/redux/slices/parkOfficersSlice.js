import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as API from "../../API";

const SLICE_NAME = "parkOfficer";

const getParkOfficers = createAsyncThunk(
  `${SLICE_NAME}/getParkOfficers`,
  async ({ limit = 5, offset = 0 } = {}, thunkAPI) => {
    try {
      const {
        data: { data: parkOfficers, total },
      } = await API.getParkOfficers(limit, offset);
      return { parkOfficers, total };
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

const restoreParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/restoreParkOfficer`,
  async (parkOfficerID, thunkAPI) => {
    try {
      await API.restoreParkOfficer(parkOfficerID);
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

const updateParkOfficer = createAsyncThunk(
  `${SLICE_NAME}/updateParkOfficer`,
  async ({ parkOfficerID, updatedData }, thunkAPI) => {
    try {
      await API.updateParkOfficer(parkOfficerID, updatedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  parkOfficers: [],
  total: 0,
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
      state.parkOfficers = action.payload.parkOfficers;
      state.total = action.payload.total;
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
      toast.success("Officer successfully deleted");
    });
    builder.addCase(deleteParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to delete officer");
    });
    builder.addCase(dismissParkOfficer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(dismissParkOfficer.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      toast.success("Officer successfully dismissed");
    });
    builder.addCase(dismissParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to dismiss officer");
    });

    builder.addCase(restoreParkOfficer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(restoreParkOfficer.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      toast.success("Officer successfully restored");
    });
    builder.addCase(restoreParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to restore officer");
    });

    builder.addCase(addParkOfficer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addParkOfficer.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      toast.success("Officer successfully added");
    });
    builder.addCase(addParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to add officer");
    });
    builder.addCase(updateParkOfficer.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateParkOfficer.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      toast.success("Officer successfully updated");
    });
    builder.addCase(updateParkOfficer.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to update officer");
    });
  },
});

const { reducer } = parkOfficerSlice;

export {
  getParkOfficers,
  deleteParkOfficer,
  dismissParkOfficer,
  restoreParkOfficer,
  addParkOfficer,
  updateParkOfficer,
};

export default reducer;
