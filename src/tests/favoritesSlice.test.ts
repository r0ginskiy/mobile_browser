import favoritesReducer, {
  addFavorite,
  removeFavorite,
} from '../features/favorites/favoritesSlice';
import { Movie } from '../features/movies/types';

jest.mock('../features/favorites/favoritesService', () => ({
  loadFavorites: () => [],
  saveFavorites: jest.fn(),
}));

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  posterPath: '/test.jpg',
  releaseDate: '2024-01-01',
  voteAverage: 8.5,
  overview: 'A test movie',
};

const emptyState = { ids: [], movies: [] };

describe('favoritesSlice', () => {
  it('adds a movie to favorites', () => {
    const state = favoritesReducer(emptyState, addFavorite(mockMovie));

    expect(state.ids).toContain(1);
    expect(state.movies).toHaveLength(1);
    expect(state.movies[0].title).toBe('Test Movie');
  });

  it('does not add duplicate movies', () => {
    const stateWithMovie = favoritesReducer(emptyState, addFavorite(mockMovie));
    const state = favoritesReducer(stateWithMovie, addFavorite(mockMovie));

    expect(state.ids).toHaveLength(1);
    expect(state.movies).toHaveLength(1);
  });

  it('removes a movie from favorites', () => {
    const stateWithMovie = favoritesReducer(emptyState, addFavorite(mockMovie));
    const state = favoritesReducer(stateWithMovie, removeFavorite(1));

    expect(state.ids).toHaveLength(0);
    expect(state.movies).toHaveLength(0);
  });

  it('handles removing a non-existent movie', () => {
    const state = favoritesReducer(emptyState, removeFavorite(999));

    expect(state.ids).toHaveLength(0);
    expect(state.movies).toHaveLength(0);
  });
});
