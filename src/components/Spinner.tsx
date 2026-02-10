import React from 'react';
import styles from './Spinner.module.css';

export const Spinner: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.spinner} />
  </div>
);
