import { workersLoading, workersSuccess, workersFailure } from '../actions';
import { fetchAllUsers } from '../../api';

export const getWorkersAction = () => async (dispatch) => {
  try {
    dispatch(workersLoading());

    const { data } = await fetchAllUsers();
    dispatch(
      workersSuccess([
        ...data,
      ]),
    );
  } catch (e) {
    console.error(e, 'error');
    dispatch(workersFailure('error'));
  }
};
