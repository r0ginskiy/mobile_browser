import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchDetailsRequest, clearDetails } from './movieDetailsSlice';

export function useMovieDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { data: movie, loading, error } = useAppSelector(
    (state) => state.movieDetails,
  );

  const movieId = Number(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailsRequest(movieId));
    }
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id, movieId]);

  const handleRetry = useCallback(() => {
    dispatch(fetchDetailsRequest(movieId));
  }, [dispatch, movieId]);

  return { movie, loading, error, movieId, handleRetry };
}
