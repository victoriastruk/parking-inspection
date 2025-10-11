import { configureStore } from "@reduxjs/toolkit";
import parkOfficerReducer from "./slices/parkOfficersSlice";

const store = configureStore({
  reducer: {
    parkOfficers: parkOfficerReducer,
  },
});

export default store;
