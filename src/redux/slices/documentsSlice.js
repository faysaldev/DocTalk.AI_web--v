import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock initial data
const initialDocuments = {
  '1': [ // Subject ID
    {
      id: '101',
      name: 'Calculus Notes',
      fileType: 'PDF',
      fileSize: '2.4 MB',
      uploadDate: new Date('2023-10-15').toISOString()
    },
    {
      id: '102',
      name: 'Algebra Homework',
      fileType: 'DOCX',
      fileSize: '1.1 MB',
      uploadDate: new Date('2023-11-20').toISOString()
    },
    {
      id: '103',
      name: 'Statistics Textbook',
      fileType: 'PDF',
      fileSize: '8.7 MB',
      uploadDate: new Date('2023-12-05').toISOString()
    }
  ],
  '2': [ // Subject ID
    {
      id: '201',
      name: 'Programming Basics',
      fileType: 'PDF',
      fileSize: '3.2 MB',
      uploadDate: new Date('2023-09-10').toISOString()
    },
    {
      id: '202',
      name: 'Data Structures Notes',
      fileType: 'DOCX',
      fileSize: '0.9 MB',
      uploadDate: new Date('2023-10-25').toISOString()
    }
  ]
};

// Async thunks
export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return initialDocuments;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch documents');
    }
  }
);

export const uploadDocumentAsync = createAsyncThunk(
  'documents/uploadDocument',
  async ({ subjectId, file }, { rejectWithValue, dispatch }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new document
      const newDocument = {
        id: Date.now().toString(),
        name: file.name,
        fileType: file.name.split('.').pop().toUpperCase(),
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString()
      };
      
      return { subjectId, document: newDocument };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload document');
    }
  }
);

const initialState = {
  documents: {},
  loading: false,
  error: null,
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch documents
    builder.addCase(fetchDocuments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = action.payload;
    });
    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    
    // Upload document
    builder.addCase(uploadDocumentAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadDocumentAsync.fulfilled, (state, action) => {
      state.loading = false;
      const { subjectId, document } = action.payload;
      
      if (!state.documents[subjectId]) {
        state.documents[subjectId] = [];
      }
      
      state.documents[subjectId].push(document);
    });
    builder.addCase(uploadDocumentAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default documentsSlice.reducer;