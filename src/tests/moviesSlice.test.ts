import moviesReducer, {
  fetchPopularRequest,
  fetchPopularSuccess,
  fetchPopularFailure,
  fetchNowPlayingRequest,
  fetchNowPlayingSuccess,
  fetchNowPlayingFailure,
} from '../features/movies/moviesSlice';
import { Movie } from '../features/movies/types';

const initialState = {
  popular: {
    items: [] as Movie[],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null as string | null,
  },
  nowPlaying: {
    items: [] as Movie[],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null as string | null,
  },
};

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie',
    posterPath: '/test.jpg',
    releaseDate: '2024-01-01',
    voteAverage: 8.5,
    overview: 'A test movie',
  },
];

describe('moviesSlice', () => {
  describe('popular', () => {
    it('sets loading on fetchPopularRequest', () => {
      const state = moviesReducer(initialState, fetchPopularRequest(2));

      expect(state.popular.loading).toBe(true);
      expect(state.popular.error).toBeNull();
      expect(state.popular.page).toBe(2);
    });

    it('sets movies on fetchPopularSuccess', () => {
      const loadingState = {
        ...initialState,
        popular: { ...initialState.popular, loading: true },
      };
      const state = moviesReducer(
        loadingState,
        fetchPopularSuccess({ movies: mockMovies, totalPages: 10 }),
      );

      expect(state.popular.items).toEqual(mockMovies);
      expect(state.popular.totalPages).toBe(10);
      expect(state.popular.loading).toBe(false);
    });

    it('sets error on fetchPopularFailure', () => {
      const loadingState = {
        ...initialState,
        popular: { ...initialState.popular, loading: true },
      };
      const state = moviesReducer(
        loadingState,
        fetchPopularFailure('Network error'),
      );

      expect(state.popular.error).toBe('Network error');
      expect(state.popular.loading).toBe(false);
    });
  });

  describe('nowPlaying', () => {
    it('sets loading on fetchNowPlayingRequest', () => {
      const state = moviesReducer(initialState, fetchNowPlayingRequest(1));

      expect(state.nowPlaying.loading).toBe(true);
      expect(state.nowPlaying.error).toBeNull();
    });

    it('sets movies on fetchNowPlayingSuccess', () => {
      const loadingState = {
        ...initialState,
        nowPlaying: { ...initialState.nowPlaying, loading: true },
      };
      const state = moviesReducer(
        loadingState,
        fetchNowPlayingSuccess({ movies: mockMovies, totalPages: 5 }),
      );

      expect(state.nowPlaying.items).toEqual(mockMovies);
      expect(state.nowPlaying.totalPages).toBe(5);
      expect(state.nowPlaying.loading).toBe(false);
    });

    it('sets error on fetchNowPlayingFailure', () => {
      const loadingState = {
        ...initialState,
        nowPlaying: { ...initialState.nowPlaying, loading: true },
      };
      const state = moviesReducer(
        loadingState,
        fetchNowPlayingFailure('Timeout'),
      );

      expect(state.nowPlaying.error).toBe('Timeout');
      expect(state.nowPlaying.loading).toBe(false);
    });
  });
});
