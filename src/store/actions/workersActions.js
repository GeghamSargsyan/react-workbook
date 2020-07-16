import { workersLoadingType, workersSuccessType, workersFailureType } from '../types';

export const workersLoading = () => ({
  type: workersLoadingType,
});

export const workersSuccess = (payload) => ({
  type: workersSuccessType,
  payload,
});

export const workersFailure = (errorMsg) => ({
  type: workersFailureType,
  errorMsg,
});
