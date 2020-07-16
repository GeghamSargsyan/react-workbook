import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { deleteUserAction } from '../../../store/thunks';

import { Button } from '../../fields';
import Loading from '../../loader';

import styles from './workbook-item.module.scss';
import { user, workers } from '../../../store/selectors';

const cx = classnames.bind(styles);

const WorkbookItem = ({
  id,
  firstName,
  lastName,
  birthDate,
  email,
  passportId,
  users_companys,
}) => {
  const dispatch = useDispatch();
  const { role } = useSelector(user);
  const { isLoading } = useSelector(workers);
  const history = useHistory();

  const handleDelete = useCallback(() => {
    dispatch(deleteUserAction(id));
  }, [dispatch]);

  const handleEdit = useCallback(() => {
    history.push(`/worker-edit/${id}`);
  }, [history, id]);

  return (
    <div className={cx('workbook-item')}>
      {isLoading && <Loading />}
      <table className={cx('workbook-item_container')}>
        <thead className={cx('workbook-item_container_header')}>
          <tr>
            <th className={cx('workbook-item_container_header__item')}>First name</th>
            <th className={cx('workbook-item_container_header__item')}>Last name</th>
            <th className={cx('workbook-item_container_header__item')}>Birthdate</th>
            <th className={cx('workbook-item_container_header__item')}>Email</th>
            <th className={cx('workbook-item_container_header__item')}>pasport</th>
            <th className={cx('workbook-item_container_header__item')}>company</th>

          </tr>
        </thead>
        <tbody className={cx('workbook-item_container_main')}>
          <tr>
            <td className={cx('workbook-item_container_main__item')}>{firstName}</td>
            <td className={cx('workbook-item_container_main__item')}>{lastName}</td>
            <td className={cx('workbook-item_container_main__item')}>{birthDate}</td>
            <td className={cx('workbook-item_container_main__item')}>{email}</td>
            <td className={cx('workbook-item_container_main__item')}>{passportId}</td>
            <td className={cx('workbook-item_container_main__item')}>{(users_companys[0]?.companyName || 'not working')}</td>

          </tr>
        </tbody>
      </table>
      <section className={cx('workbook-item_control')}>
        <Link to={`user/${id}`}>More info</Link>
        {role === 1 ? (
          <>
            <Button theme="warning" className={cx('workbook-item_control__button')} onClick={handleEdit}>Edit</Button>
            <Button theme="danger" className={cx('workbook-item_control__button')} onClick={handleDelete}>Delete</Button>
          </>
        ) : ''}
      </section>
    </div>
  );
};

WorkbookItem.defaultProps = {
  users_companys: [],
};

WorkbookItem.propTypes = {
  id: PropTypes.number.isRequired,
  passportId: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  users_companys: PropTypes.arrayOf(Object),
};

export default memo(WorkbookItem);
