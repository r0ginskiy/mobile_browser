import React, { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TabType, setActiveTab } from './categoryTabsSlice';
import { fetchPopularRequest, fetchNowPlayingRequest } from '../movies/moviesSlice';
import { useCategoryTabFetch } from './useCategoryTabFetch';
import styles from './CategoryTabs.module.css';

const TABS: { key: TabType; label: string }[] = [
  { key: 'popular', label: 'Popular' },
  { key: 'nowPlaying', label: 'Airing Now' },
  { key: 'favorites', label: 'My Favorites' },
];

interface CategoryTabsProps {
  focusedTabIndex?: number | null;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  focusedTabIndex = null,
}) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.categoryTabs.activeTab);
  const prevFocusedIndexRef = useRef<number | null>(null);

  const selectAndFetchPopular = useCallback(() => {
    dispatch(setActiveTab('popular'));
    dispatch(fetchPopularRequest(1));
  }, [dispatch]);

  const selectAndFetchNowPlaying = useCallback(() => {
    dispatch(setActiveTab('nowPlaying'));
    dispatch(fetchNowPlayingRequest(1));
  }, [dispatch]);

  const selectFavorites = useCallback(() => {
    dispatch(setActiveTab('favorites'));
  }, [dispatch]);

  const popularTab = useCategoryTabFetch(selectAndFetchPopular);
  const nowPlayingTab = useCategoryTabFetch(selectAndFetchNowPlaying);
  const favoritesTab = useCategoryTabFetch(selectFavorites);

  const handlersRef = useRef([popularTab, nowPlayingTab, favoritesTab]);
  handlersRef.current = [popularTab, nowPlayingTab, favoritesTab];

  // Trigger prefetch when keyboard focus lands on a tab
  useEffect(() => {
    const handlers = handlersRef.current;

    if (focusedTabIndex === null) {
      if (prevFocusedIndexRef.current !== null) {
        handlers[prevFocusedIndexRef.current].onBlur();
        prevFocusedIndexRef.current = null;
      }
      return;
    }

    if (prevFocusedIndexRef.current !== null && prevFocusedIndexRef.current !== focusedTabIndex) {
      handlers[prevFocusedIndexRef.current].onBlur();
    }

    handlers[focusedTabIndex].onFocus();
    prevFocusedIndexRef.current = focusedTabIndex;
  }, [focusedTabIndex]);

  const handleClick = (index: number) => {
    handlersRef.current[index].onClick();
  };

  return (
    <div className={styles.tabs}>
      {TABS.map(({ key, label }, index) => (
        <button
          key={key}
          className={`${styles.tab} ${activeTab === key ? styles.active : ''} ${focusedTabIndex === index ? styles.focused : ''}`}
          onClick={() => handleClick(index)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
