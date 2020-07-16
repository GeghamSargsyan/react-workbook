import { loginLoading, loginSuccess, loginCheckAuth } from '../actions';
import { fetchAuth } from '../../api';

export const isAuth = () => async (dispatch) => {
  try {
    dispatch(loginLoading());

    const { data } = await fetchAuth();

    dispatch(
      loginSuccess({
        ...data,
      }),
    );
  } catch (e) {
    console.error(e, 'error');
    dispatch(loginCheckAuth());
  }
};
