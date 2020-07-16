import React, {
  memo, useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import cloneDeep from 'lodash.clonedeep';

import { TextFild, Button } from '../fields';

import styles from './edit-worker.module.scss';
import { isFutureDate, isValidExperience } from '../../validators';

const cx = classnames.bind(styles);

const Edit = ({
  id, companyName, startDate, endDate, buttonValue, onSave, experience,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    companyName,
    startDate,
    endDate,
  });

  const isValidUpdateDate = useCallback(() => (
    options.companyName
    && options.startDate
    && cloneDeep(experience).filter((ex) => ex.id !== id).every((ex) => isValidExperience(
      options.startDate, options.endDate, ex.startDate, ex.endDate,
    ))),
  [experience, isValidExperience, options]);

  const handleEdit = useCallback(() => {
    if (isEdit) {
      if (!isValidUpdateDate({
        startDate: options.startDate,
        endDate: options.endDate,
        id,
      })
      ) {
        setError('please write correct date');
        return;
      }
      onSave({
        ...options,
        id,
      });

      setError('');
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [onSave, options, isEdit, options, isValidUpdateDate, id, error]);

  const handleChange = useCallback(({ name, value }) => {
    if (name !== 'companyName' && isFutureDate(value)) {
      setError('please write correct date');
      return;
    }
    setOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (error) setError('');
  }, [error]);

  return (
    <>
      <p className={cx('add-worker_error')}>{error}</p>
      <section className={cx('add-worker_user-experience_item')}>
        <label className={cx('add-worker_user-experience_item_label')} htmlFor="companyName">
          Company name
          <TextFild
            name="companyName"
            className={cx('add-worker_user-experience_item_label_input')}
            disabled={!isEdit}
            placeholder="company name"
            value={options.companyName}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-experience_item_label')} htmlFor="startdate">
          Start date
          <TextFild
            name="startDate"
            type="date"
            disabled={!isEdit}
            value={options.startDate}
            className={cx('add-worker_user-experience_item_label_input')}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-experience_item_label')} htmlFor="enddate">
          End date
          <TextFild
            name="endDate"
            type="date"
            disabled={!isEdit}
            value={options.endDate}
            className={cx('add-worker_user-experience_item_label_input')}
            onChange={handleChange}
          />
        </label>
        <Button
          theme="success"
          className={cx('add-worker_button')}
          onClick={handleEdit}
        >
          {isEdit ? 'Save' : buttonValue}
        </Button>
      </section>
    </>
  );
};

Edit.defaultProps = {
  buttonValue: 'edit',
  endDate: '',
  experience: [],
};

Edit.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSave: PropTypes.func.isRequired,
  buttonValue: PropTypes.string,
  companyName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  experience: PropTypes.arrayOf(PropTypes.object),
};

export default memo(Edit);
