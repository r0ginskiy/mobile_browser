import searchReducer, {
  setQuery,
  searchSuccess,
  searchFailure,
  clearSearch,
} from '../features/search/searchSlice';
import { Movie } from '../features/movies/types';

const initialState = {
  query: '',
  results: [] as Movie[],
  loading: false,
  error: null as string | null,
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

describe('searchSlice', () => {
  it('sets query and starts loading when query >= 2 chars', () => {
    const state = searchReducer(initialState, setQuery('ab'));

    expect(state.query).toBe('ab');
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('clears results when query < 2 chars', () => {
    const stateWithResults = {
      ...initialState,
      query: 'abc',
      results: mockMovies,
      loading: true,
    };
    const state = searchReducer(stateWithResults, setQuery('a'));

    expect(state.query).toBe('a');
    expect(state.results).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it('handles search success', () => {
    const loadingState = { ...initialState, query: 'test', loading: true };
    const state = searchReducer(loadingState, searchSuccess(mockMovies));

    expect(state.results).toEqual(mockMovies);
    expect(state.loading).toBe(false);
  });

  it('handles search failure', () => {
    const loadingState = { ...initialState, query: 'test', loading: true };
    const state = searchReducer(loadingState, searchFailure('Network error'));

    expect(state.error).toBe('Network error');
    expect(state.loading).toBe(false);
  });

  it('clears search state', () => {
    const activeState = {
      query: 'test',
      results: mockMovies,
      loading: false,
      error: null,
    };
    const state = searchReducer(activeState, clearSearch());

    expect(state.query).toBe('');
    expect(state.results).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
