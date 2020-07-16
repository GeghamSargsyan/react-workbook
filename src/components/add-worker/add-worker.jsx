import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import { addUserAction } from '../../store/thunks';
import { currentUserAllInfo } from '../../store/selectors';

import {
  isValidExperience,
  isOnlyLetters,
  isValidEmail,
  isTeenager,
  isValidPassword,
  isValidPasportId,
  isFutureDate,
} from '../../validators';

import { Button, TextFild } from '../fields';
import Experience from '../experience';
import Loading from '../loader';

import styles from './add-worker.module.scss';

const cx = classnames.bind(styles);

const AddWorker = () => {
  const { data: { id }, isLoading, errorMsg } = useSelector(currentUserAllInfo);
  const history = useHistory();
  const dispatch = useDispatch();
  const [experience, setExperience] = useState([]);
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    lastName: {
      value: '',
      errorMsg: '',
    },
    firstName: {
      value: '',
      errorMsg: '',
    },
    email: {
      value: '',
      errorMsg: '',
    },
    passwd: {
      value: '',
      errorMsg: '',
    },
    passportId: {
      value: '',
      errorMsg: '',
    },
    birthDate: {
      value: '',
      errorMsg: '',
    },
    role: 0,
  });

  useEffect(() => {
    if (!id) return;
    history.push(`/user/${id}`);
  }, [id, history]);

  const [experienceOptions, setExperienceOptions] = useState({
    startDate: '',
    endDate: '',
    companyName: '',
  });

  const isValidDate = useCallback(() => (
    experienceOptions.companyName
    && experienceOptions.startDate
    && experience
      .every((ex) => isValidExperience(
        experienceOptions.startDate, experienceOptions.endDate, ex.startDate, ex.endDate,
      ))),
  [experience, experienceOptions, isValidExperience]);

  const handleAddExperience = useCallback(
    () => {
      if (!isValidDate()) {
        setError('work period already exists');
        return;
      }

      setExperience((prevState) => ([
        ...prevState,
        experienceOptions,
      ]));
      setError('');
    },
    [experience, experienceOptions, error, isValidDate],
  );

  const handleChange = useCallback(
    ({ name, value, errorMsg: errMsg }) => {
      setOptions((prevState) => ({
        ...prevState,
        [name]: {
          value,
          errorMsg: errMsg,
        },
      }));
    },
    [options],
  );

  const handleExperienceChange = useCallback(
    ({ name, value }) => {
      if (name !== 'companyName' && isFutureDate(value)) {
        setError('please write correct date');
        return;
      }
      setExperienceOptions((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [experienceOptions],
  );

  const isEveryValid = useCallback(
    (allFilds) => allFilds.some((fild) => (
      fild.errorMsg
      || !fild.value
    )), [],
  );

  const handleSave = useCallback(() => {
    const { role, ...userData } = options;
    if (isEveryValid(Object.values(userData))) {
      setError('Please fill in all fields');
      return;
    }
    dispatch(addUserAction({
      user: {
        lastName: options.lastName.value,
        firstName: options.firstName.value,
        email: options.email.value,
        passwd: options.passwd.value,
        passportId: options.passportId.value,
        birthDate: options.birthDate.value,
        role: 0,
      },
      experience: [...experience],
    }));
  }, [options, experience, dispatch]);

  const handleCancel = useCallback(() => {
    history.push('/');
  }, []);

  return (
    <div className={cx('add-worker')}>
      {isLoading && <Loading />}
      <h1 className={cx('add-worker_title')}>Add Worker</h1>
      <p className={cx('add-worker_error')}>{error}</p>
      <p className={cx('add-worker_error')}>{errorMsg && 'this email address already exist!'}</p>
      <section className={cx('add-worker_user-info')}>
        <label className={cx('add-worker_user-info_label')} htmlFor="fistname">
          First Name
          <TextFild
            name="firstName"
            theme="with-border"
            value={options.firstName.value}
            validator={isOnlyLetters}
            errorMsg={options.firstName.errorMsg}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-info_label')} htmlFor="lastname">
          Last Name
          <TextFild
            name="lastName"
            theme="with-border"
            value={options.lastName.value}
            validator={isOnlyLetters}
            errorMsg={options.lastName.errorMsg}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-info_label')} htmlFor="email">
          Email
          <TextFild
            name="email"
            theme="with-border"
            value={options.email.value}
            validator={isValidEmail}
            errorMsg={options.email.errorMsg}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-info_label')} htmlFor="birthDate">
          Birthdate
          <TextFild
            name="birthDate"
            type="date"
            theme="with-border"
            value={options.birthDate.value}
            validator={isTeenager}
            errorMsg={options.birthDate.errorMsg}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-info_label')} htmlFor="pasport">
          Pasport
          <TextFild
            name="passportId"
            theme="with-border"
            value={options.passportId.value}
            validator={isValidPasportId}
            errorMsg={options.passportId.errorMsg}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-info_label')} htmlFor="company">
          Password
          <TextFild
            name="passwd"
            theme="with-border"
            value={options.passwd.value}
            validator={isValidPassword}
            errorMsg={options.passwd.errorMsg}
            onChange={handleChange}
          />
        </label>
      </section>
      <h1 className={cx('add-worker_title')}>Add Experience</h1>
      <p className={cx('add-worker_info')}>Please click the plus button to add experience</p>
      <section className={cx('add-worker_user-experience')}>
        <section className={cx('add-worker_user-experience_item')}>
          <label className={cx('add-worker_user-experience_item_label')} htmlFor="companyName">
            Company name
            <TextFild
              name="companyName"
              className={cx('add-worker_user-experience_item_label_input')}
              placeholder="company name"
              value={experienceOptions.companyName}
              onChange={handleExperienceChange}
            />
          </label>
          <label className={cx('add-worker_user-experience_item_label')} htmlFor="startdate">
            Start date
            <TextFild
              name="startDate"
              type="date"
              value={experienceOptions.startDate}
              className={cx('add-worker_user-experience_item_label_input')}
              onChange={handleExperienceChange}
            />
          </label>
          <label className={cx('add-worker_user-experience_item_label')} htmlFor="enddate">
            End date
            <TextFild
              name="endDate"
              type="date"
              value={experienceOptions.endDate}
              className={cx('add-worker_user-experience_item_label_input')}
              onChange={handleExperienceChange}
            />
          </label>
        </section>
        <Button
          theme="success"
          className={cx('add-worker_button')}
          onClick={handleAddExperience}
        >
          +
        </Button>
      </section>
      <section className={cx('add-worker_user-experience')}>
        {experience.length ? experience.map((ex) => (
          <Experience
            key={ex.id}
            company={ex.companyName}
            startDate={ex.startDate}
            endDate={ex.endDate}
          />
        )) : ''}
      </section>
      <section className={cx('add-worker_buttons')}>
        <Button
          theme="success"
          className={cx('add-worker_buttons__button')}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          theme="warning"
          className={cx('add-worker_buttons__button')}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </section>
    </div>
  );
};

export default AddWorker;
