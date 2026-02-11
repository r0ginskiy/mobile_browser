import React from 'react';
import { CategoryTabs } from '../features/categoryTabs/CategoryTabs';
import { SearchInput } from '../features/search/SearchInput';
import { MovieGrid } from '../features/movies/MovieGrid';
import { Pagination } from '../components/Pagination';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useHomePageData } from './useHomePageData';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const {
    movies,
    loading,
    error,
    currentPage,
    totalPages,
    showPagination,
    handlePageChange,
    handleRetry,
  } = useHomePageData();

  return (
    <div>
      <div className={styles.toolbar}>
        <CategoryTabs />
        <SearchInput />
      </div>

      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      {!loading && !error && (
        <>
          <MovieGrid movies={movies} />
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
