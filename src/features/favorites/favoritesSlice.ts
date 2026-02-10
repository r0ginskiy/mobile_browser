import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../movies/types';
import { loadFavorites, saveFavorites } from './favoritesService';

interface FavoritesState {
  ids: number[];
  movies: Movie[];
}

const persisted = loadFavorites();

const initialState: FavoritesState = {
  ids: persisted.map((m) => m.id),
  movies: persisted,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Movie>) {
      if (!state.ids.includes(action.payload.id)) {
        state.ids.push(action.payload.id);
        state.movies.push(action.payload);
        saveFavorites(state.movies);
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
      state.movies = state.movies.filter((m) => m.id !== action.payload);
      saveFavorites(state.movies);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
