import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock initial data
const initialSubjects = [
  {
    id: '1',
    name: 'Mathematics',
    color: 'bg-blue-500',
    documentCount: 3,
    createdAt: new Date('2023-05-15').toISOString()
  },
  {
    id: '2',
    name: 'Computer Science',
    color: 'bg-purple-500',
    documentCount: 2,
    createdAt: new Date('2023-06-20').toISOString()
  }
];

// Async thunks
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchSubjects',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return initialSubjects;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch subjects');
    }
  }
);

export const addSubjectAsync = createAsyncThunk(
  'subjects/addSubject',
  async (name, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const colors = [
        'bg-blue-500', 'bg-purple-500', 'bg-green-500', 
        'bg-red-500', 'bg-yellow-500', 'bg-indigo-500'
      ];
      
      // Create new subject
      const newSubject = {
        id: Date.now().toString(),
        name,
        color: colors[Math.floor(Math.random() * colors.length)],
        documentCount: 0,
        createdAt: new Date().toISOString()
      };
      
      return newSubject;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add subject');
    }
  }
);

const initialState = {
  subjects: [],
  loading: false,
  error: null,
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch subjects
    builder.addCase(fetchSubjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSubjects.fulfilled, (state, action) => {
      state.loading = false;
      state.subjects = action.payload;
    });
    builder.addCase(fetchSubjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    
    // Add subject
    builder.addCase(addSubjectAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addSubjectAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.subjects.push(action.payload);
    });
    builder.addCase(addSubjectAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default subjectsSlice.reducer;