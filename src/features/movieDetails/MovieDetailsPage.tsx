import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../services/tmdbApi';
import { Spinner } from '../../components/Spinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useMovieDetails } from './useMovieDetails';
import { useToggleFavorite } from '../favorites/useToggleFavorite';
import styles from './MovieDetailsPage.module.css';

type FocusTarget = 'back' | 'favorite';

export const MovieDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { movie, loading, error, movieId, handleRetry } = useMovieDetails();
  const { isFavorite, toggleFavorite } = useToggleFavorite(movieId, movie);
  const [focusedButton, setFocusedButton] = useState<FocusTarget>('favorite');

  const goBack = useCallback(() => navigate('/'), [navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setFocusedButton('back');
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedButton('favorite');
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedButton === 'back') {
            goBack();
          } else {
            toggleFavorite();
          }
          break;
        case 'Escape':
          e.preventDefault();
          goBack();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedButton, goBack, toggleFavorite]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={handleRetry} />;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.backButton} ${focusedButton === 'back' ? styles.focusedButton : ''}`}
        onClick={goBack}
      >
        &larr; Back
      </button>

      <div className={styles.content}>
        <div className={styles.posterSection}>
          {movie.posterPath ? (
            <img
              className={styles.poster}
              src={`${IMAGE_BASE_URL}${movie.posterPath}`}
              alt={movie.title}
            />
          ) : (
            <div className={styles.noPoster}>No Image</div>
          )}
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{movie.title}</h1>

          {movie.tagline && (
            <p className={styles.tagline}>{movie.tagline}</p>
          )}

          <div className={styles.metaRow}>
            <span className={styles.rating}>
              {movie.voteAverage.toFixed(1)}
            </span>
            {movie.releaseDate && <span>{movie.releaseDate}</span>}
            {movie.runtime && <span>{movie.runtime} min</span>}
          </div>

          {movie.genres.length > 0 && (
            <div className={styles.genres}>
              {movie.genres.map((genre) => (
                <span key={genre.id} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className={styles.overview}>{movie.overview}</p>

          <button
            className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''} ${focusedButton === 'favorite' ? styles.focusedButton : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <div className={styles.stats}>
            {movie.budget > 0 && (
              <div className={styles.stat}>
                <span className={styles.statLabel}>Budget</span>
                <span>${movie.budget.toLocaleString()}</span>
              </div>
            )}
            {movie.revenue > 0 && (
              <div className={styles.stat}>
                <span className={styles.statLabel}>Revenue</span>
                <span>${movie.revenue.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
