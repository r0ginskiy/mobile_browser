# Movie Browser

A React application for browsing movies using [The Movie Database (TMDB)](https://www.themoviedb.org/) API. Supports browsing popular and now-playing movies, search with debounce, favorites with localStorage persistence, and full keyboard navigation.

## Features

- **Movie Browsing** — Popular and Now Playing categories with pagination
- **Search** — Real-time search with 500ms debounce (min 2 characters)
- **Favorites** — Add/remove movies, persisted in localStorage
- **Movie Details** — Full info: tagline, genres, runtime, budget, revenue
- **Category Tabs** — Switch between Popular, Airing Now, and My Favorites with data prefetch on focus
- **Keyboard Navigation** — Arrow keys to navigate, Enter to open, Escape to go back; Tab and mouse scroll disabled for keyboard-first UX
- **Rate Limiting** — Token bucket algorithm (5 requests per 10 seconds)

## Tech Stack

- React 19, TypeScript
- Redux Toolkit + Redux Saga
- React Router v7
- Create React App

## Getting Started

### Prerequisites

- Node.js 16+
- TMDB API key ([get one here](https://www.themoviedb.org/settings/api))

### Installation

```bash
npm install
```

Create a `.env` file in the project root:

```
REACT_APP_TMDB_API_KEY=your_api_key_here
```

### Running

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in the browser.

### Testing

```bash
npm test
```

### Production Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/                  # Redux store, hooks, root saga
├── components/           # Reusable UI (Layout, Pagination, Spinner, ErrorMessage, ErrorBoundary)
├── features/
│   ├── categoryTabs/     # Category tab navigation
│   ├── movies/           # Movie list (slice, saga, MovieCard, MovieGrid)
│   ├── search/           # Search (slice, saga, SearchInput)
│   ├── movieDetails/     # Movie detail page (slice, saga)
│   └── favorites/        # Favorites (slice, localStorage service)
├── hooks/                # Custom hooks (keyboard navigation, escape back, etc.)
├── pages/                # HomePage, MoviePage
├── services/             # TMDB API client, rate limiter
└── tests/                # Unit tests
```

## Architecture

**Data flow:** Component dispatches action -> Redux Saga intercepts -> calls TMDB API via rate-limited wrapper -> dispatches success/failure -> reducer updates store -> component re-renders.

**Routing:**
- `/` — Home page (categories, search, movie grid)
- `/movie/:id` — Movie details page
