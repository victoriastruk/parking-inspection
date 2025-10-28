import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as API from "../../API";

const SLICE_NAME = "protocols";

const getAllProtocols = createAsyncThunk(
  `${SLICE_NAME}/getAllProtocols`,
  async ({ limit = 5, offset = 0 } = {}, thunkAPI) => {
    try {
      const {
        data: { data: protocols, total },
      } = await API.getAllProtocols(limit, offset);
      return { protocols, total };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getAllProtocolsByOfficerID = createAsyncThunk(
  `${SLICE_NAME}/getAllProtocolsByOfficerID`,
  async ({ parkOfficerID, limit = 5, offset = 0 }, thunkAPI) => {
    try {
      const {
        data: { data: protocols, total },
      } = await API.getAllProtocolsByOfficerID(parkOfficerID, limit, offset);
      return { protocols, total };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const createProtocol = createAsyncThunk(
  `${SLICE_NAME}/createProtocol`,
  async ({ parkOfficerID, protocol }, thunkAPI) => {
    try {
      await API.createProtocol(parkOfficerID, protocol);
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
  total: 0,
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
      state.protocols = action.payload.protocols;
      state.total = action.payload.total;
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
      state.protocols = action.payload.protocols;
      state.total = action.payload.total;
    });
    builder.addCase(getAllProtocolsByOfficerID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(createProtocol.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createProtocol.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      toast.success("Protocol successfuly created");
    });
    builder.addCase(createProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to create protocol");
    });

    builder.addCase(deleteProtocolByID.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProtocolByID.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      toast.success("Protocol successfuly deleted");
    });
    builder.addCase(deleteProtocolByID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to delete protocol");
    });
    builder.addCase(updateProtocol.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProtocol.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      toast.success("Protocol successfuly updated");
    });
    builder.addCase(updateProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to update protocol");
    });
    builder.addCase(addImagesToProtocol.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addImagesToProtocol.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      toast.success("Image(s) successfuly added");
    });
    builder.addCase(addImagesToProtocol.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to add images");
    });
    builder.addCase(deleteProtocolImageByID.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProtocolImageByID.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      toast.success("Image successfuly deleted");
    });
    builder.addCase(deleteProtocolImageByID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error(action.payload?.message || "Failed to delete image");
    });
  },
});

const { reducer } = protocolSlice;

export {
  getAllProtocols,
  getAllProtocolsByOfficerID,
  createProtocol,
  deleteProtocolByID,
  updateProtocol,
  addImagesToProtocol,
  deleteProtocolImageByID,
};

export default reducer;
