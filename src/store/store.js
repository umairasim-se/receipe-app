import { configureStore } from "@reduxjs/toolkit";
import ReceipeSlice from "../features/ReceipeSlice";

const store = configureStore({
  reducer: {
    receipe: ReceipeSlice
  }
});

export default store;
