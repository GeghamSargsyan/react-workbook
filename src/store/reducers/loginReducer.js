import {
  loginLoadingType, loginSuccessType, loginFailureType, loginCheckAuthType,
} from '../types';

const initialState = {
  data: {},
  authenticated: false,
  isLoading: false,
  errorMsg: false,
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case loginLoadingType:
      return {
        ...state,
        isLoading: true,
      };

    case loginSuccessType:
      return {
        ...state,
        data: action.payload,
        authenticated: true,
        isLoading: false,
        errorMsg: false,
      };

    case loginFailureType:
      return {
        ...state,
        authenticated: false,
        isLoading: false,
        errorMsg: true,
      };

    case loginCheckAuthType:
      return {
        ...state,
        isLoading: false,
        errorMsg: false,
      };

    default:
      return state;
  }
}
