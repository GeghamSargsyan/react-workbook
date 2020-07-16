import { currentUserLoading, currentUserUpdate, currentUserFailure } from '../actions';
import { fetchAddExperience } from '../../api';

export const addExerienceAction = (id, ex) => async (dispatch) => {
  try {
    dispatch(currentUserLoading());

    const { data } = await fetchAddExperience(id, ex);

    dispatch(
      currentUserUpdate([
        ...data,
      ]),
    );
  } catch (e) {
    console.error(e, 'error');
    dispatch(currentUserFailure('error'));
  }
};
