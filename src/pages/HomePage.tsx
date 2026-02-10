import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPopularRequest } from '../features/movies/moviesSlice';
import { fetchNowPlayingRequest } from '../features/movies/moviesSlice';
import { CategoryTabs } from '../features/categoryTabs/CategoryTabs';
import { SearchInput } from '../features/search/SearchInput';
import { MovieGrid } from '../features/movies/MovieGrid';
import { Pagination } from '../components/Pagination';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.categoryTabs.activeTab);
  const popular = useAppSelector((state) => state.movies.popular);
  const nowPlaying = useAppSelector((state) => state.movies.nowPlaying);
  const search = useAppSelector((state) => state.search);
  const favorites = useAppSelector((state) => state.favorites.movies);

  useEffect(() => {
    if (popular.items.length === 0) {
      dispatch(fetchPopularRequest(1));
    }
  }, [dispatch, popular.items.length]);

  const isSearchActive = search.query.length >= 2;

  const currentList = activeTab === 'popular' ? popular : nowPlaying;
  const loading = isSearchActive ? search.loading : currentList.loading;
  const error = isSearchActive ? search.error : currentList.error;

  const handlePageChange = useCallback(
    (page: number) => {
      if (activeTab === 'popular') {
        dispatch(fetchPopularRequest(page));
      } else if (activeTab === 'nowPlaying') {
        dispatch(fetchNowPlayingRequest(page));
      }
    },
    [dispatch, activeTab],
  );

  const handleRetry = useCallback(() => {
    if (activeTab === 'popular') {
      dispatch(fetchPopularRequest(popular.page));
    } else if (activeTab === 'nowPlaying') {
      dispatch(fetchNowPlayingRequest(nowPlaying.page));
    }
  }, [dispatch, activeTab, popular.page, nowPlaying.page]);

  const getMovies = () => {
    if (isSearchActive) return search.results;
    if (activeTab === 'favorites') return favorites;
    return currentList.items;
  };

  const showPagination =
    !isSearchActive && activeTab !== 'favorites' && !loading && !error;

  return (
    <div>
      <div className={styles.toolbar}>
        <CategoryTabs />
        <SearchInput />
      </div>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      {!loading && !error && (
        <>
          <MovieGrid movies={getMovies()} />
          {showPagination && (
            <Pagination
              currentPage={currentList.page}
              totalPages={currentList.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
