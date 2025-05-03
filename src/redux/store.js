import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import subjectsReducer from "./slice/subjectsSlice";
import documentsReducer from "./slice/documentsSlice";
import uiReducer from "./slice/uiSlice";

// Load state from localStorage for all data
// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("doctalkState");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (error) {
//     console.error("Error loading state from localStorage:", error);
//     return undefined;
//   }
// };

// Load only the `auth` section as `docUser`
const loadDocUser = () => {
  try {
    const serializedDocUser = localStorage.getItem("docUser");
    if (serializedDocUser === null) {
      return undefined;
    }
    return { auth: JSON.parse(serializedDocUser) };
  } catch (error) {
    console.error("Error loading auth state from localStorage:", error);
    return undefined;
  }
};

// Save state to localStorage for all data
// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify({
//       auth: state.auth,
//       subjects: state.subjects,
//       documents: state.documents,
//     });
//     localStorage.setItem("doctalkState", serializedState);
//   } catch (error) {
//     console.error("Error saving state to localStorage:", error);
//   }
// };

// Save only the `auth` section as `docUser`
const saveDocUser = (authState) => {
  try {
    const serializedDocUser = JSON.stringify(authState);
    localStorage.setItem("docUser", serializedDocUser);
  } catch (error) {
    console.error("Error saving auth state to localStorage:", error);
  }
};

// const preloadedState = loadState();
const preloadedDocUser = loadDocUser();

const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
    documents: documentsReducer,
    ui: uiReducer,
  },
  preloadedState: preloadedDocUser, // Prioritize full state if available
});

store.subscribe(() => {
  const state = store.getState();
  // saveState(state); // Save full state
  saveDocUser(state.auth); // Save only `auth` state
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slice/authSlice";
// import subjectsReducer from "./slice/subjectsSlice";
// import documentsReducer from "./slice/documentsSlice";
// import uiReducer from "./slice/uiSlice";

// // Load state from localStorage
// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem("doctalkState");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (error) {
//     console.error("Error loading state from localStorage:", error);
//     return undefined;
//   }
// };

// // Save state to localStorage
// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify({
//       auth: state.auth,
//       subjects: state.subjects,
//       documents: state.documents,
//     });
//     localStorage.setItem("doctalkState", serializedState);
//   } catch (error) {
//     console.error("Error saving state to localStorage:", error);
//   }
// };

// const preloadedState = loadState();

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     subjects: subjectsReducer,
//     documents: documentsReducer,
//     ui: uiReducer,
//   },
//   preloadedState,
// });

// store.subscribe(() => {
//   saveState(store.getState());
// });

// export default store;
