import { loginLoadingType, loginSuccessType, loginFailureType, loginCheckAuthType } from '../types';

export const loginLoading = () => ({
  type: loginLoadingType,
});

export const loginSuccess = (payload) => ({
  type: loginSuccessType,
  payload,
});

export const loginFailure = () => ({
  type: loginFailureType,
});

export const loginCheckAuth = () => ({
  type: loginCheckAuthType,
})
