import React, { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, clearSearch } from './searchSlice';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  focused?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  focused = false,
}) => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.search.query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    } else if (!focused && inputRef.current) {
      inputRef.current.blur();
    }
  }, [focused]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setQuery(e.target.value));
    },
    [dispatch],
  );

  const handleClear = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button className={styles.clearButton} onClick={handleClear}>
          &times;
        </button>
      )}
    </div>
  );
};
