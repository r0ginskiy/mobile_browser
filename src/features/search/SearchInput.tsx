import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, clearSearch } from './searchSlice';
import styles from './SearchInput.module.css';

export const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.search.query);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setQuery(e.target.value));
    },
    [dispatch],
  );

  const handleClear = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        dispatch(clearSearch());
        (e.target as HTMLInputElement).blur();
      }
    },
    [dispatch],
  );

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {query && (
        <button className={styles.clearButton} onClick={handleClear}>
          &times;
        </button>
      )}
    </div>
  );
};
