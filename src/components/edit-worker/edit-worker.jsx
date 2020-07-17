import React, {
  useState, useCallback, useEffect,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';

import {
  updateUserAction,
  getUserAction,
  addExerienceAction,
  updateExperienceAction,
  deleteExerienceAction,
} from '../../store/thunks';

import {
  isValidExperience,
  isOnlyLetters,
  isTeenager,
  isValidEmail,
  isValidPasportId,
  isValidPassword,
  isFutureDate,
} from '../../validators';

import { Button, TextFild } from '../fields';
import Loading from '../loader';
import Edit from './edit';

import styles from './edit-worker.module.scss';
import Add from './add';
import { currentUserAllInfo, currentUser } from '../../store/selectors';

const cx = classnames.bind(styles);

const EditWorker = () => {
  const { isLoading, data } = useSelector(currentUserAllInfo);
  const history = useHistory();
  const { id } = useParams();

  const { experience } = useSelector(currentUser);
  const dispatch = useDispatch();
  const [addMode, setAddMode] = useState(false);
  const [error, setError] = useState('');
  const [experienceErrorMsg, setExperienceErrorMsg] = useState('');
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
    dispatch(getUserAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    setOptions({
      lastName: {
        value: data.lastName,
        errorMsg: '',
      },
      firstName: {
        value: data.firstName,
        errorMsg: '',
      },
      email: {
        value: data.email,
        errorMsg: '',
      },
      passwd: {
        value: data.passwd,
        errorMsg: '',
      },
      passportId: {
        value: data.passportId,
        errorMsg: '',
      },
      birthDate: {
        value: data.birthDate,
        errorMsg: '',
      },
      role: 0,
    });
  }, [data]);

  const handleAddMode = useCallback(
    () => {
      setAddMode(true);
    }, [addMode],
  );

  const handleChange = useCallback(
    ({ name, value, errorMsg }) => {
      setOptions((prevState) => ({
        ...prevState,
        [name]: {
          value,
          errorMsg,
        },
      }));
    },
    [options],
  );

  const handleCancel = useCallback(() => {
    history.push('/');
  }, []);

  const isEveryValid = useCallback((allFilds) => allFilds.some((fild) => fild.errorMsg), []);

  const handleSave = useCallback(() => {
    const { role, ...userData } = options;
    if (isEveryValid(Object.values(userData))) {
      setError('Please fill in all fields');
      return;
    }

    dispatch(updateUserAction(id, {
      lastName: options.lastName.value,
      firstName: options.firstName.value,
      email: options.email.value,
      passwd: options.passwd.value,
      passportId: options.passportId.value,
      birthDate: options.birthDate.value,
      role: 0,
    }));
    setError('');
  }, [options, dispatch, isEveryValid, error]);

  const isValidDate = useCallback((exOptions) => (
    exOptions?.companyName
    && exOptions?.startDate
    && experience
      .every((ex) => isValidExperience(
        exOptions.startDate, exOptions.endDate, ex.startDate, ex.endDate,
      ))),
  [experience]);

  const handleExperienceSave = useCallback((ex) => {
    if (!isValidDate(ex) || isFutureDate(ex.startDate, ex.endDate)) {
      setExperienceErrorMsg('please write correct date');
      return;
    }
    dispatch(addExerienceAction(id, ex));
    setAddMode(false);
    setExperienceErrorMsg('');
  }, [isValidDate]);

  const handleExperienceUpdate = useCallback((ex) => {
    dispatch(updateExperienceAction(id, ex));
  }, [experienceErrorMsg, dispatch]);

  const handleExperienceDelete = useCallback((exId) => () => {
    dispatch(deleteExerienceAction(exId));
  }, []);

  return (
    <div className={cx('add-worker')}>
      {isLoading && <Loading />}
      <h1 className={cx('add-worker_title')}>Edit Worker</h1>
      {error && <p className={cx('add-worker_error')}>{error}</p>}
      <section className={cx('add-worker_user-info')}>
        <label className={cx('add-worker_user-info_label')} htmlFor="fistname">
          First Name
          <TextFild
            name="firstName"
            theme="with-border"
            value={options.firstName.value}
            errorMsg={options.firstName.errorMsg}
            validator={isOnlyLetters}
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
            errorMsg={options.email.errorMsg}
            validator={isValidEmail}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-info_label')} htmlFor="birthDate">
          {console.log(options.birthDate)}
          Birthdate
          <TextFild
            name="birthDate"
            theme="with-border"
            type="date"
            value={options.birthDate.value}
            errorMsg={options.birthDate.errorMsg}
            validator={isTeenager}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-info_label')} htmlFor="pasport">
          Pasport
          <TextFild
            name="passportId"
            theme="with-border"
            value={options.passportId.value}
            errorMsg={options.passportId.errorMsg}
            validator={isValidPasportId}
            onChange={handleChange}
          />
        </label>
        <label className={cx('add-worker_user-info_label')} htmlFor="company">
          Password
          <TextFild
            name="passwd"
            theme="with-border"
            value={options.passwd.value}
            errorMsg={options.passwd.errorMsg}
            validator={isValidPassword}
            onChange={handleChange}
          />
        </label>
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
      <h1 className={cx('add-worker_title')}>Edit Experience</h1>
      <p className={cx('add-worker_error')}>{experienceErrorMsg}</p>
      <section className={cx('add-worker_user-experience')}>
        <Button
          onClick={handleAddMode}
          theme="success"
          className={cx('add-worker_user-experience_button')}
        >
          Add Experience

        </Button>
        {addMode ? (
          <Add
            addMode={addMode}
            buttonValue="Save"
            onSave={handleExperienceSave}
          />
        ) : ''}
        {data?.experience?.length ? data.experience.map((ex) => (
          <section key={ex.id}>
            <Edit
              id={ex.id}
              companyName={ex.companyName}
              startDate={ex.startDate}
              endDate={ex.endDate}
              onSave={handleExperienceUpdate}
              experience={experience}
            />
            <Button
              theme="danger"
              className={cx('add-worker_user-experience_edit-button')}
              onClick={handleExperienceDelete(ex.id)}
            >
              Delete

            </Button>
          </section>
        )) : ''}
      </section>
    </div>
  );
};

export default EditWorker;
