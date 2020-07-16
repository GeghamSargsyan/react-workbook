import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames/bind';

import { logOutAction } from '../../store/thunks';
import { currentUserReset } from '../../store/actions';
import { user } from '../../store/selectors';

import { Button } from '../fields';
import { ReactComponent as UserSvg } from '../../assets/icons/user.svg';
import styles from './header.module.scss';

const cx = classnames.bind(styles);

const Header = () => {
  const dispatch = useDispatch();
  const userInso = useSelector(user);

  const handleLogOut = useCallback(() => {
    dispatch(logOutAction());
  }, [dispatch]);

  const reset = useCallback(() => dispatch(currentUserReset()), []);

  return (
    <header className={cx('header')}>
      <h1 className={cx('header_heading')}>Workbook</h1>
      <section className={cx('header_user')}>
        <UserSvg className={cx('header_user_img')} />
        <div className={cx('header_user_info')}>
          <section>{userInso.firstName}</section>
          <section>{userInso.lastName}</section>
        </div>
      </section>
      <nav className={cx('header_nav')}>
        <NavLink
          exact
          to="/"
          onClick={reset}
          className={cx('header_nav__link')}
          activeClassName={cx('header_nav_active')}
        >
          Home
        </NavLink>
        {userInso.role === 1 ? (
          <NavLink
            exact
            to="/worker-add"
            onClick={reset}
            className={cx('header_nav__link')}
            activeClassName={cx('header_nav_active')}
          >
            Add Worker
          </NavLink>
        ) : ''}
        <Button className={cx('header_nav_logout')} theme="success" onClick={handleLogOut}>Log Out</Button>
      </nav>
    </header>
  );
};

export default Header;
