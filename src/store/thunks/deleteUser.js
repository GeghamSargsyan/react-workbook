import { workersLoading, workersSuccess, workersFailure } from '../actions';
import { fetchDelete } from '../../api';

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch(workersLoading());

    const { data } = await fetchDelete(id);
    dispatch(
      workersSuccess([
        ...data,
      ]),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e, 'error');
    dispatch(workersFailure('error'));
  }
};
