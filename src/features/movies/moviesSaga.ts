import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchPopular, fetchNowPlaying } from '../../services/tmdbApi';
import { rateLimitedCall } from '../../services/rateLimiter';
import {
  fetchPopularRequest,
  fetchPopularSuccess,
  fetchPopularFailure,
  fetchNowPlayingRequest,
  fetchNowPlayingSuccess,
  fetchNowPlayingFailure,
} from './moviesSlice';
import { Movie } from './types';

function* fetchPopularWorker(action: PayloadAction<number>) {
  try {
    const data: { movies: Movie[]; totalPages: number } = yield call(
      rateLimitedCall,
      fetchPopular,
      action.payload,
    );
    yield put(fetchPopularSuccess(data));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch popular movies';
    yield put(fetchPopularFailure(message));
  }
}

function* fetchNowPlayingWorker(action: PayloadAction<number>) {
  try {
    const data: { movies: Movie[]; totalPages: number } = yield call(
      rateLimitedCall,
      fetchNowPlaying,
      action.payload,
    );
    yield put(fetchNowPlayingSuccess(data));
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to fetch now playing movies';
    yield put(fetchNowPlayingFailure(message));
  }
}

export function* watchMovies() {
  yield takeLatest(fetchPopularRequest.type, fetchPopularWorker);
  yield takeLatest(fetchNowPlayingRequest.type, fetchNowPlayingWorker);
}
