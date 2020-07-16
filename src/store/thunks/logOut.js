import { loginLoading, loginFailure } from '../actions';
import { fetchLogOut } from '../../api';

export const logOutAction = (login, password) => async (dispatch) => {
  try {
    dispatch(loginLoading());

    await fetchLogOut(login, password);

    sessionStorage.setItem('token', '');
    dispatch(loginFailure('error'));
  } catch (e) {
    console.error(e, 'error');
  }
};
