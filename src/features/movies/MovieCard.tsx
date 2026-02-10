import React from 'react';
import { Movie } from './types';
import { IMAGE_BASE_URL } from '../../services/tmdbApi';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  isFocused: boolean;
  onClick: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = React.memo(
  ({ movie, isFocused, onClick }) => {
    const cardClassName = `${styles.card} ${isFocused ? styles.focused : ''}`;

    return (
      <div className={cardClassName} onClick={onClick}>
        {movie.posterPath ? (
          <img
            className={styles.poster}
            src={`${IMAGE_BASE_URL}${movie.posterPath}`}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className={styles.noPoster}>No Image</div>
        )}
        <div className={styles.info}>
          <h3 className={styles.title}>{movie.title}</h3>
          <div className={styles.meta}>
            <span className={styles.rating}>
              {movie.voteAverage.toFixed(1)}
            </span>
            {movie.releaseDate && (
              <span className={styles.year}>
                {movie.releaseDate.slice(0, 4)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  },
);

MovieCard.displayName = 'MovieCard';
