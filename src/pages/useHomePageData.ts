import { useEffect, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchPopularRequest,
  fetchNowPlayingRequest,
} from '../features/movies/moviesSlice';
import { Movie } from '../features/movies/types';

export function useHomePageData() {
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

  const movies: Movie[] = useMemo(() => {
    if (isSearchActive) return search.results;
    if (activeTab === 'favorites') return favorites;
    return currentList.items;
  }, [isSearchActive, search.results, activeTab, favorites, currentList.items]);

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

  const showPagination =
    !isSearchActive && activeTab !== 'favorites' && !loading && !error;

  return {
    movies,
    loading,
    error,
    currentPage: currentList.page,
    totalPages: currentList.totalPages,
    showPagination,
    handlePageChange,
    handleRetry,
  };
}
