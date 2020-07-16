import {
  currentUserLoadingType,
  currentUserSuccessType,
  currentUserFailureType,
  currentUserResetType,
  currentUserUpdateType,
  currentUserInfoUpdateType,
} from '../types';

export const currentUserLoading = () => ({
  type: currentUserLoadingType,
});

export const currentUserSuccess = (payload) => ({
  type: currentUserSuccessType,
  payload,
});

export const currentUserFailure = (errorMsg) => ({
  type: currentUserFailureType,
  errorMsg,
});

export const currentUserReset = () => ({
  type: currentUserResetType,
});

export const currentUserUpdate = (payload) => ({
  type: currentUserUpdateType,
  payload,
});

export const currentUserInfoUpdate = (payload) => ({
  type: currentUserInfoUpdateType,
  payload,
});
