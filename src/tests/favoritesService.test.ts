import { loadFavorites, saveFavorites } from '../features/favorites/favoritesService';
import { Movie } from '../features/movies/types';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  posterPath: '/test.jpg',
  releaseDate: '2024-01-01',
  voteAverage: 8.5,
  overview: 'A test movie',
};

describe('favoritesService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('loadFavorites', () => {
    it('returns empty array when nothing is stored', () => {
      expect(loadFavorites()).toEqual([]);
    });

    it('returns stored favorites', () => {
      localStorage.setItem(
        'movie_browser_favorites',
        JSON.stringify([mockMovie]),
      );

      expect(loadFavorites()).toEqual([mockMovie]);
    });

    it('returns empty array on invalid JSON', () => {
      localStorage.setItem('movie_browser_favorites', 'invalid json');

      expect(loadFavorites()).toEqual([]);
    });
  });

  describe('saveFavorites', () => {
    it('saves movies to localStorage', () => {
      saveFavorites([mockMovie]);

      const stored = JSON.parse(
        localStorage.getItem('movie_browser_favorites')!,
      );
      expect(stored).toEqual([mockMovie]);
    });

    it('saves empty array', () => {
      saveFavorites([]);

      const stored = JSON.parse(
        localStorage.getItem('movie_browser_favorites')!,
      );
      expect(stored).toEqual([]);
    });
  });
});
