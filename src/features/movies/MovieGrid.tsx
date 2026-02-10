import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from './types';
import { MovieCard } from './MovieCard';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  keyboardEnabled?: boolean;
}

const COLUMNS_PER_ROW = 4;

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  keyboardEnabled = true,
}) => {
  const navigate = useNavigate();

  const handleSelect = useCallback(
    (index: number) => {
      const movie = movies[index];
      if (movie) {
        navigate(`/movie/${movie.id}`);
      }
    },
    [movies, navigate],
  );

  const handleEscape = useCallback(() => {}, []);

  const { focusedIndex, containerRef } = useKeyboardNavigation({
    totalItems: movies.length,
    columnsPerRow: COLUMNS_PER_ROW,
    onSelect: handleSelect,
    onEscape: handleEscape,
    enabled: keyboardEnabled,
  });

  if (movies.length === 0) {
    return <p className={styles.empty}>No movies found.</p>;
  }

  return (
    <div className={styles.grid} ref={containerRef}>
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFocused={index === focusedIndex}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />
      ))}
    </div>
  );
};
