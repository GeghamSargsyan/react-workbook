import { currentUserLoading, currentUserSuccess, currentUserFailure } from '../actions';
import { fetchAddUser } from '../../api';

export const addUserAction = (data) => async (dispatch) => {
  try {
    dispatch(currentUserLoading());

    const { data: { user, experience } } = await fetchAddUser(data);

    dispatch(
      currentUserSuccess({
        ...user,
        experience,
      }),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e, 'error');
    dispatch(currentUserFailure('error'));
  }
};
