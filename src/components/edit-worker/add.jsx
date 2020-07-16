import React, {
  memo, useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { TextFild, Button } from '../fields';

import styles from './edit-worker.module.scss';
import { isOnlyLetters, isValidExperience } from '../../validators';

const cx = classnames.bind(styles);

const Add = ({
  addMode, onSave, buttonValue,
}) => {
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({
    companyName: '',
    startDate: '',
    endDate: '',
  });

  const handleAdd = useCallback(() => {
    const { companyName, startDate, endDate } = options;
    onSave({
      companyName, startDate, endDate,
    });
  }, [onSave, addMode, options]);

  const handleChange = useCallback(({ name, value }) => {
    setOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, [options]);

  return (
    <section className={cx('add-worker_user-experience_item')}>
      <p>{error}</p>
      <label className={cx('add-worker_user-experience_item_label')} htmlFor="companyName">
        Company name
        <TextFild
          name="companyName"
          className={cx('add-worker_user-experience_item_label_input')}
          disabled={!addMode}
          placeholder="company name"
          value={options.companyName}
          onChange={handleChange}
          validator={(val) => val.length > 3}
        />
      </label>
      <label className={cx('add-worker_user-experience_item_label')} htmlFor="startdate">
        Start date
        <TextFild
          name="startDate"
          type="date"
          className={cx('add-worker_user-experience_item_label_input')}
          disabled={!addMode}
          placeholder="company name"
          value={options.startDate}
          onChange={handleChange}
          validator={isValidExperience}
        />
      </label>
      <label className={cx('add-worker_user-experience_item_label')} htmlFor="enddate">
        End date
        <TextFild
          name="endDate"
          type="date"
          className={cx('add-worker_user-experience_item_label_input')}
          disabled={!addMode}
          placeholder="company name"
          value={options.endDate}
          onChange={handleChange}
          validator={isValidExperience}
        />
      </label>
      <Button
        theme="success"
        className={cx('add-worker_button')}
        onClick={handleAdd}
        disabled={!error}
      >
        {buttonValue}
      </Button>
    </section>
  );
};

Add.defaultProps = {
  buttonValue: 'Add',
};

Add.propTypes = {
  onSave: PropTypes.func.isRequired,
  addMode: PropTypes.bool.isRequired,
  buttonValue: PropTypes.string,
};

export default memo(Add);
