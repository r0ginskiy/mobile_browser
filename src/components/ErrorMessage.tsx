import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => (
  <div className={styles.container}>
    <p className={styles.message}>{message}</p>
    {onRetry && (
      <button className={styles.retryButton} onClick={onRetry}>
        Try Again
      </button>
    )}
  </div>
);
