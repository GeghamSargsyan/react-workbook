import { currentUserLoading, currentUserUpdate, currentUserFailure } from '../actions';
import { fetchDeleteExperience } from '../../api';

export const deleteExerienceAction = (id) => async (dispatch) => {
  try {
    dispatch(currentUserLoading());

    const { data } = await fetchDeleteExperience(id);

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
