/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { isAuth } from '../store/thunks';
import { user, authenticated as authenticatedSelector } from '../store/selectors';

export const ProtectedRoute = (props) => {
  const history = useHistory();

  const authenticated = useSelector(authenticatedSelector);
  const { role } = useSelector(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      history.push('/login');
    } else if (history.location.pathname === '/login') {
      if (props.isAdmin && role === 0) {
        history.push('/');
      }
      history.push('/');
    }
  }, [authenticated, history, role]);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />;
};
