import React, { memo } from 'react';
import classnames from 'classnames/bind';

import styles from './loader.module.scss';

const cx = classnames.bind(styles);

const Loader = () => (
  <div className={cx('loader')}>
    <div className={cx('loader_container')}>
      <div className={cx('loader_container_in', 'loader_container_one')} />
      <div className={cx('loader_container_in', 'loader_container_two')} />
      <div className={cx('loader_container_in', 'loader_container_three')} />
    </div>
  </div>

);

export default memo(Loader);
