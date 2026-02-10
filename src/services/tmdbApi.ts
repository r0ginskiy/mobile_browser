import { Movie, TMDBListResponse, TMDBMovie } from '../features/movies/types';
import { MovieDetails, TMDBMovieDetails } from '../features/movieDetails/types';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY || 'YOUR_API_KEY_HERE';
const TIMEOUT_MS = 8000;

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value),
  );

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

function mapMovie(raw: TMDBMovie): Movie {
  return {
    id: raw.id,
    title: raw.title ?? 'Untitled',
    posterPath: raw.poster_path ?? null,
    releaseDate: raw.release_date ?? '',
    voteAverage: raw.vote_average ?? 0,
    overview: raw.overview ?? '',
  };
}

function mapMovieDetails(raw: TMDBMovieDetails): MovieDetails {
  return {
    ...mapMovie(raw as TMDBMovie),
    genres: raw.genres ?? [],
    runtime: raw.runtime ?? null,
    tagline: raw.tagline ?? null,
    budget: raw.budget ?? 0,
    revenue: raw.revenue ?? 0,
  };
}

export async function fetchPopular(
  page: number,
): Promise<{ movies: Movie[]; totalPages: number }> {
  const data = await tmdbFetch<TMDBListResponse>('/movie/popular', {
    page: String(page),
  });
  return {
    movies: data.results.map(mapMovie),
    totalPages: data.total_pages,
  };
}

export async function fetchNowPlaying(
  page: number,
): Promise<{ movies: Movie[]; totalPages: number }> {
  const data = await tmdbFetch<TMDBListResponse>('/movie/now_playing', {
    page: String(page),
  });
  return {
    movies: data.results.map(mapMovie),
    totalPages: data.total_pages,
  };
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<{ movies: Movie[]; totalPages: number }> {
  const data = await tmdbFetch<TMDBListResponse>('/search/movie', {
    query,
    page: String(page),
  });
  return {
    movies: data.results.map(mapMovie),
    totalPages: data.total_pages,
  };
}

export async function fetchMovieById(id: number): Promise<MovieDetails> {
  const data = await tmdbFetch<TMDBMovieDetails>(`/movie/${id}`);
  return mapMovieDetails(data);
}
