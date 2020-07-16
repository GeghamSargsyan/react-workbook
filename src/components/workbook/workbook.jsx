import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { getWorkersAction } from '../../store/thunks';
import { workers as workersSelector } from '../../store/selectors';

import WorkbookItem from './workbook-item';

import styles from './workbook.module.scss';

const cx = classnames.bind(styles);

const Workbook = () => {
  const { data: workers } = useSelector(workersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkersAction());
  }, [dispatch]);

  return (
    <div className={cx('workbook')}>
      <h1 className={cx('workbook_title')}>Workers</h1>
      {
        workers && workers.map((worker) => (
          <WorkbookItem key={worker.id} {...worker} />
        ))
    }
    </div>
  );
};

export default memo(Workbook);
