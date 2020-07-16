import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './experience.module.scss';

const cx = classnames.bind(styles);

const Experience = ({ company, startDate, endDate }) => (
  <section key={startDate} className={cx('experience')}>
    <section className={cx('experience_detail')}>
      <h5>Company</h5>
      <p>{company}</p>
    </section>
    <section className={cx('experience_detail')}>
      <h5>Start Date</h5>
      <p>{startDate}</p>
    </section>
    <section className={cx('experience_detail')}>
      <h5>End Date</h5>
      <p>{endDate}</p>
    </section>
  </section>
);

Experience.propTypes = {
  company: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default memo(Experience);
