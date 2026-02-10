import { Movie } from '../movies/types';

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  tagline: string | null;
  budget: number;
  revenue: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBMovieDetails {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  overview?: string;
  genres?: Genre[];
  runtime?: number | null;
  tagline?: string | null;
  budget?: number;
  revenue?: number;
}
