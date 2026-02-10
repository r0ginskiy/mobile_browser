import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchMovieById } from '../../services/tmdbApi';
import { rateLimitedCall } from '../../services/rateLimiter';
import {
  fetchDetailsRequest,
  fetchDetailsSuccess,
  fetchDetailsFailure,
} from './movieDetailsSlice';
import { MovieDetails } from './types';

function* fetchDetailsWorker(action: PayloadAction<number>) {
  try {
    const data: MovieDetails = yield call(
      rateLimitedCall,
      fetchMovieById,
      action.payload,
    );
    yield put(fetchDetailsSuccess(data));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to load movie details';
    yield put(fetchDetailsFailure(message));
  }
}

export function* watchMovieDetails() {
  yield takeLatest(fetchDetailsRequest.type, fetchDetailsWorker);
}
