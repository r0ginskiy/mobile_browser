export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  voteAverage: number;
  overview: string;
}

export interface MovieListState {
  items: Movie[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export interface TMDBListResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  overview?: string;
}
