import { currentUserLoading, currentUserInfoUpdate, currentUserFailure } from '../actions';
import { fetchUpdateUser } from '../../api';

export const updateUserAction = (id, user) => async (dispatch) => {
  try {
    dispatch(currentUserLoading());

    const { data } = await fetchUpdateUser(id, user);

    dispatch(
      currentUserInfoUpdate({
        ...data,
      }),
    );
  } catch (e) {
    console.error(e, 'error');
    dispatch(currentUserFailure('error'));
  }
};
