import { currentUserLoading, currentUserUpdate, currentUserFailure } from '../actions';
import { fetchUpdateExperience } from '../../api';

export const updateExperienceAction = (id, ex) => async (dispatch) => {
  try {
    dispatch(currentUserLoading());

    const { data } = await fetchUpdateExperience(id, ex);

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
