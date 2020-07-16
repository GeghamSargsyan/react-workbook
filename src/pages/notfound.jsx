import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../components/fields';

import styles from './notfound.module.scss';

export default function NotFound() {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <div className={styles.notfound}>
      <h1 className={styles.notfound_title}>oops!</h1>
      <h3 className={styles.notfound_error}>Error 404: Page Not Found</h3>
      <Button theme="success" onClick={handleClick}>Go Home</Button>
    </div>
  );
}
