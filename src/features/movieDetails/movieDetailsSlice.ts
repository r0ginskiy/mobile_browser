import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieDetails } from './types';

interface MovieDetailsState {
  data: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailsState = {
  data: null,
  loading: false,
  error: null,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    fetchDetailsRequest(state, _action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    fetchDetailsSuccess(state, action: PayloadAction<MovieDetails>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearDetails(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchDetailsRequest,
  fetchDetailsSuccess,
  fetchDetailsFailure,
  clearDetails,
} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
