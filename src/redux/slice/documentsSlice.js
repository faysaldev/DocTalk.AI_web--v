import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: {},
  loading: false,
  error: null,
  selectedDocument: null,
  documentStats: {
    totalDocuments: 0,
    totalSize: 0,
    totalSubjects: 0,
  },
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    addDocument: (state, action) => {
      const { subjectId, document } = action.payload;
      if (!state.documents[subjectId]) {
        state.documents[subjectId] = [];
      }
      state.documents[subjectId].push(document);
    },
    removeDocument: (state, action) => {
      const { subjectId, documentId } = action.payload;
      if (state.documents[subjectId]) {
        state.documents[subjectId] = state.documents[subjectId].filter(
          (doc) => doc.id !== documentId
        );
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
    updateDocumentStats: (state, action) => {
      state.documentStats = action.payload;
    },
    clearDocuments: (state) => {
      state.documents = {};
      state.selectedDocument = null;
    },
  },
});

export const {
  setDocuments,
  addDocument,
  removeDocument,
  setLoading,
  setError,
  setSelectedDocument,
  updateDocumentStats,
  clearDocuments,
} = documentsSlice.actions;

export const selectAllDocuments = (state) => state.documents.documents;
export const selectDocumentsBySubject = (state, subjectId) =>
  state.documents.documents[subjectId] || [];
export const selectDocumentsLoading = (state) => state.documents.loading;
export const selectDocumentsError = (state) => state.documents.error;
export const selectSelectedDocument = (state) =>
  state.documents.selectedDocument;
export const selectDocumentStats = (state) => state.documents.documentStats;

export default documentsSlice.reducer;
