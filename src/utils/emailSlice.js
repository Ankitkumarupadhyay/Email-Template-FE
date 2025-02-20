import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    name: "",
    subject: "",
    body: "",
    newTemplate: true,
  },
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeSubject: (state, action) => {
      state.subject = action.payload;
    },
    changeBody: (state, action) => {
      state.body = action.payload;
    },
    changeNewTemplate: (state) => {
      state.newTemplate = !state.newTemplate;
    },
  },
});

export const { changeBody, changeName, changeSubject, changeNewTemplate } =
  emailSlice.actions;

export default emailSlice.reducer;
