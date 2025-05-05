import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: {
    visible: false,
    message: "",
    type: "default", // 'default', 'success', 'error'
  },
  isDialogOpen: false,
  isSidebarOpen: true, // for mobile responsiveness
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast.visible = true;
      state.toast.message = action.payload.message;
      state.toast.type = action.payload.type || "default";
    },
    hideToast: (state) => {
      state.toast.visible = false;
    },
    toggleDialog: (state, action) => {
      state.isDialogOpen =
        action.payload !== undefined ? action.payload : !state.isDialogOpen;
    },
    toggleSidebar: (state, action) => {
      state.isSidebarOpen =
        action.payload !== undefined ? action.payload : !state.isSidebarOpen;
    },
  },
});

export const { showToast, hideToast, toggleDialog, toggleSidebar } =
  uiSlice.actions;

export default uiSlice.reducer;
