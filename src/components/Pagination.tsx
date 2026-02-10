import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = React.memo(
  ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
      <div className={styles.container}>
        <button
          className={styles.button}
          disabled={!hasPrev}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className={styles.info}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.button}
          disabled={!hasNext}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  },
);

Pagination.displayName = 'Pagination';
