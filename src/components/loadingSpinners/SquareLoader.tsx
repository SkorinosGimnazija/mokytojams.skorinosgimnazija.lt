import React from 'react';
import styles from './SquareLoader.module.css';

export const SquareLoader = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.cube1}></div>
      <div className={styles.cube2}></div>
    </div>
  );
};
