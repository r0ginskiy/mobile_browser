import { all, fork } from 'redux-saga/effects';
import { watchMovies } from '../features/movies/moviesSaga';
import { watchSearch } from '../features/search/searchSaga';
import { watchMovieDetails } from '../features/movieDetails/movieDetailsSaga';

export default function* rootSaga() {
  yield all([fork(watchMovies), fork(watchSearch), fork(watchMovieDetails)]);
}
