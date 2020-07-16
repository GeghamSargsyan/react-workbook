import { loginLoading, loginSuccess, loginFailure } from '../actions';
import { fetchLogin } from '../../api';

export const loginAction = (login, password) => async (dispatch) => {
  try {
    dispatch(loginLoading());

    const { data: { token, ...data } } = await fetchLogin(login, password);

    sessionStorage.setItem('token', token);
    dispatch(
      loginSuccess({
        ...{ ...data },
      }),
    );
  } catch (e) {
    console.error(e, 'error');
    dispatch(loginFailure());
  }
};
