import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TabType, setActiveTab } from './categoryTabsSlice';
import { fetchPopularRequest } from '../movies/moviesSlice';
import { fetchNowPlayingRequest } from '../movies/moviesSlice';
import { useCategoryTabFetch } from './useCategoryTabFetch';
import styles from './CategoryTabs.module.css';

const TABS: { key: TabType; label: string }[] = [
  { key: 'popular', label: 'Popular' },
  { key: 'nowPlaying', label: 'Airing Now' },
  { key: 'favorites', label: 'My Favorites' },
];

export const CategoryTabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.categoryTabs.activeTab);

  const fetchPopular = useCallback(
    () => dispatch(fetchPopularRequest(1)),
    [dispatch],
  );
  const fetchNowPlaying = useCallback(
    () => dispatch(fetchNowPlayingRequest(1)),
    [dispatch],
  );

  const popularTab = useCategoryTabFetch(fetchPopular);
  const nowPlayingTab = useCategoryTabFetch(fetchNowPlaying);

  const tabHandlers: Record<
    TabType,
    { onFocus: () => void; onBlur: () => void; onClick: () => void }
  > = {
    popular: popularTab,
    nowPlaying: nowPlayingTab,
    favorites: {
      onFocus: () => {},
      onBlur: () => {},
      onClick: () => {},
    },
  };

  const handleClick = (tab: TabType) => {
    dispatch(setActiveTab(tab));
    tabHandlers[tab].onClick();
  };

  const handleFocus = (tab: TabType) => {
    tabHandlers[tab].onFocus();
  };

  const handleBlur = (tab: TabType) => {
    tabHandlers[tab].onBlur();
  };

  return (
    <div className={styles.tabs}>
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          className={`${styles.tab} ${activeTab === key ? styles.active : ''}`}
          onClick={() => handleClick(key)}
          onFocus={() => handleFocus(key)}
          onBlur={() => handleBlur(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
