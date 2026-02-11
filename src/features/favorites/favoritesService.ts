import { Movie } from '../movies/types';

const STORAGE_KEY = 'movie_browser_favorites';

export function loadFavorites(): Movie[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Failed to load favorites from localStorage:', error);
    return [];
  }
}

export function saveFavorites(movies: Movie[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.warn('Failed to save favorites to localStorage:', error);
  }
}
