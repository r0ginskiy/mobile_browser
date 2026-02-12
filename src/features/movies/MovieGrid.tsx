import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from './types';
import { MovieCard } from './MovieCard';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  keyboardEnabled?: boolean;
  onLeaveUp?: () => void;
  onLeaveDown?: () => void;
}

const COLUMNS_PER_ROW = 4;

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  keyboardEnabled = true,
  onLeaveUp,
  onLeaveDown,
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

  const { focusedIndex, containerRef } = useKeyboardNavigation({
    totalItems: movies.length,
    columnsPerRow: COLUMNS_PER_ROW,
    onSelect: handleSelect,
    onLeaveUp,
    onLeaveDown,
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
          isFocused={keyboardEnabled && index === focusedIndex}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />
      ))}
    </div>
  );
};
