import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addFavorite, removeFavorite } from './favoritesSlice';
import { MovieDetails } from '../movieDetails/types';

export function useToggleFavorite(movieId: number, movie: MovieDetails | null) {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(movieId);

  const toggleFavorite = useCallback(() => {
    if (!movie) return;

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(
        addFavorite({
          id: movie.id,
          title: movie.title,
          posterPath: movie.posterPath,
          releaseDate: movie.releaseDate,
          voteAverage: movie.voteAverage,
          overview: movie.overview,
        }),
      );
    }
  }, [dispatch, movie, isFavorite]);

  return { isFavorite, toggleFavorite };
}
