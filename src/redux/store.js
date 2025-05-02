import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import subjectsReducer from "./slice/subjectsSlice";
import documentsReducer from "./slice/documentsSlice";
import uiReducer from "./slice/uiSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("doctalkState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      auth: state.auth,
      subjects: state.subjects,
      documents: state.documents,
    });
    localStorage.setItem("doctalkState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
    documents: documentsReducer,
    ui: uiReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
