import React, { useState, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { TabType, setActiveTab } from '../features/categoryTabs/categoryTabsSlice';
import {
  fetchPopularRequest,
  fetchNowPlayingRequest,
} from '../features/movies/moviesSlice';
import { clearSearch } from '../features/search/searchSlice';
import { CategoryTabs } from '../features/categoryTabs/CategoryTabs';
import { SearchInput } from '../features/search/SearchInput';
import { MovieGrid } from '../features/movies/MovieGrid';
import { Pagination } from '../components/Pagination';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useHomePageData } from './useHomePageData';
import styles from './HomePage.module.css';

const TOOLBAR_COUNT = 4; // 3 tabs (0-2) + search (3)
const TAB_KEYS: TabType[] = ['popular', 'nowPlaying', 'favorites'];

export const HomePage: React.FC = () => {
  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    showPagination,
    handlePageChange,
    handleRetry,
  } = useHomePageData();

  const dispatch = useAppDispatch();
  const [focusZone, setFocusZone] = useState<'toolbar' | 'grid'>('grid');
  const [toolbarIndex, setToolbarIndex] = useState(0);

  const goToToolbar = useCallback(() => setFocusZone('toolbar'), []);
  const goToGrid = useCallback(() => setFocusZone('grid'), []);

  // Toolbar keyboard navigation
  useEffect(() => {
    if (focusZone !== 'toolbar') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setToolbarIndex((prev) => Math.min(prev + 1, TOOLBAR_COUNT - 1));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setToolbarIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusZone('grid');
          break;
        case 'Enter':
          if (toolbarIndex <= 2) {
            e.preventDefault();
            const tabKey = TAB_KEYS[toolbarIndex];
            dispatch(setActiveTab(tabKey));
            if (tabKey === 'popular') dispatch(fetchPopularRequest(1));
            else if (tabKey === 'nowPlaying')
              dispatch(fetchNowPlayingRequest(1));
          }
          break;
        case 'Escape':
          e.preventDefault();
          dispatch(clearSearch());
          setFocusZone('grid');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusZone, toolbarIndex, dispatch]);

  return (
    <div>
      <div className={styles.toolbar}>
        <CategoryTabs
          focusedTabIndex={
            focusZone === 'toolbar' && toolbarIndex <= 2
              ? toolbarIndex
              : null
          }
        />
        <SearchInput focused={focusZone === 'toolbar' && toolbarIndex === 3} />
      </div>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      {!loading && !error && (
        <>
          <MovieGrid
            movies={movies}
            keyboardEnabled={focusZone === 'grid'}
            onLeaveUp={goToToolbar}
          />
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
