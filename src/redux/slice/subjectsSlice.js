import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
  loading: false,
  error: null,
  selectedSubject: null,
  subjectStats: {
    totalSubjects: 0,
    documentsPerSubject: {},
  },
};

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    addSubject: (state, action) => {
      state.subjects.push(action.payload);
    },
    removeSubject: (state, action) => {
      state.subjects = state.subjects.filter(
        (subject) => subject.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
    updateSubjectStats: (state, action) => {
      state.subjectStats = action.payload;
    },
    clearSubjects: (state) => {
      state.subjects = [];
      state.selectedSubject = null;
    },
  },
});

export const {
  setSubjects,
  addSubject,
  removeSubject,
  setLoading,
  setError,
  setSelectedSubject,
  updateSubjectStats,
  clearSubjects,
} = subjectsSlice.actions;

export const selectAllSubjects = (state) => state.subjects.subjects;
export const selectSubjectsLoading = (state) => state.subjects.loading;
export const selectSubjectsError = (state) => state.subjects.error;
export const selectSelectedSubject = (state) => state.subjects.selectedSubject;
export const selectSubjectStats = (state) => state.subjects.subjectStats;

export default subjectsSlice.reducer;
