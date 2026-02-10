import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieListState } from './types';

const initialListState: MovieListState = {
  items: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

interface MoviesState {
  popular: MovieListState;
  nowPlaying: MovieListState;
}

const initialState: MoviesState = {
  popular: { ...initialListState },
  nowPlaying: { ...initialListState },
};

interface FetchSuccessPayload {
  movies: Movie[];
  totalPages: number;
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchPopularRequest(state, action: PayloadAction<number>) {
      state.popular.loading = true;
      state.popular.error = null;
      state.popular.page = action.payload;
    },
    fetchPopularSuccess(state, action: PayloadAction<FetchSuccessPayload>) {
      state.popular.items = action.payload.movies;
      state.popular.totalPages = action.payload.totalPages;
      state.popular.loading = false;
    },
    fetchPopularFailure(state, action: PayloadAction<string>) {
      state.popular.loading = false;
      state.popular.error = action.payload;
    },

    fetchNowPlayingRequest(state, action: PayloadAction<number>) {
      state.nowPlaying.loading = true;
      state.nowPlaying.error = null;
      state.nowPlaying.page = action.payload;
    },
    fetchNowPlayingSuccess(
      state,
      action: PayloadAction<FetchSuccessPayload>,
    ) {
      state.nowPlaying.items = action.payload.movies;
      state.nowPlaying.totalPages = action.payload.totalPages;
      state.nowPlaying.loading = false;
    },
    fetchNowPlayingFailure(state, action: PayloadAction<string>) {
      state.nowPlaying.loading = false;
      state.nowPlaying.error = action.payload;
    },
  },
});

export const {
  fetchPopularRequest,
  fetchPopularSuccess,
  fetchPopularFailure,
  fetchNowPlayingRequest,
  fetchNowPlayingSuccess,
  fetchNowPlayingFailure,
} = moviesSlice.actions;

export default moviesSlice.reducer;
