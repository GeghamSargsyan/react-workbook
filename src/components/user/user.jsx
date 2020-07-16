import React, { memo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import classnames from 'classnames/bind';

import { getUserAction } from '../../store/thunks';
import { currentUserReset } from '../../store/actions';

import { ReactComponent as UserSvg } from '../../assets/icons/user.svg';

import styles from './user.module.scss';
import Experience from '../experience';
import { currentUser } from '../../store/selectors';

const cx = classnames.bind(styles);

const User = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const worker = useSelector(currentUser);

  useEffect(() => {
    const { id } = params;
    if (!id) history.push('/404');
    dispatch(getUserAction(id));

    return () => {
      dispatch(currentUserReset());
    };
  }, [dispatch, history]);

  const getCurentWork = useCallback((experie) => (
    experie?.filter((ex) => !ex.endDate)[0]?.companyName
  ),
  []);

  return (
    <div className={cx('user')}>
      <section className={cx('user_info')}>
        <UserSvg className={cx('user_info_img')} />
        <section className={cx('user_info_details')}>
          <section className={cx('user_info_details__detail')}>
            <h5>First Name</h5>
            <p>{worker.firstName}</p>
          </section>
          <section className={cx('user_info_details__detail')}>
            <h5>Last Name</h5>
            <p>{worker.lastName}</p>
          </section>
          <section className={cx('user_info_details__detail')}>
            <h5>Email</h5>
            <p>{worker.email}</p>
          </section>
          <section className={cx('user_info_details__detail')}>
            <h5>Pasport</h5>
            <p>{worker.passportId}</p>
          </section>
          <section className={cx('user_info_details__detail')}>
            <h5>Birthdate</h5>
            <p>{worker.birthDate}</p>
          </section>
          <section className={cx('user_info_details__detail')}>
            <h5>Company</h5>
            <p>{getCurentWork(worker?.experience) || 'not working'}</p>
          </section>
        </section>
      </section>
      <h1 className={cx('user_title')}>Experience</h1>
      {!worker?.experience?.length && <p className={cx('user_noHistory')}>No History</p>}
      <section className={cx('user_experience')}>
        {worker.experience && worker.experience.map((ex) => (
          <Experience key={ex.id} id={ex.id} company={ex.companyName} startDate={ex.startDate} endDate={(ex.endDate || 'current')} />
        ))}
      </section>
    </div>
  );
};

export default memo(User);
