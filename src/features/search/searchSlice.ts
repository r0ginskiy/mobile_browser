import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../movies/types';

interface SearchState {
  query: string;
  results: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      if (action.payload.length < 2) {
        state.results = [];
        state.loading = false;
      } else {
        state.loading = true;
      }
      state.error = null;
    },
    searchSuccess(state, action: PayloadAction<Movie[]>) {
      state.results = action.payload;
      state.loading = false;
    },
    searchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearSearch(state) {
      state.query = '';
      state.results = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setQuery, searchSuccess, searchFailure, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
