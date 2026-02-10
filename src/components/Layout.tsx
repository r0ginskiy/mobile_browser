import React, { ReactNode } from 'react';
import { useDisableTab } from '../hooks/useDisableTab';
import { useDisableScroll } from '../hooks/useDisableScroll';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  useDisableTab();
  useDisableScroll();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Movie Browser</h1>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
