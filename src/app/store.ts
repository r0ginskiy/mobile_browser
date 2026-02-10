import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import moviesReducer from '../features/movies/moviesSlice';
import searchReducer from '../features/search/searchSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import movieDetailsReducer from '../features/movieDetails/movieDetailsSlice';
import categoryTabsReducer from '../features/categoryTabs/categoryTabsSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    movieDetails: movieDetailsReducer,
    categoryTabs: categoryTabsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
