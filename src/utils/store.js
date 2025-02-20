import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./emailSlice";

const appStore = configureStore({
  reducer: { email: emailSlice },
});

export default appStore;
