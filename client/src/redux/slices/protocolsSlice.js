import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../API";

const SLICE_NAME = "protocols";

const getAllProtocols = createAsyncThunk(
  `${SLICE_NAME}/getAllProtocols`,
  async (param, thunkAPI) => {
    try {
      const {
        data: { data: protocols },
      } = await API.getAllProtocols();
      return protocols;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getAllProtocolsByOfficerID = createAsyncThunk(
  `${SLICE_NAME}/getAllProtocolsByOfficerID `,
  async (parkOfficerID, thunkAPI) => {
    try {
      const {
        data: { data: protocols },
      } = await API.getAllProtocolsByOfficerID(parkOfficerID);
      return protocols;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteProtocolByID = createAsyncThunk(
  `${SLICE_NAME}/deleteProtocolByID`,
  async ({ parkOfficerID, protocolID }, thunkAPI) => {
    try {
      await API.deleteProtocolByID(parkOfficerID, protocolID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const updateProtocol = createAsyncThunk(
  `${SLICE_NAME}/updateProtocol`,
  async ({ parkOfficerID, protocolID, updatedData }, thunkAPI) => {
    try {
      await API.updateProtocol(parkOfficerID, protocolID, updatedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addImagesToProtocol = createAsyncThunk(
  `${SLICE_NAME}/addImagesToProtocol`,
  async ({ protocolID, images }, thunkAPI) => {
    try {
      await API.addProtocolImages(images, protocolID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const deleteProtocolImageByID = createAsyncThunk(
  `${SLICE_NAME}/deleteProtocolImageByID`,
  async ({ protocolID, imageID }, thunkAPI) => {
    try {
      await API.deleteProtocolImageByID(protocolID, imageID);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  protocols: [],
  isLoading: false,
  error: null,
};

const protocolSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProtocols.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllProtocols.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.protocols = action.payload;
    });
    builder.addCase(getAllProtocols.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getAllProtocolsByOfficerID.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllProtocolsByOfficerID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.protocols = action.payload;
    });
    builder.addCase(getAllProtocolsByOfficerID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProtocolByID.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProtocolByID.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteProtocolByID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProtocol.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProtocol.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updateProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addImagesToProtocol.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addImagesToProtocol.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addImagesToProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteProtocolImageByID.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProtocolImageByID.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteProtocolImageByID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = protocolSlice;

export {
  getAllProtocols,
  getAllProtocolsByOfficerID,
  deleteProtocolByID,
  updateProtocol,
  addImagesToProtocol,
  deleteProtocolImageByID,
};

export default reducer;
