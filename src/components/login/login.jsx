import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import { ReactComponent as UserSvg } from '../../assets/icons/user.svg';
import { ReactComponent as PasswordSvg } from '../../assets/icons/password.svg';

import { loginAction } from '../../store/thunks';
import { user } from '../../store/selectors';

import { Button, TextFild } from '../fields';

import styles from './login.module.scss';
import Loading from '../loader';

const cx = classnames.bind(styles);

const LogIn = () => {
  const dispatch = useDispatch();
  const { isLoading, errorMsg } = useSelector(user);

  const [options, setOptions] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
  }, [errorMsg]);

  const handleChange = useCallback(({ value, name }) => {
    setOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, [options]);

  const handleLogin = useCallback((event) => {
    event.preventDefault();
    dispatch(loginAction(options.email, options.password));
  }, [options, dispatch]);

  return (
    <div className={cx('login')}>
      {isLoading && <Loading />}
      <h1 className={cx('login_title')}>Workbook</h1>
      <p className={cx('login_error')}>
        {
          errorMsg
            ? (
              <>
                <span className={cx('login_error_bold')}>Failed to log in.</span>
                Please make sure that you have entered your login and password correctly.
              </>
            )
            : ''
        }
      </p>
      <form className={cx('login_form')} onSubmit={handleLogin}>
        <section className={cx('login_form_section')}>
          <UserSvg />
          <TextFild placeholder="login" name="email" value={options.email} onChange={handleChange} />
        </section>
        <section className={cx('login_form_section')}>
          <PasswordSvg />
          <TextFild type="password" placeholder="password" name="password" value={options.password} onChange={handleChange} />
        </section>
        <Button className={cx('login_form_button')} type="submit" theme="success">Log in</Button>
      </form>
    </div>
  );
};
export default LogIn;
