import { configureStore } from "@reduxjs/toolkit";
import parkOfficerReducer from "./slices/parkOfficersSlice";
import protocolReducer from "./slices/protocolsSlice";

const store = configureStore({
  reducer: {
    parkOfficers: parkOfficerReducer,
    protocols: protocolReducer,
  },
});

export default store;
