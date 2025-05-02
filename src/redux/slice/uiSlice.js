import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: {
    visible: false,
    message: "",
    type: "default",
  },
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  sidebar: {
    isOpen: true,
  },
  loading: {
    global: false,
    operations: {},
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        visible: true,
        message: action.payload.message,
        type: action.payload.type || "default",
      };
    },
    hideToast: (state) => {
      state.toast.visible = false;
    },
    setModal: (state, action) => {
      state.modal = {
        isOpen: action.payload.isOpen,
        type: action.payload.type,
        data: action.payload.data,
      };
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    setSidebarState: (state, action) => {
      state.sidebar.isOpen = action.payload;
    },
    setLoading: (state, action) => {
      const { operation, isLoading } = action.payload;
      if (operation) {
        state.loading.operations[operation] = isLoading;
      } else {
        state.loading.global = isLoading;
      }
    },
  },
});

export const {
  showToast,
  hideToast,
  setModal,
  toggleSidebar,
  setSidebarState,
  setLoading,
} = uiSlice.actions;

export const selectToast = (state) => state.ui.toast;
export const selectModal = (state) => state.ui.modal;
export const selectSidebar = (state) => state.ui.sidebar;
export const selectLoading = (state) => state.ui.loading;

export default uiSlice.reducer;
