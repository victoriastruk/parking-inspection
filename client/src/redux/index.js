import { configureStore } from "@reduxjs/toolkit";
import parkOfficerReducer from "./slices/parkOfficersSlice";
import protocolReducer from "./slices/protocolsSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    parkOfficers: parkOfficerReducer,
    protocols: protocolReducer,
    users: userReducer,
  },
});

export default store;
