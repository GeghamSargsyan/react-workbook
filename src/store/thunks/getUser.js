import { currentUserLoading, currentUserSuccess, currentUserFailure } from '../actions';
import { fetchWorker } from '../../api';

export const getUserAction = (id) => async (dispatch) => {
  try {
    dispatch(currentUserLoading());

    const { data: { user, experience } } = await fetchWorker(id);

    dispatch(
      currentUserSuccess({
        ...user,
        experience,
      }),
    );
  } catch (e) {
    console.error(e, 'error');
    dispatch(currentUserFailure('error'));
  }
};
