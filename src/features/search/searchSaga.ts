import { call, put, debounce } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { searchMovies } from '../../services/tmdbApi';
import { rateLimitedCall } from '../../services/rateLimiter';
import { setQuery, searchSuccess, searchFailure } from './searchSlice';
import { Movie } from '../movies/types';

function* searchWorker(action: PayloadAction<string>) {
  const query = action.payload;

  if (query.length < 2) {
    return;
  }

  try {
    const data: { movies: Movie[]; totalPages: number } = yield call(
      rateLimitedCall,
      searchMovies,
      query,
    );
    yield put(searchSuccess(data.movies));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Search failed';
    yield put(searchFailure(message));
  }
}

export function* watchSearch() {
  yield debounce(500, setQuery.type, searchWorker);
}
